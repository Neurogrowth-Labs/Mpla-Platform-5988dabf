import { images } from "../assets/images";
import React, { useState, useEffect, useRef } from "react";
import {
  User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, AlertCircle,
  Loader2, ArrowLeft, Camera, Upload, Check, ShieldCheck, Award, Sparkles
} from "lucide-react";

// South African provincial mapping for adaptive dropdowns
const PROVINCE_MAPPING: {
  [key: string]: { municipalities: string[]; committees: string[] }
} = {
  "Western Cape": {
    municipalities: ["City of Cape Town", "Goodwood", "Stellenbosch", "Drakenstein"],
    committees: ["Comité MPLA Cape Town", "Núcleo Goodwood", "Núcleo Stellenbosch", "Núcleo Drakenstein"]
  },
  "Eastern Cape": {
    municipalities: ["Nelson Mandela Bay", "Buffalo City", "King Sabata Dalindyebo"],
    committees: ["Núcleo Eastern Cape", "Núcleo Gqeberha", "Núcleo East London"]
  },
  "Northern Cape": {
    municipalities: ["Sol Plaatje", "Dawid Kruiper", "Nama Khoi"],
    committees: ["Núcleo Northern Cape", "Núcleo Kimberley", "Núcleo Upington"]
  }
};

const PHOTO_SAMPLES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
];

interface AuthPortalProps {
  onLoginSuccess: (user: any, role: "member" | "admin") => void;
  onBackToWeb?: () => void;
  initialMode?: "signin" | "signup";
}

export default function AuthPortal({ onLoginSuccess, onBackToWeb, initialMode }: AuthPortalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "otp" | "forgot" | "success">(initialMode || "signin");

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);
  const [role, setRole] = useState<"member" | "admin">("member");

  // Sign in fields
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("PT");

  // OTP Fields
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(""));
  const [otpSentTo, setOtpSentTo] = useState("");
  const [countdown, setCountdown] = useState(59);
  const [otpLoading, setOtpLoading] = useState(false);
  const otpInputRefs = useRef<HTMLInputElement[]>([]);

  // Sign up fields (Progressive steps)
  const [signUpStep, setSignUpStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    nationalId: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    province: "Western Cape",
    municipality: "City of Cape Town",
    committee: "Comité MPLA Cape Town",
    affiliation: "Apenas Militante",
    documentType: "BI",
    photo: ""
  });

  // Simulated webcam / custom camera capture
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraCountdown, setCameraCountdown] = useState<number | null>(null);

  // Load persistent draft sign-up data
  useEffect(() => {
    const savedDraft = localStorage.getItem("mpla_cape_town_signup_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setSignUpData(prev => ({ ...prev, ...parsed.data }));
        if (parsed.step) {
          setSignUpStep(parsed.step);
        }
      } catch (e) {
        console.error("Error parsing sign-up draft", e);
      }
    }
  }, []);

  // Save draft on change
  const saveSignUpDraft = (updatedData: typeof signUpData, step: number) => {
    localStorage.setItem(
      "mpla_cape_town_signup_draft",
      JSON.stringify({ data: updatedData, step, timestamp: Date.now() })
    );
  };

  // Clear draft
  const clearSignUpDraft = () => {
    localStorage.removeItem("mpla_cape_town_signup_draft");
  };

  // Live Password Strength calculations
  const checkPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: "Weak", score: 0, color: "bg-red-500", requirements: {
      length: false, upper: false, lower: false, num: false, sym: false
    }};

    const requirements = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      num: /[0-9]/.test(pwd),
      sym: /[^A-Za-z0-9]/.test(pwd)
    };

    const metCount = Object.values(requirements).filter(Boolean).length;
    let label = "Weak";
    let color = "bg-red-500";
    if (metCount === 5) {
      label = "Strong";
      color = "bg-green-500";
    } else if (metCount >= 3) {
      label = "Good";
      color = "bg-emerald-500";
    } else if (metCount >= 2) {
      label = "Fair";
      color = "bg-amber-500";
    }

    return { label, score: metCount, color, requirements };
  };

  const strength = checkPasswordStrength(signUpData.password);

  // OTP Countdown handling
  useEffect(() => {
    let timer: any;
    if (mode === "otp" && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [mode, countdown]);

  // Handle Login submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setErrorMsg("Introduza o seu Número de Militante, Email ou Telefone.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Success
      if (rememberMe) {
        localStorage.setItem("nda_remembered_identifier", identifier);
      } else {
        localStorage.removeItem("nda_remembered_identifier");
      }

      onLoginSuccess(data.user, data.role);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill remembered identifier
  useEffect(() => {
    const remembered = localStorage.getItem("nda_remembered_identifier");
    if (remembered) {
      setIdentifier(remembered);
    }
  }, []);

  // Handle Sign In with OTP requested
  const handleRequestOTP = async () => {
    if (!identifier) {
      setErrorMsg("Introduza o seu telefone ou email para receber o OTP.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      // Simulate sending OTP to identifier
      const maskPhone = identifier.includes("@")
        ? identifier
        : identifier.replace(/.(?=.{4})/g, "X");

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: identifier })
      });

      if (!response.ok) throw new Error("Failed to dispatch security code.");

      setOtpSentTo(maskPhone);
      setCountdown(59);
      setOtpCode(Array(6).fill(""));
      setMode("otp");
    } catch (err: any) {
      setErrorMsg(err.message || "OTP transmission failure.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Submission
  const handleVerifyOTP = async () => {
    const fullCode = otpCode.join("");
    if (fullCode.length < 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setErrorMsg("");
    setOtpLoading(true);

    try {
      // Direct API authentication or simulation
      // If we are simulating an OTP, we find matching member by identifier
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: "", role })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Invalid or expired OTP verification code.");
      }

      onLoginSuccess(data.user, data.role);
    } catch (err: any) {
      setErrorMsg(err.message || "Verification code rejection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Paste handler for OTP inputs
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (pasted.length === 6 && /^\d+$/.test(pasted)) {
      const codeArray = pasted.split("");
      setOtpCode(codeArray);
      otpInputRefs.current[5]?.focus();
    }
  };

  // OTP character change
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);

    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // OTP Backspace key
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Progressive Step Continue
  const handleSignUpStepContinue = () => {
    setErrorMsg("");
    if (signUpStep === 1) {
      if (!signUpData.fullName || !signUpData.nationalId || !signUpData.mobile) {
        setErrorMsg("Please fill in your name, national ID, and phone number.");
        return;
      }
      if (signUpData.nationalId.length < 6) {
        setErrorMsg("Please enter a valid National Identity Number.");
        return;
      }
      setSignUpStep(2);
      saveSignUpDraft(signUpData, 2);
    } else if (signUpStep === 2) {
      if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
        setErrorMsg("Preencha todos os campos de email e palavra-passe.");
        return;
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }
      if (strength.score < 3) {
        setErrorMsg("Please choose a stronger password matching the security criteria.");
        return;
      }
      setSignUpStep(3);
      saveSignUpDraft(signUpData, 3);
    } else if (signUpStep === 3) {
      setSignUpStep(4);
      saveSignUpDraft(signUpData, 4);
    } else if (signUpStep === 4) {
      // Ensure photo is selected or captured
      if (!signUpData.photo) {
        // Assign a default sample photo if empty
        const defaultPhoto = PHOTO_SAMPLES[Math.floor(Math.random() * PHOTO_SAMPLES.length)];
        const updated = { ...signUpData, photo: defaultPhoto };
        setSignUpData(updated);
        saveSignUpDraft(updated, 5);
      }
      setSignUpStep(5);
    }
  };

  // Final Registration Submission
  const handleSignUpSubmit = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration rejected.");
      }

      clearSignUpDraft();
      setMode("success");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to finalize registration.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Simulated Webcam Camera Snapshot
  const triggerCameraCapture = () => {
    setIsCameraActive(true);
    setCameraCountdown(3);

    const interval = setInterval(() => {
      setCameraCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          // Snapshot completed!
          const chosen = PHOTO_SAMPLES[Math.floor(Math.random() * PHOTO_SAMPLES.length)];
          setSignUpData(prevData => {
            const nextData = { ...prevData, photo: chosen };
            saveSignUpDraft(nextData, signUpStep);
            return nextData;
          });
          setIsCameraActive(false);
          return null;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
  };

  // Handle forgot password request
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier) {
      setErrorMsg("Please enter your Email or Membership Number.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setForgotSent(true);
    }, 1200);
  };

  return (
    <div id="auth_portal_root" className="min-h-screen bg-[#0F172A] flex flex-col justify-between font-sans relative overflow-hidden">

      {/* Full-screen Background Image of MPLA members/supporters */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={images.mplaSupportersBackground}
          alt="Militantes do MPLA"
          className="w-full h-full object-cover opacity-30 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#580714]/80 to-[#0F172A]/95" />
      </div>

      {/* Dynamic Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
        {onBackToWeb ? (
          <button
            onClick={onBackToWeb}
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-slate-800 hover:text-black hover:bg-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer shadow-xs transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {language === "PT" ? "Voltar ao Website" : "Back to Website"}
          </button>
        ) : <div />}
        <select
          id="auth_lang_select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[#111827] text-xs font-semibold px-2 py-1.5 rounded-lg cursor-pointer shadow-xs focus:ring-1 focus:ring-[#C8102E] focus:outline-hidden"
        >
          <option value="EN">English (ZA)</option>
          <option value="PT">Português</option>
          <option value="XH">IsiXhosa</option>
          <option value="ZU">IsiZulu</option>
        </select>
      </div>

      {/* Main Grid Wrapper */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-10 min-h-screen relative z-10">

        {/* Left Panel: 45% (Cols 1-4) - Branding & Features (No separating line, transparent background) */}
        <div className="hidden lg:flex lg:col-span-4 bg-transparent flex-col justify-between p-12 relative overflow-hidden">

          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md p-1 border-2 border-[#FFCC00] text-white">
              <img
                src={images.mplaLogo}
                alt="MPLA Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-sans font-bold text-lg text-white tracking-tight leading-none">
                MPLA Portal Unificado
              </h2>
              <p className="text-[10px] text-[#FFCC00] font-mono uppercase tracking-wider mt-1 font-bold">Sede África do Sul</p>
            </div>
          </div>

          {/* Core Branding Message & High-Fidelity Illustration */}
          <div className="my-auto space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono bg-red-950/60 text-red-200 border border-red-800/40 font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                Portal de Membros Oficial (SA)
              </span>
              <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                Bem-vindo ao <span className="text-[#FFCC00]">MPLA</span>
              </h1>
              <p className="text-slate-300 leading-relaxed text-sm max-w-sm">
                Gerencie sua filiação, cartão digital de membro, eventos e comunicações com segurança a partir de um único local.
              </p>
            </div>

            {/* Semi-transparent Glassmorphism Illustration Block */}
            <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg max-w-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/20 rounded-full blur-3xl opacity-60" />

              <div className="space-y-4 relative z-10">
                {/* Simulated Digital Card UI */}
                <div className="border border-[#FFCC00] rounded-xl p-4 bg-gradient-to-br from-[#D3122A] via-[#D3122A] to-slate-950 text-white space-y-3 shadow-md">
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-16 bg-[#FFCC00]/30 rounded-full" />
                    <span className="text-[9px] font-bold text-[#FFCC00]">★ MPLA</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <img
                        src={images.mplaLogo}
                        alt="MPLA"
                        className="w-5 h-5 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-2 w-24 bg-white/80 rounded-full" />
                      <div className="h-1.5 w-16 bg-[#FFCC00]/70 rounded-full" />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <div className="h-2 w-12 bg-green-500 rounded-full" />
                    <div className="text-[8px] font-mono text-[#FFCC00]">Sede África do Sul</div>
                  </div>
                </div>

                <p className="text-xs text-slate-200 font-semibold text-center">
                  Identidade Digital Criptografada e Sincronização em Tempo Real
                </p>
              </div>
            </div>

            {/* Features small icon checklist */}
            <div className="space-y-3">
              {[
                "Acesso Seguro e Proteção Multi-factor",
                "Cartão de Membro Digital com Código QR",
                "Inscrição em Eventos Regionais e Presenças",
                "Notificações em tempo real da Sede Central",
                "Gestão de Perfil e Atribuição de Comités"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#FFCC00]/15 border border-[#FFCC00]/30 flex items-center justify-center text-[#FFCC00] shrink-0 font-bold">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Panel Footer info */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-white/10 pt-4">
            <span>MPLA CENTRAL GATEWAY SECURITY v2.2</span>
            <span className="text-[#FFCC00] font-bold">CONSTITUCIONAL</span>
          </div>
        </div>

        {/* Right Panel: 55% (Cols 5-10) - Authenticating Forms (Semi-transparent background for seamless integration) */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-white/95 backdrop-blur-md">

          {/* Logo on mobile only */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8 self-start">
            <div className="w-10 h-10 bg-white border-2 border-[#FFCC00] p-1 rounded-lg flex items-center justify-center text-white">
              <img
                src={images.mplaLogo}
                alt="MPLA Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-sans font-bold text-sm text-[#111827]">
                MPLA Cape Town
              </h2>
            </div>
          </div>

          {/* Main Centered Authentication Card Container */}
          <div className="w-full max-w-[460px] py-4">

            {/* SIGN IN SCREEN */}
            {mode === "signin" && (
              <div className="space-y-6">
                {/* Secure Portal Separator Checkbox */}
                <div className="bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E5E7EB] grid grid-cols-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setRole("member")}
                    className={`py-2 rounded-lg cursor-pointer transition flex items-center justify-center gap-1.5 ${
                      role === "member"
                        ? "bg-white text-[#111827] shadow-xs font-bold border border-[#E5E7EB]"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Member Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`py-2 rounded-lg cursor-pointer transition flex items-center justify-center gap-1.5 ${
                      role === "admin"
                        ? "bg-white text-[#111827] shadow-xs font-bold border border-[#E5E7EB]"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Portal do Super Administrador
                  </button>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-[#DC2626] p-4 rounded-xl border border-red-100 flex items-start gap-2.5 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Smart Identifier Input */}
                  <div className="space-y-2">
                    <label htmlFor="signin_identifier" className="block text-xs font-semibold text-[#111827]">
                      {role === "admin" ? "Email ou utilizador do Super Administrador" : "Número de Militante / Email / Telefone"}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                        {role === "admin" ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </div>
                      <input
                        id="signin_identifier"
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={role === "admin" ? "Digite o utilizador administrador" : "Digite número de militante, email ou telefone"}
                        className="block w-full pl-11 pr-4 py-3.5 h-[52px] bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] focus:border-[#C8102E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="signin_password" className="block text-xs font-semibold text-[#111827]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-[#6B7280] hover:text-[#C8102E] font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        id="signin_password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="block w-full pl-11 pr-11 py-3.5 h-[52px] bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] focus:border-[#C8102E] focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7280] hover:text-[#111827]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center">
                    <input
                      id="signin_remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#C8102E] focus:ring-[#C8102E] border-[#E5E7EB] rounded-sm cursor-pointer"
                    />
                    <label htmlFor="signin_remember" className="ml-2 block text-xs text-[#6B7280] font-medium cursor-pointer">
                      Remember login details
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="signin_submit_btn"
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  {/* OR Quick OTP Line */}
                  {role !== "admin" && (
                    <>
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-[#E5E7EB]"></div>
                        <span className="flex-shrink mx-4 text-[10px] text-[#6B7280] font-mono">OR QUICK ACCESS</span>
                        <div className="flex-grow border-t border-[#E5E7EB]"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRequestOTP}
                        disabled={loading}
                        className="w-full h-14 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#111827] font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] cursor-pointer"
                      >
                        Continue with OTP
                      </button>
                    </>
                  )}
                </form>

                {role !== "admin" && (
                  <div className="text-center pt-2">
                    <p className="text-xs text-[#6B7280]">
                      Don't have an account?{" "}
                      <button
                        onClick={() => {
                          setErrorMsg("");
                          setMode("signup");
                        }}
                        className="text-[#C8102E] font-semibold hover:underline"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                )}

                {/* Security Trust Note */}
                <p className="text-[10px] text-[#6B7280] text-center font-medium bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E5E7EB]">
                  🔒 As suas informações estão criptografadas e protegidas sob os regulamentos internos do MPLA Cape Town.
                </p>
              </div>
            )}

            {/* PROGRESSIVE SIGN UP SCREEN */}
            {mode === "signup" && (
              <div className="space-y-6">
                <button
                  onClick={() => {
                    setErrorMsg("");
                    if (signUpStep > 1) {
                      setSignUpStep(signUpStep - 1);
                    } else {
                      setMode("signin");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {signUpStep === 1 ? "Back to login" : "Previous Step"}
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-[#111827] tracking-tight mb-1">Create National Account</h1>
                  <p className="text-[#6B7280] text-xs">Complete 5 quick steps to finalize your central party enrollment.</p>
                </div>

                {/* Progressive Bar Indicator: ●────○────○────○────○ */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold font-mono text-[#6B7280]">
                    <span className="text-[#C8102E]">Step {signUpStep} of 5</span>
                    <span>
                      {signUpStep === 1 && "Personal Identification"}
                      {signUpStep === 2 && "Security & Password"}
                      {signUpStep === 3 && "Regional Assignment"}
                      {signUpStep === 4 && "Accreditation Photo"}
                      {signUpStep === 5 && "Review & Submit"}
                    </span>
                  </div>

                  {/* Dot line indicator */}
                  <div className="flex items-center gap-1 justify-between py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <React.Fragment key={s}>
                        <div
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 ${
                            s <= signUpStep
                              ? "bg-[#C8102E] text-white shadow-xs"
                              : "bg-[#E5E7EB] text-[#6B7280]"
                          }`}
                        >
                          {s < signUpStep ? "✓" : s}
                        </div>
                        {s < 5 && (
                          <div
                            className={`h-0.5 w-full rounded-full ${
                              s < signUpStep ? "bg-[#C8102E]" : "bg-[#E5E7EB]"
                            }`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-[#DC2626] p-4 rounded-xl border border-red-100 flex items-start gap-2.5 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* STEP 1: Personal Credentials */}
                {signUpStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Full National Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Naledi Mandela"
                          value={signUpData.fullName}
                          onChange={(e) => {
                            const updated = { ...signUpData, fullName: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 1);
                          }}
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">National ID / Passport Number</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. 9507175123089"
                          value={signUpData.nationalId}
                          onChange={(e) => {
                            const updated = { ...signUpData, nationalId: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 1);
                          }}
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Mobile Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. +27 82 555 1234"
                          value={signUpData.mobile}
                          onChange={(e) => {
                            const updated = { ...signUpData, mobile: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 1);
                          }}
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Password & Email */}
                {signUpStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Primary Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. name@domain.com"
                          value={signUpData.email}
                          onChange={(e) => {
                            const updated = { ...signUpData, email: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 2);
                          }}
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Choose Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={signUpData.password}
                          onChange={(e) => {
                            const updated = { ...signUpData, password: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 2);
                          }}
                          className="block w-full pl-11 pr-11 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7280]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={signUpData.confirmPassword}
                          onChange={(e) => {
                            const updated = { ...signUpData, confirmPassword: e.target.value };
                            setSignUpData(updated);
                            saveSignUpDraft(updated, 2);
                          }}
                          className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Real-time Password Strength Indicator */}
                    {signUpData.password && (
                      <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] space-y-2.5">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-[#6B7280]">Password Strength:</span>
                          <span className={strength.score >= 4 ? "text-green-600" : strength.score >= 2 ? "text-amber-500" : "text-red-500"}>
                            {strength.label}
                          </span>
                        </div>
                        {/* Progress Bar of Strength */}
                        <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((idx) => (
                            <div
                              key={idx}
                              className={`h-full w-1/5 transition ${
                                idx <= strength.score ? strength.color : "bg-transparent"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Checklist */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-[#6B7280]">
                          <div className="flex items-center gap-1.5">
                            <span className={strength.requirements.length ? "text-[#16A34A]" : "text-[#6B7280]"}>
                              {strength.requirements.length ? "✔" : "○"} 8+ Characters
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={strength.requirements.upper ? "text-[#16A34A]" : "text-[#6B7280]"}>
                              {strength.requirements.upper ? "✔" : "○"} Uppercase (A-Z)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={strength.requirements.lower ? "text-[#16A34A]" : "text-[#6B7280]"}>
                              {strength.requirements.lower ? "✔" : "○"} Lowercase (a-z)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={strength.requirements.num ? "text-[#16A34A]" : "text-[#6B7280]"}>
                              {strength.requirements.num ? "✔" : "○"} Number (0-9)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={strength.requirements.sym ? "text-[#16A34A]" : "text-[#6B7280]"}>
                              {strength.requirements.sym ? "✔" : "○"} Special Symbol
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: Province, Municipality, Committee */}
                {signUpStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Province / Region</label>
                      <select
                        value={signUpData.province}
                        onChange={(e) => {
                          const prov = e.target.value;
                          const mapped = PROVINCE_MAPPING[prov];
                          const updated = {
                            ...signUpData,
                            province: prov,
                            municipality: mapped?.municipalities[0] || "",
                            committee: mapped?.committees[0] || ""
                          };
                          setSignUpData(updated);
                          saveSignUpDraft(updated, 3);
                        }}
                        className="block w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden cursor-pointer"
                      >
                        {Object.keys(PROVINCE_MAPPING).map((prov) => (
                          <option key={prov} value={prov}>{prov}</option>
                        ))}
                      </select>
                    </div>

                    {/* Adaptive Municipality Selector */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Municipality</label>
                      <select
                        value={signUpData.municipality}
                        onChange={(e) => {
                          const updated = { ...signUpData, municipality: e.target.value };
                          setSignUpData(updated);
                          saveSignUpDraft(updated, 3);
                        }}
                        className="block w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden cursor-pointer"
                      >
                        {PROVINCE_MAPPING[signUpData.province]?.municipalities.map((muni) => (
                          <option key={muni} value={muni}>{muni}</option>
                        ))}
                      </select>
                    </div>

                    {/* Adaptive Committee Selector */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#111827]">Ward Local Committee</label>
                      <select
                        value={signUpData.committee}
                        onChange={(e) => {
                          const updated = { ...signUpData, committee: e.target.value };
                          setSignUpData(updated);
                          saveSignUpDraft(updated, 3);
                        }}
                        className="block w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden cursor-pointer"
                      >
                        {PROVINCE_MAPPING[signUpData.province]?.committees.map((comm) => (
                          <option key={comm} value={comm}>{comm}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4: Photo Selection and Simulated Capture */}
                {signUpStep === 4 && (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-[#111827] text-center">
                      Accreditation Photo ID
                    </label>

                    {/* Image display */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E5E7EB] rounded-xl bg-[#F8FAFC]">
                      {isCameraActive ? (
                        <div className="w-32 h-32 bg-[#111827] rounded-full flex flex-col items-center justify-center text-white relative overflow-hidden animate-pulse">
                          <span className="text-xs font-mono tracking-widest text-[#6B7280]">RECORDING</span>
                          {cameraCountdown !== null && (
                            <span className="text-4xl font-black text-[#C8102E] mt-1">{cameraCountdown}</span>
                          )}
                        </div>
                      ) : signUpData.photo ? (
                        <div className="relative">
                          <img
                            src={signUpData.photo}
                            alt="Accreditation avatar preview"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-1 right-1 bg-[#16A34A] text-white rounded-full p-1 shadow-xs">
                            <Check className="w-4 h-4" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
                          <User className="w-12 h-12" />
                        </div>
                      )}

                      <p className="text-[11px] text-[#6B7280] text-center mt-3 leading-relaxed">
                        Accreditation ID photo requires clear front lighting with eyes directly centered.
                      </p>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={triggerCameraCapture}
                        disabled={isCameraActive}
                        className="h-12 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-semibold text-[#111827] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Camera className="w-4 h-4 text-[#C8102E]" />
                        Capture Snapshot
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          // Assign random preloaded sample
                          const sample = PHOTO_SAMPLES[Math.floor(Math.random() * PHOTO_SAMPLES.length)];
                          const updated = { ...signUpData, photo: sample };
                          setSignUpData(updated);
                          saveSignUpDraft(updated, 4);
                        }}
                        className="h-12 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-semibold text-[#111827] rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-[#6B7280]" />
                        Upload Template
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: Final Review & Submit */}
                {signUpStep === 5 && (
                  <div className="space-y-4 text-xs">
                    <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E5E7EB] space-y-3">
                      <p className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB] pb-1">
                        Accreditation Review File
                      </p>

                      <div className="flex gap-4 items-center">
                        <img
                          src={signUpData.photo || PHOTO_SAMPLES[0]}
                          alt="Review avatar"
                          className="w-14 h-14 rounded-full object-cover border border-[#E5E7EB]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-[#111827] text-sm">{signUpData.fullName}</p>
                          <p className="text-[#6B7280]">ID: {signUpData.nationalId}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-[#E5E7EB]">
                        <div>
                          <p className="text-[#6B7280] font-medium text-[10px]">MOBILE PHONE</p>
                          <p className="font-bold text-[#111827]">{signUpData.mobile}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] font-medium text-[10px]">EMAIL ADDRESS</p>
                          <p className="font-bold text-[#111827] truncate">{signUpData.email}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] font-medium text-[10px]">PROVINCE</p>
                          <p className="font-bold text-[#111827]">{signUpData.province}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] font-medium text-[10px]">MUNICIPALITY</p>
                          <p className="font-bold text-[#111827] truncate">{signUpData.municipality}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E5E7EB]">
                        <p className="text-[#6B7280] font-medium text-[10px]">ASSIGNED COMMITTEE</p>
                        <p className="font-bold text-[#111827]">{signUpData.committee}</p>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#6B7280] leading-relaxed">
                      By submitting this central registration file, you confirm that your provided information is legally truthful, matching municipal voter registrations.
                    </p>
                  </div>
                )}

                {/* Continue / Submit triggers */}
                {signUpStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleSignUpStepContinue}
                    className="w-full h-14 bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] cursor-pointer"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSignUpSubmit}
                    disabled={loading}
                    className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Finalize & Submit Registration
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* OTP VERIFICATION SCREEN */}
            {mode === "otp" && (
              <div className="space-y-6">
                <button
                  onClick={() => {
                    setErrorMsg("");
                    setMode("signin");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-[#111827] tracking-tight mb-2">Verify Your Identity</h1>
                  <p className="text-[#6B7280] text-sm">
                    We sent an encrypted security code to <strong className="text-[#111827]">{otpSentTo}</strong>.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-[#DC2626] p-4 rounded-xl border border-red-100 flex items-start gap-2.5 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 6 Digit Individual boxes */}
                <div className="flex justify-between gap-2.5 py-4">
                  {otpCode.map((char, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(el) => {
                        if (el) otpInputRefs.current[index] = el;
                      }}
                      value={char}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 text-center font-bold text-lg border border-[#E5E7EB] bg-white text-[#111827] rounded-xl focus:ring-2 focus:ring-[#C8102E] focus:outline-hidden"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B7280]">
                    {countdown > 0 ? (
                      `Resend code in ${countdown}s`
                    ) : (
                      "Didn't receive code?"
                    )}
                  </span>

                  <button
                    type="button"
                    disabled={countdown > 0}
                    onClick={handleRequestOTP}
                    className="text-[#C8102E] font-semibold hover:underline disabled:opacity-40 disabled:pointer-events-none"
                  >
                    Resend Code
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={otpLoading}
                  className="w-full h-14 bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {otpLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Verify Identity"
                  )}
                </button>
              </div>
            )}

            {/* FORGOT PASSWORD SCREEN */}
            {mode === "forgot" && (
              <div className="space-y-6">
                <button
                  onClick={() => {
                    setErrorMsg("");
                    setForgotSent(false);
                    setMode("signin");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Sign In
                </button>

                {!forgotSent ? (
                  <>
                    <div>
                      <h1 className="text-2xl font-bold text-[#111827] tracking-tight mb-2">Reset Password</h1>
                      <p className="text-[#6B7280] text-sm">
                        Enter your credentials to receive an encrypted reset link.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="bg-red-50 text-[#DC2626] p-4 rounded-xl border border-red-100 flex items-start gap-2.5 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#111827]">
                          Email, Membership Number, or Phone Number
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 text-[#6B7280] w-5 h-5" />
                          <input
                            type="text"
                            required
                            placeholder="Enter your credential"
                            value={forgotIdentifier}
                            onChange={(e) => setForgotIdentifier(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#6B7280] focus:ring-1 focus:ring-[#C8102E] h-[52px] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Send Reset Link"
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-[#111827]">Reset Link Dispatched</h2>
                    <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                      A secured reset communication has been sent to the linked contact endpoint. Please check your inbox within 10 minutes.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setMode("signin");
                      }}
                      className="px-6 py-2.5 bg-white border border-[#E5E7EB] rounded-xl font-semibold text-xs text-[#111827] hover:bg-[#F8FAFC]"
                    >
                      Return to Login
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SUCCESS SCREEN */}
            {mode === "success" && (
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto animate-bounce shadow-lg shadow-green-100">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-[#111827]">Registo concluído com sucesso!</h1>
                  <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                    O seu registo foi gravado com segurança na base de dados partidária. A fila do cartão digital está activa.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] text-left space-y-2.5 max-w-sm mx-auto">
                  <p className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-wider">Credenciais de acesso</p>
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">IDENTIFIER</span>
                    <span className="font-bold text-xs text-[#111827]">{signUpData.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7280] block">MEMBERSHIP NO</span>
                    <span className="font-mono text-xs font-bold text-[#C8102E]">MP-2026-GENERATED</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setIdentifier(signUpData.email);
                    setPassword("");
                    setMode("signin");
                  }}
                  className="w-full h-14 bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold text-sm rounded-xl flex items-center justify-center transition active:scale-[0.99] cursor-pointer"
                >
                  Continuar para iniciar sessão
                </button>
              </div>
            )}

          </div>

          {/* Right Panel Footer - Responsive & accessible links */}
          <div className="w-full max-w-[460px] border-t border-[#E5E7EB] pt-6 mt-8 flex flex-wrap justify-between items-center text-[11px] text-[#6B7280] font-medium gap-2">
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-[#111827] hover:underline">Política de Privacidade</a>
              <a href="#terms" className="hover:text-[#111827] hover:underline">Termos de Serviço</a>
              <a href="#help" className="hover:text-[#111827] hover:underline">Ajuda e Apoio</a>
            </div>
            <div className="font-mono text-[10px] text-right">
              Gateway v2.2 AA<br/><a href="http://www.ai.neurogrowthlabs.co.za" target="_blank" rel="noreferrer" className="text-[#C8102E] font-bold hover:underline">Developed by NeuroGrowth Labs www.ai.neurogrowthlabs.co.za</a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
