import React, { useState } from "react";
import { Member } from "../types";
import { Download, Share2, Shield, CreditCard, CheckCircle, Truck, Package, Clock, Wifi, Wallet } from "lucide-react";
import { images } from "../assets/images";

interface DigitalCardProps {
  member: Member;
}

export default function DigitalCard({ member }: DigitalCardProps) {
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const shareLink = `https://portal.party.org/verify/${member.membershipNo}`;
  const watermark = new Date().toLocaleString("pt-ZA", { dateStyle: "short", timeStyle: "medium" });
  const trackingCode = `MPLA-CPT-${member.membershipNo.replace(/[^A-Z0-9]/gi, "").slice(-8)}-${member.id.replace(/[^A-Z0-9]/gi, "").toUpperCase()}`;

  const downloadPrintablePdf = () => {
    const printable = window.open("", "_blank", "width=900,height=650");
    if (!printable) return;
    printable.document.write(`<!doctype html><html><head><title>Cartão ${member.membershipNo}</title><style>body{font-family:Arial,sans-serif;padding:28px;color:#111827}.card{width:760px;border:3px double #c8102e;border-radius:20px;padding:24px;position:relative;background:#fff}.head{display:flex;gap:16px;align-items:center;border-bottom:1px solid #eee;padding-bottom:12px}.logo{width:72px;height:72px}.name{font-size:24px;font-weight:900;text-transform:uppercase}.grid{display:grid;grid-template-columns:160px 1fr;gap:22px;margin-top:22px}.photo{width:150px;height:180px;object-fit:cover;border:2px solid #ffcc00;border-radius:10px}.label{font-size:10px;color:#64748b;text-transform:uppercase;font-weight:700}.value{font-size:15px;font-weight:800;margin-bottom:12px}.wm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:28px;color:rgba(200,16,46,.12);transform:rotate(-28deg);font-weight:900;pointer-events:none}.foot{border-top:1px solid #eee;margin-top:18px;padding-top:12px;font-size:11px;color:#64748b;display:flex;justify-content:space-between}</style></head><body><div class="card"><div class="wm">VALIDADO ${watermark}</div><div class="head"><img class="logo" src="${images.mplaLogo}"/><div><div style="font-size:12px;font-weight:900;color:#c8102e">MPLA CAPE • Sede Cape Town</div><div style="font-size:22px;font-weight:900">Cartão Oficial do Militante</div></div></div><div class="grid"><img class="photo" src="${member.photo}"/><div><div class="label">Nome Completo</div><div class="value">${member.fullName}</div><div class="label">Nº de Militante</div><div class="value">${member.membershipNo}</div><div class="label">BI / Passaporte</div><div class="value">${member.nationalId}</div><div class="label">Comité</div><div class="value">${member.committee || "Comité MPLA Cape Town"}</div><div class="label">Emissão</div><div class="value">${member.registrationDate}</div></div></div><div class="foot"><span>${trackingCode}</span><span>Desenvolvido por NeuroGrowth Labs • www.ai.neurogrowthlabs.co.za</span></div></div><script>window.print()</script></body></html>`);
    printable.document.close();
  };

  const addToWallet = () => {
    const pass = { formatVersion: 1, passTypeIdentifier: "pass.co.za.mpla.member", serialNumber: member.membershipNo, organizationName: "MPLA CAPE", description: "Cartão de Militante", generic: { primaryFields: [{ key: "name", label: "Militante", value: member.fullName }], secondaryFields: [{ key: "no", label: "Nº", value: member.membershipNo }] } };
    const blob = new Blob([JSON.stringify(pass, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${member.membershipNo}-wallet-pass.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Physical card pipeline steps (Portuguese labels)
  const steps = [
    { key: "Submitted", label: "Submetido", icon: Clock },
    { key: "Verification", label: "Verificação", icon: Shield },
    { key: "Approved", label: "Aprovado", icon: CheckCircle },
    { key: "Printing", label: "Impressão", icon: CreditCard },
    { key: "Quality Check", label: "Controlo", icon: Shield },
    { key: "Ready for Dispatch", label: "Expedido", icon: Package },
    { key: "In Transit", label: "Em Trânsito", icon: Truck },
    { key: "Available for Collection", label: "Pronto", icon: CheckCircle },
    { key: "Collected", label: "Entregue", icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === member.physicalCardStatus);

  // Security pattern SVGs for premium government card look
  const GuillochePattern = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="guilloche" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 C 15 15, 45 15, 60 30 C 45 45, 15 45, 0 30 Z" fill="none" stroke="#B5121B" strokeWidth="0.4" />
          <path d="M0 30 C 15 5, 45 5, 60 30 C 45 55, 15 55, 0 30 Z" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
          <circle cx="30" cy="30" r="22" fill="none" stroke="#1A1A1A" strokeWidth="0.4" strokeDasharray="1,2" />
          <path d="M30 0 L30 60 M0 30 L60 30" stroke="#B5121B" strokeWidth="0.2" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guilloche)" />
    </svg>
  );

  const HolographicStrip = () => (
    <div className="absolute top-0 right-[22%] w-8 h-full bg-gradient-to-r from-teal-300/15 via-indigo-300/25 to-amber-300/15 opacity-85 mix-blend-color-dodge blur-[0.3px] pointer-events-none border-l border-r border-white/5 flex flex-col justify-around items-center py-4 text-[6px] text-white/40 font-mono tracking-widest uppercase select-none">
      <span>S</span>
      <span>E</span>
      <span>C</span>
      <span>U</span>
      <span>R</span>
      <span>E</span>
    </div>
  );

  // Card perspective styling to support browser-neutral 3D flip cleanly
  const cardStyle = {
    perspective: "1200px",
  };

  const cardInnerStyle = {
    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
    transformStyle: "preserve-3d" as const,
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const cardFaceStyle = {
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
  };

  const cardBackFaceStyle = {
    backfaceVisibility: "hidden" as const,
    WebkitBackfaceVisibility: "hidden" as const,
    transform: "rotateY(180deg)",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="digital-card-section">
      
      {/* Visual Digital Card */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-[440px] mb-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono">
            Cartão Oficial do Militante
          </h3>
          <span className="text-[10px] bg-[#B5121B]/10 text-[#B5121B] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#B5121B]/20">
            <span className="w-1.5 h-1.5 bg-[#B5121B] rounded-full animate-ping" />
            Emissão Segura
          </span>
        </div>

        {/* 3D Premium Card Element */}
        <div 
          className="relative w-full max-w-[440px] aspect-[85.60/53.98] rounded-3xl cursor-pointer select-none group"
          style={cardStyle}
          onClick={() => setFlipped(!flipped)}
        >
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl transition-all duration-500"
            style={cardInnerStyle}
          >
            
            {/* FRONT SIDE */}
            <div 
              className="absolute inset-0 w-full h-full p-5 flex flex-col justify-between bg-white text-[#1A1A1A] rounded-2xl border-[3px] border-double border-slate-300 overflow-hidden shadow-2xl"
              style={cardFaceStyle}
            >
              {/* Fine Microtext-inspired anti-counterfeit outer border */}
              <div className="absolute inset-1.5 border border-[#B5121B]/20 rounded-xl pointer-events-none" />
              
              {/* Background Security patterns */}
              <GuillochePattern />
              <HolographicStrip />

              {/* Header section with Angola flag accents and logos */}
              <div className="relative z-10 flex justify-between items-start border-b border-[#B5121B]/25 pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-white p-1 rounded border border-[#D4AF37] shadow-xs">
                    <img 
                      src={images.mplaLogo} 
                      alt="MPLA Logo" 
                      className="w-7 h-7 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-[8px] sm:text-[9px] font-sans font-black tracking-wider text-[#1A1A1A] uppercase leading-none">
                      Movimento Popular de Libertação de Angola
                    </h2>
                    <p className="text-[6px] sm:text-[7px] text-[#B5121B] font-mono tracking-widest uppercase mt-0.5 font-extrabold">
                      Comité MPLA CAPE • Sede Cape Town
                    </p>
                    <h3 className="text-[11px] font-mono font-black text-[#B5121B] tracking-widest mt-1">
                      CARTÃO DO MILITANTE
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase font-black ${
                    member.status === "Active" 
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-700 border border-amber-500/20"
                  }`}>
                    {member.status === "Active" ? "ACTIVO" : "PENDENTE"}
                  </span>
                </div>
              </div>

              {/* Main Card Grid */}
              <div className="relative z-10 grid grid-cols-12 gap-2 items-center flex-1 py-1.5 min-h-0">
                
                {/* Photo with fine holographic seal and micro-border */}
                <div className="col-span-4 flex flex-col items-center justify-center relative">
                  <div className="relative p-0.5 bg-gradient-to-br from-[#B5121B] via-[#D4AF37] to-[#1A1A1A] rounded-lg shadow-md">
                    <img 
                      src={member.photo} 
                      alt={member.fullName} 
                      className="w-18 h-20 sm:w-20 sm:h-22 object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                    {/* Simulated UV Overlay */}
                    <div className="absolute inset-0 bg-yellow-300/10 mix-blend-overlay pointer-events-none rounded-md" />
                  </div>
                  
                  {/* NFC Chip Indicator */}
                  <div className="absolute bottom-1 -left-1 bg-amber-400/90 border border-[#D4AF37] w-5 h-4 rounded-sm flex flex-col justify-between p-0.5 shadow-sm">
                    <div className="flex justify-between"><div className="w-1 h-0.5 bg-amber-800/40 rounded-full" /><div className="w-1 h-0.5 bg-amber-800/40 rounded-full" /></div>
                    <div className="h-0.5 bg-amber-800/40 w-full rounded-sm" />
                    <div className="flex justify-between"><div className="w-1 h-0.5 bg-amber-800/40 rounded-full" /><div className="w-1 h-0.5 bg-amber-800/40 rounded-full" /></div>
                  </div>
                </div>

                {/* Secure Details Layout */}
                <div className="col-span-8 grid grid-cols-2 gap-x-3 gap-y-1 text-left">
                  <div className="col-span-2">
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Nome Completo</p>
                    <p className="text-[10px] sm:text-xs font-black text-slate-900 font-sans tracking-wide uppercase truncate mt-0.5">
                      {member.fullName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Nº de Militante</p>
                    <p className="text-[9px] font-mono font-black text-[#B5121B] tracking-wider mt-0.5">
                      {member.membershipNo}
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">B.I. / Passaporte</p>
                    <p className="text-[9px] font-mono font-bold text-slate-800 mt-0.5">
                      {member.nationalId}
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Província • Município</p>
                    <p className="text-[8px] font-sans font-bold text-slate-800 truncate mt-0.5">
                      {member.province} • Cazenga
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Comité • Secção</p>
                    <p className="text-[8px] font-sans font-bold text-slate-800 truncate mt-0.5">
                      {member.committee || "Comité Geral"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Categoria</p>
                    <p className="text-[8px] font-mono font-bold text-[#D4AF37] uppercase mt-0.5">
                      {member.membershipLevel || "EFECTIVO"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[6px] uppercase tracking-wider text-slate-400 font-mono font-bold leading-none">Emissão</p>
                    <p className="text-[8px] font-mono font-bold text-slate-800 mt-0.5">
                      {member.registrationDate || "12/2025"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer containing QR verification and Barcode */}
              <div className="relative z-10 flex justify-between items-end border-t border-slate-200 pt-1.5">
                <div className="flex-1">
                  {/* Barcode representation along bottom edge */}
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="h-4 w-40 bg-slate-900/10 rounded flex items-center justify-around p-0.5 overflow-hidden">
                      <div className="flex gap-[1px] items-stretch h-full w-full">
                        {[...Array(30)].map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-slate-900" 
                            style={{ width: `${(i % 5 === 0 ? 3 : i % 3 === 0 ? 1 : 2)}px` }} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[5.5px] font-mono font-bold tracking-widest text-slate-500">
                      ID-{member.id}-{member.membershipNo}
                    </p>
                  </div>
                </div>

                {/* Small QR Code and Contactless Graphic */}
                <div className="flex items-center gap-1.5">
                  <div className="flex flex-col items-center">
                    <Wifi className="w-3 h-3 text-slate-400 rotate-90" />
                    <span className="text-[5px] font-mono text-slate-400 uppercase font-bold">NFC ACTIVE</span>
                  </div>
                  <div className="bg-white p-0.5 rounded border border-slate-300 shadow-xs">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${shareLink}`} 
                      alt="Verification Front QR" 
                      className="w-7 h-7"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className="absolute inset-0 w-full h-full p-5 flex flex-col justify-between bg-[#FDFDFD] text-[#1A1A1A] rounded-2xl border-[3px] border-double border-slate-300 overflow-hidden shadow-2xl"
              style={cardBackFaceStyle}
            >
              {/* Fine border */}
              <div className="absolute inset-1.5 border border-[#B5121B]/20 rounded-xl pointer-events-none" />
              
              <GuillochePattern />

              {/* Magnetic Strip along top */}
              <div className="absolute top-3 left-0 right-0 h-8 bg-gradient-to-b from-[#1A1A1A] to-slate-950" />
              
              <div className="relative z-10 pt-7 flex flex-col justify-between flex-1">
                
                <div className="grid grid-cols-12 gap-3 items-start mt-2">
                  
                  {/* Left Side: Serial, Notice and Support Info */}
                  <div className="col-span-8 space-y-2.5 text-left">
                    <div>
                      <p className="text-[6px] font-mono font-bold text-slate-400 uppercase">NÚMERO DE SÉRIE / SERIAL NO.</p>
                      <p className="text-[9px] font-mono font-black text-slate-800">
                        S/N: AO-993-{(member.id || "00").toUpperCase()}
                      </p>
                    </div>

                    {/* Signature panels */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-0.5">
                        <label className="block text-[5px] uppercase font-mono font-bold text-slate-400">Assinatura do Militante</label>
                        <div className="bg-slate-100 border border-slate-300 p-1 rounded h-6 flex items-center justify-center">
                          <span className="font-serif italic text-slate-700 text-[10px] select-none font-semibold truncate">
                            {member.fullName}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-0.5">
                        <label className="block text-[5px] uppercase font-mono font-bold text-slate-400">Assinatura Autorizada</label>
                        <div className="bg-slate-100 border border-slate-300 p-1 rounded h-6 flex items-center justify-center relative">
                          <span className="font-serif italic text-slate-500 text-[8px] select-none">Sec. Geral</span>
                          {/* Digital seal watermarked */}
                          <div className="absolute w-4 h-4 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center text-[4px] text-red-500 font-mono font-black scale-125 right-1 bottom-1">
                            MPLA
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Usage notice in Portuguese */}
                    <div className="space-y-1">
                      <p className="text-[5.5px] text-slate-500 leading-normal max-w-[250px]">
                        Este cartão é propriedade exclusiva do MPLA. O seu uso é pessoal, intransmissível e regido pelos Estatutos do Partido. Se for encontrado, por favor entregue no Comité mais próximo ou devolva à Sede de Círculo Local.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: QR Code Area */}
                  <div className="col-span-4 flex flex-col items-center text-center">
                    <p className="text-[5px] font-mono font-black text-slate-500 uppercase tracking-wider mb-1">CÓDIGO DE VALIDAÇÃO</p>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-300 shadow-sm">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${shareLink}`} 
                        alt="Verification QR" 
                        className="w-16 h-16"
                      />
                    </div>
                    <span className="text-[5px] font-mono text-slate-400 mt-1 uppercase font-bold">DIGITAL VERIFIED</span>
                  </div>
                </div>

                {/* Back Footer Area */}
                <div className="border-t border-slate-200 pt-1.5 flex justify-between items-center text-[6px] font-mono text-slate-400 font-bold">
                  <span>WWW.MPLA.AO</span>
                  <span>SUPORTE: MILITANTE@MPLA.AO</span>
                  <span>+244 222 333 444</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3 text-center font-semibold italic flex items-center gap-1.5 justify-center">
          <Share2 className="w-3.5 h-3.5" />
          Clique no cartão para girar. Marca de água dinâmica: {watermark}
        </p>

        {/* Quick Actions for Digital Card */}
        <div className="flex gap-3 mt-4 w-full max-w-[440px]">
          <button 
            onClick={downloadPrintablePdf}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Download PDF
          </button>
          <button onClick={addToWallet} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-50 border border-amber-100 rounded-xl text-xs font-bold text-amber-800 hover:bg-amber-100 transition shadow-xs cursor-pointer"><Wallet className="w-4 h-4" />Adicionar ao Wallet</button>
          <button 
            onClick={copyShareLink}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            {copied ? "Link Copiado!" : "Partilhar Link"}
          </button>
        </div>
      </div>

      {/* Physical Card Delivery Tracker */}
      <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-display font-extrabold text-slate-900 text-sm">Estado do Cartão Físico</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Acompanhe a produção e logística de entrega do seu cartão oficial.</p>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-[10px] font-mono font-bold text-[#B5121B] uppercase shrink-0">
              <CreditCard className="w-3.5 h-3.5" />
              EST: 2 SEMANAS
            </span>
          </div>

          {/* Desktop/Mobile Status Pipeline */}
          <div className="relative mt-8 mb-6 pl-6 border-l-2 border-slate-100 space-y-6 md:space-y-0 md:border-l-0 md:border-t-2 md:border-slate-100 md:flex md:justify-between md:pl-0 md:pt-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="relative flex items-center md:flex-col md:text-center md:flex-1">
                  {/* Point Marker */}
                  <div className={`absolute -left-[31px] md:relative md:left-0 md:-top-[34px] w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    isPast ? "bg-[#B5121B] border-[#B5121B]" :
                    isCurrent ? "bg-[#B5121B] border-[#B5121B] scale-125 shadow-md shadow-red-200 ring-2 ring-[#B5121B] animate-pulse" :
                    "bg-white border-slate-200"
                  }`}>
                    {isPast && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    {isCurrent && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  </div>

                  {/* Icon & Label */}
                  <div className="flex items-center gap-3 md:flex-col md:gap-1 pl-4 md:pl-0 mt-[-4px] md:mt-0">
                    <StepIcon className={`w-4 h-4 ${
                      isCurrent ? "text-[#B5121B] font-bold animate-bounce" :
                      isPast ? "text-slate-600" : "text-slate-300"
                    }`} />
                    <p className={`text-[10px] leading-tight font-bold ${
                      isCurrent ? "text-[#B5121B]" :
                      isPast ? "text-slate-700" : "text-slate-400"
                    }`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed status summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-50 text-[#B5121B] rounded-lg mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                Etapa de Logística Actual: {steps[currentStepIndex]?.label || member.physicalCardStatus}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                {member.physicalCardStatus === "Submitted" && "O seu pedido de segunda via foi registado na base de dados. O secretário de verificação local irá autenticar os seus dados de identificação nacional."}
                {member.physicalCardStatus === "Verification" && "A sua ficha oficial de filiação partidária está sob auditoria da delegação provincial do comité nacional do partido."}
                {member.physicalCardStatus === "Approved" && "Parabéns, a sua conta foi verificada com sucesso. Os dados criptográficos do chip foram exportados para o centro nacional emissor."}
                {member.physicalCardStatus === "Printing" && "O seu cartão físico entrou em processo de gravação física. A impressora central emitiu a requisição de cunho holográfico."}
                {member.physicalCardStatus === "Quality Check" && "O cartão já foi emitido e encontra-se na fase final de controlo de integridade magnética, gravação de chips e autenticação de holograma de segurança."}
                {member.physicalCardStatus === "Ready for Dispatch" && "O cartão passou todos os testes de segurança. Foi selado em envelope blindado de transporte e encaminhado para os correios expressos."}
                {member.physicalCardStatus === "In Transit" && "O seu lote de identificação oficial de militante encontra-se em trânsito logístico internacional da central emissora para o Comité de Círculo Local."}
                {member.physicalCardStatus === "Available for Collection" && "O seu cartão físico de membro já está disponível para levantamento presencial no secretariado do Comité Local Ward 117. Por favor, apresente o seu B.I. físico."}
                {member.physicalCardStatus === "Collected" && "Excelente! Confirmou presencialmente a receção oficial e activação do seu cartão físico de membro. Obrigado pela sua participação democrática!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
