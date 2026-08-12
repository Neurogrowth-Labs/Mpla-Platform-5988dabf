import { images } from "./assets/images";
import React, { useState, useEffect } from "react";
import { 
  Member, Announcement, PartyEvent, LearningCourse, 
  SupportTicket, ChatChannel, SystemAuditLog, InventoryStats 
} from "./types";

// Import custom components
import DigitalCard from "./components/DigitalCard";
import MemberDashboard from "./components/MemberDashboard";
import MemberProfile from "./components/MemberProfile";
import MemberTickets from "./components/MemberTickets";
import MemberEvents from "./components/MemberEvents";
import AdminDashboard from "./components/AdminDashboard";
import AdminCardCentre from "./components/AdminCardCentre";
import AdminAICentre from "./components/AdminAICentre";
import AdminExecutiveCentre from "./components/AdminExecutiveCentre";
import AdminIntegrationCentre from "./components/AdminIntegrationCentre";
import AdminSystemCentre from "./components/AdminSystemCentre";
import AuthPortal from "./components/AuthPortal";
import MemberPortalViews from "./components/MemberPortalViews";
import PublicWebsite from "./components/PublicWebsite";

import { 
  Award, ShieldCheck, User, Sparkles, LogOut, CheckCircle2, 
  ChevronRight, Calendar, Compass, Layers, Bot, MessageSquare,
  BarChart3, Network, Settings, CreditCard, FileText, DollarSign, 
  Newspaper, Users, MapPin, HelpCircle, Phone, LifeBuoy
} from "lucide-react";

export default function App() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"member" | "admin" | null>(null);
  const [activeView, setActiveView] = useState<"website" | "auth">("website");
  const [authInitialMode, setAuthInitialMode] = useState<"signin" | "signup">("signin");

  // Global Role / Portal Selection
  const [currentPortal, setCurrentPortal] = useState<"member" | "admin">("member");

  // Member Portal active tab
  const [memberTab, setMemberTab] = useState<string>("dashboard");
  // Admin Portal active tab
  const [adminTab, setAdminTab] = useState<"dashboard" | "cards" | "ai" | "executive" | "integrations" | "system">("dashboard");

  // Mock Global State representing our in-memory database
  const [member, setMember] = useState<Member>({
    id: "m_908",
    membershipNo: "",
    fullName: "",
    nationalId: "",
    mobile: "",
    email: "",
    dob: "1995-07-17",
    gender: "Female",
    maritalStatus: "Single",
    emergencyContact: {
      name: "Nelson Mandela Jr",
      phone: "+27 83 444 9876"
    },
    occupation: "",
    employer: "",
    education: "",
    province: "",
    municipality: "",
    committee: "",
    category: "General",
    leadershipRoles: [],
    registrationDate: "2021-04-12",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/MPLA_Party_logo.svg/250px-MPLA_Party_logo.svg.png",
    status: "Active",
    outstandingBalance: 120,
    paymentHistory: [],
    votedPollIds: ["poll_2"],
    completedCourses: ["c_1"],
    physicalCardStatus: "Approved",
    physicalCardEstDate: "2026-07-25"
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEventos] = useState<PartyEvent[]>([]);
  const [courses, setCourses] = useState<LearningCourse[]>([]);
  const [polls, setPolls] = useState<any[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [chatChannels, setChatChannels] = useState<ChatChannel[]>([]);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>([]);
  const [inventory, setInventory] = useState<InventoryStats>({
    blankCards: 4820,
    inkPercent: 78,
    ribbonPercent: 62,
    packagingEnvelopes: 12050,
    holograms: 4200
  });

  // Fetch initial database state from Node/Express server backend
  const fetchAllData = async () => {
    try {
      const [
        resM, resA, resE, resC, resP, resT, resCh, resL, resI
      ] = await Promise.all([
        fetch("/api/members"),
        fetch("/api/announcements"),
        fetch("/api/events"),
        fetch("/api/courses"),
        fetch("/api/polls"),
        fetch("/api/tickets"),
        fetch(`/api/chats/${member.id}`),
        fetch("/api/audit-logs"),
        fetch("/api/inventory")
      ]);

      const dataM = await resM.json();
      const dataA = await resA.json();
      const dataE = await resE.json();
      const dataC = await resC.json();
      const dataP = await resP.json();
      const dataT = await resT.json();
      const dataCh = await resCh.json();
      const dataL = await resL.json();
      const dataI = await resI.json();

      setMembers(dataM);
      setAnnouncements(dataA);
      setEventos(dataE);
      setCourses(dataC);
      setPolls(dataP);
      setTickets(dataT);
      setChatChannels(dataCh);
      setAuditLogs(dataL);
      setInventory(dataI);

      // Match our currently logged in member's real server-side state
      const matchingMe = dataM.find((m: Member) => m.id === member.id);
      if (matchingMe) {
        setMember(matchingMe);
      }
    } catch (e) {
      console.error("Error fetching full database state: ", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [member.id, isAuthenticated]);

  // Update member locally & post update to server
  const handleUpdateMember = async (id: string, updatedData: Partial<Member>) => {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateInventory = async (updatedInv: Partial<InventoryStats>) => {
    try {
      const res = await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInv)
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Profile management submission
  const handleUpdateProfile = (updatedData: Partial<Member>) => {
    handleUpdateMember(member.id, updatedData);
  };

  // Poll Voting
  const handleCastVote = async (pollId: string, option: string) => {
    try {
      const res = await fetch(`/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, option })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Payment Processing
  const handleMakePayment = async (amount: number, purpose: string, method: string) => {
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, amount, method, purpose })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Ticket submission
  const handleNewTicketSubmit = async (type: SupportTicket["type"], description: string) => {
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, type, description })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Reply to support ticket
  const handleTicketReply = async (ticketId: string, text: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "member", senderName: member.fullName, text })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit direct chat messages
  const handleChatSubmit = async (channelId: string, text: string) => {
    if (!text.trim()) {
      // Force update to catch simulated responses
      fetchAllData();
      return;
    }
    try {
      const res = await fetch(`/api/chats/${channelId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "member", senderName: member.fullName, text })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Register Event attendance
  const handleRegisterEvent = async (eventId: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Complete Academy masterclass course
  const handleCompleteCourse = async (courseId: string) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginSuccess = (user: any, role: "member" | "admin") => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPortal(role);
    if (user) {
      setMember(user);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setActiveView("website");
  };

  if (!isAuthenticated) {
    if (activeView === "auth") {
      return (
        <AuthPortal 
          onLoginSuccess={handleLoginSuccess} 
          onBackToWeb={() => setActiveView("website")}
          initialMode={authInitialMode}
        />
      );
    }
    return (
      <PublicWebsite 
        onNavigateToAuth={(mode) => {
          setAuthInitialMode(mode);
          setActiveView("auth");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans relative overflow-hidden">
      {/* BACKGROUND WATERMARK GRAPHICS (Angola Map + MPLA supporters) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Angola Map Watermark SVG */}
        <div className="absolute -left-16 top-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.08]">
          <svg viewBox="0 0 200 200" className="w-full h-full fill-[#FFCC00]">
            <path d="M73,34 L111,37 L122,50 L140,54 L138,71 L151,80 L147,105 L157,114 L154,124 L142,126 L126,155 L119,158 L111,146 L108,131 L89,127 L82,135 L80,147 L65,147 L58,111 L60,93 L54,77 L51,75 L52,65 L58,62 L63,64 L68,47 L66,39 Z" />
            <polygon points="100,85 104,97 116,97 106,105 110,117 100,109 90,117 94,105 84,97 96,97" fill="#C8102E" className="animate-pulse" />
          </svg>
        </div>

        {/* Apoioers image watermark */}
        <div className="absolute -right-12 bottom-12 w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full overflow-hidden opacity-[0.11] blur-[0.5px]">
          <img 
            src={images.mplaSupportersBackground} 
            alt="Militantes MPLA" 
            className="w-full h-full object-cover grayscale contrast-110 brightness-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        </div>
      </div>

      {/* GLOBAL SYSTEM BAR / BRAND HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white border-2 border-[#FFCC00] rounded-xl flex items-center justify-center shadow-sm p-1 text-white">
              <img 
                src={images.mplaLogo} 
                alt="MPLA Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-slate-900 tracking-tight text-base sm:text-lg flex items-center gap-1.5">
                MPLA Portal Unificado
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-red-50 text-[#D3122A] px-2 py-0.5 rounded border border-red-100">
                  {userRole === "admin" ? "ADMIN" : "SEGURO"}
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">
                {userRole === "admin" ? "Centro de Controlo Super Administrador" : "MPLA CAPE - Auto-Serviço"}
              </p>
            </div>
          </div>

          {/* Secure Workspace Header / Profiles and Logout */}
          <div className="flex items-center gap-4">
            {/* Sector indicator badge */}
            <span className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border ${
              userRole === "admin" 
                ? "bg-red-50 text-[#D3122A] border-red-200" 
                : "bg-green-50 text-green-700 border-green-200"
            }`}>
              {userRole === "admin" ? "🛡️ Comando Central HQ" : "👤 Acesso Membro Oficial"}
            </span>

            {userRole === "admin" && (
              <button 
                onClick={() => {
                  setCurrentPortal(currentPortal === "admin" ? "member" : "admin");
                  setMemberTab("dashboard");
                }}
                className="text-xs font-bold bg-[#D3122A] hover:bg-red-700 text-white px-3.5 py-2 rounded-xl transition shadow-md shadow-red-100 cursor-pointer"
              >
                {currentPortal === "admin" ? "Visualizar Como Membro" : "Voltar ao Super Administrador"}
              </button>
            )}

            {/* Profile badge */}
            <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4">
              <img 
                src={userRole === "admin" ? "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=150&h=150&fit=crop" : member.photo} 
                alt={userRole === "admin" ? "Administração Nacional" : member.fullName} 
                className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs" 
                referrerPolicy="no-referrer"
              />
              <div className="text-left leading-none">
                <p className="text-xs font-bold text-slate-900 mb-0.5">{userRole === "admin" ? "Administração Central" : member.fullName}</p>
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  AUTENTICADO
                </p>
              </div>
            </div>

            {/* Red Terminar Sessão Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-xs font-bold border border-slate-200 text-slate-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 px-4 py-2 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Terminar Sessão
            </button>
          </div>
        </div>
      </header>

      {/* CORE WRAPPER LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR SUB-NAVIGATION */}
        <aside className="w-full md:w-[280px] shrink-0 space-y-6">
          {currentPortal === "member" ? (
            /* MEMBER PORTAL NAVIGATION */
            <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div>
                <p className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold px-3 mb-2">Painel de Auto-Serviço</p>
                <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                  {[
                    { key: "dashboard", label: "Painel Principal", icon: Compass },
                    { key: "profile", label: "Meu Perfil", icon: User },
                    { key: "card", label: "Cartão de Militante Digital", icon: CreditCard },
                    { key: "status", label: "Estado de Membro", icon: ShieldCheck },
                    { key: "documents", label: "Documentos", icon: FileText },
                    { key: "payments", label: "Pagamentos", icon: DollarSign },
                    { key: "events", label: "Eventos", icon: Calendar },
                    { key: "learning", label: "Centro de Formação", icon: Award },
                    { key: "news", label: "Notícias", icon: Newspaper },
                    { key: "messages", label: "Mensagens", icon: MessageSquare },
                    { key: "community", label: "Comunidade", icon: Users },
                    { key: "committee", label: "Comité", icon: MapPin },
                    { key: "support", label: "Apoio", icon: HelpCircle },
                    { key: "settings", label: "Definições", icon: Settings }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setMemberTab(tab.key)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                        memberTab === tab.key
                          ? "bg-[#C8102E] text-white font-bold shadow-lg shadow-red-500/10"
                          : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <tab.icon className="w-4 h-4 shrink-0" />
                        {tab.label}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Precisa de Ajuda? Bottom of left sidebar */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold px-3">Precisa de Ajuda?</p>
                <div className="space-y-1 px-3">
                  <button 
                    onClick={() => setMemberTab("messages")}
                    className="w-full text-left text-[11px] text-slate-400 hover:text-[#FFCC00] flex items-center gap-2 transition cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Chat Apoio
                  </button>
                  <button 
                    onClick={() => setMemberTab("learning")}
                    className="w-full text-left text-[11px] text-slate-400 hover:text-[#FFCC00] flex items-center gap-2 transition cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Base de Conhecimento
                  </button>
                  <button 
                    onClick={() => setMemberTab("support")}
                    className="w-full text-left text-[11px] text-slate-400 hover:text-[#C8102E] flex items-center gap-2 transition cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Contacto de Emergência
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* SUPER ADMIN PORTAL NAVIGATION */
            <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
              <p className="text-[9px] uppercase font-mono tracking-widest text-slate-500 font-bold px-3 mb-2">Administração Nacional</p>
              
              {[
                { key: "dashboard", label: "Registo Nacional", icon: Layers },
                { key: "executive", label: "Comando Executivo", icon: BarChart3 },
                { key: "integrations", label: "Centro de Integrações", icon: Network },
                { key: "system", label: "Administração do Sistema", icon: Settings },
                { key: "cards", label: "Fila de Emissão de Cartões", icon: Calendar },
                { key: "ai", label: "Centro de Comando IA", icon: Bot }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setAdminTab(tab.key as any)}
                  className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    adminTab === tab.key
                      ? "bg-[#C8102E] text-white font-bold shadow-md shadow-red-500/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}

              <div className="pt-4 border-t border-slate-800 text-center">
                <div className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Oficial Autenticado
                </div>
              </div>
            </div>
          )}

          {/* Mini Info banner in sidebar */}
          <div className="bg-slate-800/80 text-white p-5 rounded-xl border border-slate-700/50 space-y-3.5 relative overflow-hidden shadow-sm">
            <div className="absolute right-0 bottom-0 opacity-15 flex items-center justify-center">
              <img 
                src={images.mplaLogo} 
                className="w-24 h-24 object-contain transform translate-x-4 translate-y-4" 
                alt="MPLA" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-wider font-mono text-[#FFCC00] font-bold">Credenciais MPLA</p>
              <h3 className="font-display font-bold text-xs">Governação Democrática Central</h3>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Esta aplicação está homologada para operações regionais e municipais sob a direcção do Comité de Especialidade.</p>
          </div>
        </aside>

        {/* CORE PORTAL MAIN CONTAINER PANE */}
        <section className="flex-1 space-y-8 min-w-0">
          {currentPortal === "member" ? (
            /* MEMBER VIEW CONTROLLER */
            <MemberPortalViews
              member={member}
              activeSubTab={memberTab}
              onChangeTab={setMemberTab}
              onUpdateProfile={handleUpdateProfile}
              onMakePayment={handleMakePayment}
              onRegisterEvent={handleRegisterEvent}
              onCompleteCourse={handleCompleteCourse}
              onCastVote={handleCastVote}
              events={events}
              courses={courses}
              polls={polls}
              announcements={announcements}
              tickets={tickets}
              onSubmitTicket={handleNewTicketSubmit}
              onSubmitTicketReply={handleTicketReply}
            />
          ) : (
            /* CENTRAL ADMIN VIEW CONTROLLER */
            <>
              {adminTab === "dashboard" && (
                <div className="animate-fade-in">
                  <AdminDashboard 
                    members={members} 
                    auditLogs={auditLogs} 
                    onUpdateMember={handleUpdateMember} 
                    onDeleteMember={handleDeleteMember} 
                  />
                </div>
              )}

              {adminTab === "cards" && (
                <div className="animate-fade-in">
                  <AdminCardCentre 
                    members={members} 
                    inventory={inventory} 
                    onUpdateMember={handleUpdateMember} 
                    onUpdateInventory={handleUpdateInventory} 
                  />
                </div>
              )}

              {adminTab === "ai" && (
                <div className="animate-fade-in">
                  <AdminAICentre />
                </div>
              )}

              {adminTab === "executive" && (
                <div className="animate-fade-in">
                  <AdminExecutiveCentre members={members} />
                </div>
              )}

              {adminTab === "integrations" && (
                <div className="animate-fade-in">
                  <AdminIntegrationCentre />
                </div>
              )}

              {adminTab === "system" && (
                <div className="animate-fade-in">
                  <AdminSystemCentre />
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* SECURE SYSTEM FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-6 px-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 MPLA CAPE. Todos os direitos reservados. Em conformidade com a Carta Constitucional.</p>
          <p className="font-mono text-[10px]">Portal ID de Segurança: {member.id.toUpperCase()}-SSL-2026</p>
          <a href="http://www.ai.neurogrowthlabs.co.za" target="_blank" rel="noreferrer" className="font-bold text-[#B5121B] hover:underline">Developed by NeuroGrowth Labs www.ai.neurogrowthlabs.co.za</a>
        </div>
      </footer>
    </div>
  );
}
