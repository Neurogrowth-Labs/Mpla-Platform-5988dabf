import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Member, Announcement, PartyEvent, LearningCourse, SupportTicket, ChatChannel, PaymentLog, SurveyPoll } from "../types";
import { 
  User, CreditCard, ShieldCheck, FileText, DollarSign, Calendar, Award, 
  Newspaper, MessageSquare, Users, MapPin, Settings, HelpCircle, ArrowRight, 
  CheckCircle2, ChevronRight, Search, Download, Share2, Printer, Plus, Grid, 
  List, Eye, Trash2, Archive, CheckCircle, Clock, Send, Heart, Bookmark, 
  Share, Video, Vote, Shield, Smartphone, Key, Bell, Phone, Mail, Sparkles, 
  LogOut, ChevronDown, RefreshCw, Volume2, Lock, EyeOff, Check, X, Camera, Map, Image as ImageIcon
} from "lucide-react";
import { images } from "../assets/images";
import { formatCurrencyPT, formatDatePT, traduzirEstadoMembro } from "../utils/portugal";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Interfaces
interface MemberPortalViewsProps {
  member: Member;
  activeSubTab: string;
  onChangeTab: (tab: any) => void;
  onUpdateProfile: (updatedData: Partial<Member>) => void;
  onMakePayment: (amount: number, purpose: string, method: string) => void;
  onRegisterEvent: (eventId: string) => void;
  onCompleteCourse: (courseId: string) => void;
  onCastVote: (pollId: string, option: string) => void;
  events: PartyEvent[];
  courses: LearningCourse[];
  polls: SurveyPoll[];
  announcements: Announcement[];
  tickets: SupportTicket[];
  onSubmitTicket: (type: any, description: string) => void;
  onSubmitTicketReply: (ticketId: string, text: string) => void;
}

export default function MemberPortalViews({
  member,
  activeSubTab,
  onChangeTab,
  onUpdateProfile,
  onMakePayment,
  onRegisterEvent,
  onCompleteCourse,
  onCastVote,
  events,
  courses,
  polls,
  announcements,
  tickets,
  onSubmitTicket,
  onSubmitTicketReply
}: MemberPortalViewsProps) {
  
  // RENDER CORRESPONDING TAB
  switch (activeSubTab) {
    case "dashboard":
      return <HomeDashboardView member={member} events={events} announcements={announcements} onChangeTab={onChangeTab} onRegisterEvent={onRegisterEvent} />;
    case "profile":
      return <ProfileLinkedInView member={member} onUpdateProfile={onUpdateProfile} onChangeTab={onChangeTab} />;
    case "card":
      return <DigitalCardFullScreenView member={member} />;
    case "status":
      return <MembershipStatusView member={member} />;
    case "documents":
      return <DocumentsManagerView member={member} />;
    case "payments":
      return <PaymentsDashboardView member={member} onMakePayment={onMakePayment} />;
    case "events":
      return <EventsCarouselView member={member} events={events} onRegisterEvent={onRegisterEvent} />;
    case "learning":
      return <LearningCentreView member={member} courses={courses} onCompleteCourse={onCompleteCourse} />;
    case "news":
      return <NewsFeedView announcements={announcements} />;
    case "messages":
      return <MessagesMessengerView member={member} />;
    case "community":
      return <CommunitySocialView member={member} polls={polls} onCastVote={onCastVote} />;
    case "committee":
      return <CommitteeDetailsView member={member} announcements={announcements} />;
    case "support":
      return <SupportCentreView member={member} tickets={tickets} onSubmitTicket={onSubmitTicket} onSubmitTicketReply={onSubmitTicketReply} />;
    case "settings":
      return <SettingsView member={member} onUpdateProfile={onUpdateProfile} />;
    default:
      return <HomeDashboardView member={member} events={events} announcements={announcements} onChangeTab={onChangeTab} onRegisterEvent={onRegisterEvent} />;
  }
}

// ==========================================
// 1. HOME DASHBOARD VIEW
// ==========================================
function HomeDashboardView({ member, events, announcements, onChangeTab, onRegisterEvent }: { member: Member, events: PartyEvent[], announcements: Announcement[], onChangeTab: (tab: any) => void, onRegisterEvent: (eventId: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  
  // Physical Card logistics timeline steps
  const steps = [
    { label: "Submetido", desc: "Pedido recebido", done: true },
    { label: "Verificação", desc: "Dados aprovados", done: true },
    { label: "Impressão", desc: "Cunho holográfico", done: member.physicalCardStatus !== "Submitted" && member.physicalCardStatus !== "Verification" },
    { label: "Expedido", desc: "Envelope selado", done: ["Ready for Dispatch", "In Transit", "Available for Collection", "Collected"].includes(member.physicalCardStatus) },
    { label: "Pronto", desc: "Sede Provincial", done: ["Available for Collection", "Collected"].includes(member.physicalCardStatus) }
  ];

  // Activities
  const activities = [
    { type: "renew", text: "Inscrição anual de militante confirmada com sucesso", date: "Hoje às 10:24", color: "bg-[#16A34A]" },
    { type: "event", text: "Registado para o Plenário Regional de Luanda", date: "Ontem às 14:15", color: "bg-[#C8102E]" },
    { type: "cert", text: "Certificado de 'História e Valores do MPLA' emitido", date: "15 Jul 2026", color: "bg-[#FFCC00]" },
    { type: "ann", text: "Aviso de convocatória recebido do Comité de Especialidade", date: "12 Jul 2026", color: "bg-slate-800" },
    { type: "pay", text: "Pagamento de quotas mensais recebido - Ref: TX-9031", date: "05 Jul 2026", color: "bg-[#16A34A]" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#C8102E]/20 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8102E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          {/* Left Column Welcome Info */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#16A34A]/20 text-emerald-300 rounded-full text-xs font-bold border border-[#16A34A]/30">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              Militante Ativo • Sede Oficial
            </span>
            <div className="space-y-1">
              <p className="text-slate-400 font-medium text-sm">Bom Dia,</p>
              <h2 className="text-3xl lg:text-4xl font-display font-black tracking-tight text-white">{member.fullName}</h2>
              <p className="text-slate-300 font-mono text-xs">{member.membershipNo}</p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-2">
              <span className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-1.5 border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC00]" /> {member.committee}
              </span>
              <span className="bg-white/10 px-3 py-2 rounded-xl flex items-center gap-1.5 border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-[#FFCC00]" /> Membro desde {member.registrationDate.split("-")[0] || "2018"}
              </span>
            </div>
          </div>

          {/* Right Column Digital Card Preview & Actions */}
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <div 
              className="relative w-full max-w-[340px] h-[200px] rounded-xl shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:scale-102 border border-[#FFCC00]/40"
              onClick={() => setFlipped(!flipped)}
            >
              {/* Front */}
              <div className={`absolute inset-0 w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#C8102E] via-[#C8102E] to-slate-950 text-white rounded-xl transition-transform duration-500 backface-hidden ${flipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded border border-[#FFCC00]">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/69/MPLA_Party_logo.svg/250px-MPLA_Party_logo.svg.png" 
                        alt="MPLA" 
                        className="w-4 h-4 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[9px] font-mono font-black tracking-wider text-[#FFCC00]">MPLA DIÁSPORA</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#16A34A] text-white text-[8px] font-bold rounded-full font-mono uppercase">ATIVO</span>
                </div>
                
                <div className="flex gap-3 items-center">
                  <img src={member.photo} className="w-12 h-12 rounded-full object-cover border border-[#FFCC00] shadow-md" referrerPolicy="no-referrer" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{member.fullName}</p>
                    <p className="text-[10px] text-[#FFCC00] font-mono">{member.membershipNo}</p>
                    <p className="text-[9px] text-slate-300 truncate">{member.committee}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-[8px] text-slate-400">
                  <span>PROVÍNCIA: <strong className="text-slate-200">{member.province}</strong></span>
                  <span className="font-mono text-[#FFCC00]">NÍVEL: {member.membershipLevel}</span>
                </div>
              </div>

              {/* Back */}
              <div className={`absolute inset-0 w-full h-full p-4 flex flex-col justify-between bg-slate-900 text-white rounded-xl transition-transform duration-500 backface-hidden ${flipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-slate-400 uppercase font-mono">Autenticação Encriptada</span>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                </div>
                <div className="flex gap-3 items-center justify-between">
                  <div className="text-[8px] text-slate-300 space-y-1 font-mono">
                    <p>EMERGÊNCIA: {member.emergencyContact.phone}</p>
                    <p>BI: {member.nationalId}</p>
                    <p>VALIDAÇÃO: portal.mpla-diaspora.org</p>
                  </div>
                  <div className="bg-white p-1 rounded">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=https://portal.mpla-diaspora.org/verificar/${member.membershipNo}`} 
                      alt="QR" 
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <div className="border-t border-slate-800 pt-2 text-center text-[7px] font-mono text-slate-500">
                  *{member.membershipNo}*
                </div>
              </div>
            </div>

            {/* Micro Wallet and Download Buttons */}
            <div className="flex gap-2 w-full max-w-[340px]">
              <button 
                onClick={() => onChangeTab("card")}
                className="flex-1 py-2 bg-white text-slate-900 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                Descarregar PDF
              </button>
              <button 
                onClick={() => alert("Cartão digital adicionado ao seu Carteira Apple com sucesso!")}
                className="flex-1 py-2 bg-[#FFCC00] text-slate-950 rounded-lg text-xs font-black hover:bg-yellow-500 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Carteira Apple
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Estado da Militância", value: traduzirEstadoMembro(member.status), detail: "Quotas • Formação • Eventos • Participação • Comité" },
          { title: "Próximo Pagamento", value: formatCurrencyPT(member.outstandingBalance), detail: "Cartão bancário, EFT, Mobile Money, PayPal, Stripe, Ozow, Apple Pay e Google Pay" },
          { title: "Próxima Renovação", value: formatDatePT(member.physicalCardEstDate), detail: "Cartão offline com QR, NFC, verificação dinâmica e carteiras digitais" }
        ].map((item) => (
          <div key={item.title} className="bg-white/90 backdrop-blur p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-[10px] uppercase tracking-widest font-black text-[#C8102E]">{item.title}</p>
            <p className="text-lg font-display font-black text-slate-900 mt-1">{item.value}</p>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <h3 className="font-display font-black text-slate-900 text-sm mb-4">Módulos Premium da Diáspora MPLA</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {["Notícias", "Calendário Nacional", "Voluntariado", "Formações", "Biblioteca Digital", "Galeria Multimédia", "Reconhecimentos", "Sugestões e Reclamações", "Diretório de Membros", "Benefícios", "Campanhas", "Votações", "Missões e Tarefas", "Relatórios Pessoais"].map((label) => (
            <button key={label} className="text-left p-3 rounded-xl border border-slate-200 hover:border-[#C8102E] hover:bg-red-50/40 font-bold text-slate-700 transition">{label}</button>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest font-mono">Ações de Auto-Serviço</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Atualizar Perfil", desc: "Altere dados e contatos", icon: User, color: "text-[#C8102E] bg-red-50 hover:bg-red-100/50 border-red-100", tab: "profile" },
            { title: "Cartão Digital", desc: "Baixe a credencial oficial", icon: CreditCard, color: "text-[#FFCC00] bg-yellow-50 hover:bg-yellow-100/50 border-yellow-100", tab: "card" },
            { title: "Pagar Quotas", desc: "Regularize suas quotas", icon: DollarSign, color: "text-[#16A34A] bg-emerald-50 hover:bg-emerald-100/50 border-emerald-100", tab: "payments" },
            { title: "Inscrição de Evento", desc: "Participe dos plenários", icon: Calendar, color: "text-blue-600 bg-blue-50 hover:bg-blue-100/50 border-blue-100", tab: "events" },
            { title: "Comité de Círculo", desc: "Fale com o Secretariado", icon: Users, color: "text-purple-600 bg-purple-50 hover:bg-purple-100/50 border-purple-100", tab: "committee" },
            { title: "Academia Política", desc: "Cursos e Formação", icon: Award, color: "text-orange-600 bg-orange-50 hover:bg-orange-100/50 border-orange-100", tab: "learning" },
            { title: "Notícias & Mídia", desc: "Boletins e Comunicados", icon: Newspaper, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100/50 border-indigo-100", tab: "news" },
            { title: "Canal de Suporte", desc: "Perguntas e Suporte", icon: HelpCircle, color: "text-teal-600 bg-teal-50 hover:bg-teal-100/50 border-teal-100", tab: "support" }
          ].map((action, idx) => (
            <button 
              key={idx} 
              onClick={() => onChangeTab(action.tab as any)}
              className={`p-4 rounded-xl border text-left space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">{action.title}</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Split section: Membership Status & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Logistics Status Widget */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-display font-black text-slate-900 text-sm">Estado de Entrega do Cartão</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Ref: Central Emissora Centralizada MPLA</p>
              </div>
              <span className="px-2 py-1 bg-red-50 text-[#C8102E] rounded-md text-[9px] font-mono font-black uppercase tracking-wider border border-red-100">
                LOG: {member.physicalCardStatus.toUpperCase()}
              </span>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-5 gap-2 relative pt-6 pb-4">
              <div className="absolute top-[42px] left-6 right-6 h-1 bg-slate-100 z-0 rounded" />
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center z-10 space-y-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                    step.done 
                      ? "bg-[#C8102E] border-[#C8102E] text-white shadow-sm" 
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-slate-800 leading-tight">{step.label}</p>
                    <p className="text-[8px] text-slate-400 hidden sm:block">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-4 text-xs flex gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8102E] shrink-0" />
            <div className="space-y-1">
              <p className="font-bold text-slate-800">Nota de Logística Activa</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                O seu cartão físico encontra-se na fase de {member.physicalCardStatus}. Estimamos o despacho definitivo do lote nos próximos 4 dias úteis para a Sede Consular local em Joanesburgo.
              </p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h4 className="font-display font-black text-slate-900 text-sm">Actividades Recentes</h4>
            <span className="text-[9px] text-slate-400 font-mono font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> ATUALIZADO AGORA
            </span>
          </div>

          <div className="space-y-4.5">
            {activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${act.color}`} />
                <div className="space-y-0.5 flex-1">
                  <p className="text-xs text-slate-700 leading-snug font-medium">{act.text}</p>
                  <p className="text-[9px] text-slate-400 font-mono">{act.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. PROFILE LINKEDIN VIEW
// ==========================================
function ProfileLinkedInView({ member, onUpdateProfile, onChangeTab }: { member: Member, onUpdateProfile: (updatedData: Partial<Member>) => void, onChangeTab: (tab: any) => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "membership" | "activity" | "payments">("about");
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(member.fullName);
  const [email, setEmail] = useState(member.email);
  const [mobile, setMobile] = useState(member.mobile);
  const [occupation, setOccupation] = useState(member.occupation);
  const [employer, setEmployer] = useState(member.employer);
  const [education, setEducation] = useState(member.education);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ fullName, email, mobile, occupation, employer, education });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* cover and header banner card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-[#C8102E] via-[#C8102E] to-slate-950 relative">
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute right-4 bottom-4 flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white border border-white/20 hover:bg-white/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer">
              <Camera className="w-4 h-4" /> Alterar Capa
            </button>
          </div>
        </div>

        {/* Profile Stats Overview Section */}
        <div className="p-6 relative pt-0">
          {/* Avatar positioning */}
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <img 
                src={member.photo} 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md bg-white" 
                alt="Avatar" 
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#16A34A] border-2 border-white rounded-full flex items-center justify-center shadow-md" />
            </div>
          </div>

          <div className="pt-10 sm:pt-14 flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">{member.fullName}</h2>
                <span className="px-2 py-0.5 bg-red-100 text-[#C8102E] rounded-md text-[9px] font-mono font-black uppercase border border-red-200">
                  {member.membershipLevel}
                </span>
                <span className="px-2 py-0.5 bg-yellow-100 text-[#FFCC00] dark:text-yellow-800 rounded-md text-[9px] font-mono font-black uppercase border border-yellow-200">
                  COMITÉ SA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {member.occupation || "Public Servant"} • {member.employer || "Governo Provincial"}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C8102E]" /> {member.committee} ({member.province})
              </p>
            </div>

            <div className="flex gap-2 w-full sm:w-auto shrink-0 pt-2 md:pt-0">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                {isEditing ? "Cancelar" : "Editar Perfil"}
              </button>
              <button 
                onClick={() => onChangeTab("card")}
                className="flex-1 px-4 py-2 bg-[#C8102E] text-white hover:bg-red-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-red-200"
              >
                <CreditCard className="w-4 h-4" />
                Cartão Digital
              </button>
            </div>
          </div>

          {/* Quick Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-6 mt-6">
            <div className="text-center sm:text-left space-y-0.5">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Quota em Atraso</p>
              <p className="text-lg font-black font-mono text-[#C8102E]">R{member.outstandingBalance}</p>
            </div>
            <div className="text-center sm:text-left space-y-0.5">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Cursos Feitos</p>
              <p className="text-lg font-black font-mono text-slate-800">1 / 4</p>
            </div>
            <div className="text-center sm:text-left space-y-0.5">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Presença Eventos</p>
              <p className="text-lg font-black font-mono text-slate-800">2 Reunidões</p>
            </div>
            <div className="text-center sm:text-left space-y-0.5">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Nível de Militância</p>
              <p className="text-lg font-black font-mono text-emerald-600">GRAU 2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto whitespace-nowrap bg-white px-6 py-2.5 rounded-xl border">
        {[
          { key: "about", label: "Informações Gerais", icon: User },
          { key: "membership", label: "Filiação & Comité", icon: ShieldCheck },
          { key: "activity", label: "Actividade", icon: Newspaper },
          { key: "payments", label: "Histórico de Quotas", icon: DollarSign }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === tab.key 
                ? "bg-[#C8102E] text-white shadow-xs" 
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-5">
            <h3 className="font-display font-black text-slate-900 text-sm border-b border-slate-100 pb-2">Editar Coordenadas de Militante</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nome Completo</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Endereço de E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Telemóvel</label>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Profissão</label>
                <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Entidade Patronal</label>
                <input type="text" value={employer} onChange={(e) => setEmployer(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nível Académico</label>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg cursor-pointer">Descartar</button>
              <button type="submit" className="px-4 py-2 bg-[#C8102E] text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm">Gravar Alterações</button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {activeTab === "about" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Nome de Filiação</p>
                    <p className="font-bold text-slate-800 text-sm">{member.fullName}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">BI Nacional / Passaporte</p>
                    <p className="font-bold text-slate-800 font-mono">{member.nationalId}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Telemóvel Activo</p>
                    <p className="font-bold text-slate-800">{member.mobile}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Correio Electrónico</p>
                    <p className="font-bold text-slate-800 font-mono">{member.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Profissão / Quadros</p>
                    <p className="font-bold text-slate-800">{member.occupation || "N/D"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Contacto de Emergência</p>
                    <p className="font-bold text-slate-800">{member.emergencyContact.name} ({member.emergencyContact.phone})</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "membership" && (
              <div className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Número de Matrícula Partidária</p>
                    <p className="font-bold text-slate-800 text-sm font-mono text-[#C8102E]">{member.membershipNo}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Nível de Credenciamento</p>
                    <p className="font-bold text-slate-800">{member.membershipLevel} Militant</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Comité de Círculo Local</p>
                    <p className="font-bold text-slate-800">{member.committee}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Província Administrativa</p>
                    <p className="font-bold text-slate-800">{member.province}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Data de Juramento Oficial</p>
                    <p className="font-bold text-slate-800 font-mono">{member.registrationDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Estado de Quotas</p>
                    <span className="inline-block px-2.5 py-1 bg-emerald-50 text-[#16A34A] rounded text-[10px] font-bold border border-emerald-100">
                      REGULARIZADO
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                {[
                  { text: "Presença confirmada no Plenário Semanal MPLA Ward 117", date: "Há 2 dias" },
                  { text: "Submissão de sugestões no fórum de debates comunitários", date: "Há 1 semana" },
                  { text: "Conclusão com distinção do Masterclass de Governação Local", date: "Há 2 semanas" }
                ].map((act, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-700">{act.text}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{act.date}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-mono uppercase text-[9px]">
                        <th className="pb-2">ID Transação</th>
                        <th className="pb-2">Data</th>
                        <th className="pb-2">Valor</th>
                        <th className="pb-2">Descrição</th>
                        <th className="pb-2 text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                      <tr>
                        <td className="py-3 font-mono">TX-9021-GP</td>
                        <td className="py-3">05 Jan 2026</td>
                        <td className="py-3 font-mono">R120.00</td>
                        <td className="py-3">Quotas Anuais 2026</td>
                        <td className="py-3 text-right"><span className="text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Pago</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 font-mono">TX-7012-GP</td>
                        <td className="py-3">10 Jan 2025</td>
                        <td className="py-3 font-mono">R100.00</td>
                        <td className="py-3">Quotas Anuais 2025</td>
                        <td className="py-3 text-right"><span className="text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Pago</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. FULL SCREEN DIGITAL CARD VIEW
// ==========================================
function DigitalCardFullScreenView({ member }: { member: Member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-6 max-w-xl mx-auto text-center animate-fade-in" id="full-card-panel">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Cartão de Militante Oficial</h2>
        <p className="text-xs text-slate-500">Credencial criptográfica em alta resolução com assinatura digital homologada.</p>
      </div>

      <div 
        className="relative w-full max-w-[440px] h-[280px] rounded-2xl shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden mx-auto hover:shadow-[#C8102E]/20 hover:scale-103 border border-[#FFCC00]/40"
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#C8102E] via-[#C8102E] to-slate-950 text-white rounded-2xl transition-transform duration-500 backface-hidden ${flipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100'}`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg border-2 border-[#FFCC00]">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/6/69/MPLA_Party_logo.svg/250px-MPLA_Party_logo.svg.png" 
                  alt="MPLA" 
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left leading-none">
                <span className="text-[10px] font-mono font-black tracking-widest text-[#FFCC00]">MPLA DIÁSPORA</span>
                <p className="text-[9px] text-slate-200 mt-1 uppercase font-bold">Membro Oficial Recenseado</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold rounded-lg border border-white/20 font-mono">
              ATIVO
            </span>
          </div>

          <div className="flex gap-4 items-center text-left">
            <img src={member.photo} className="w-16 h-16 rounded-full object-cover border-2 border-[#FFCC00] shadow-lg bg-slate-800" referrerPolicy="no-referrer" />
            <div className="min-w-0">
              <h3 className="text-sm font-black tracking-wide truncate">{member.fullName}</h3>
              <p className="text-xs text-[#FFCC00] font-mono">{member.membershipNo}</p>
              <p className="text-[10px] text-slate-300 truncate font-medium">{member.committee}</p>
            </div>
          </div>

          <div className="border-t border-white/15 pt-3 flex justify-between items-center text-[10px] text-slate-300">
            <div>
              <p className="text-[8px] uppercase font-mono tracking-widest text-slate-400">Província Consular</p>
              <p className="font-bold text-white">{member.province}</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase font-mono tracking-widest text-slate-400">Nível Partidário</p>
              <p className="font-mono font-bold text-[#FFCC00]">{member.membershipLevel}</p>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 w-full h-full p-6 flex flex-col justify-between bg-slate-900 text-white rounded-2xl transition-transform duration-500 backface-hidden ${flipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'}`}>
          <div className="h-4 bg-black -mx-6 -mt-6 mb-3" />
          <div className="flex justify-between items-center gap-6 text-left">
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-[8px] text-slate-400 uppercase font-mono tracking-wider">Contacto de Emergência</p>
                <p className="text-xs font-bold text-slate-200">{member.emergencyContact.name}</p>
                <p className="text-[11px] font-mono text-[#FFCC00]">{member.emergencyContact.phone}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-400 uppercase font-mono tracking-wider">B.I. Nacional</p>
                <p className="text-xs font-mono font-bold text-slate-200">{member.nationalId}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-400 uppercase font-mono tracking-wider">Verificação Digital</p>
                <p className="text-[10px] font-mono text-slate-400 truncate">https://portal.mpla-diaspora.org/verificar</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="bg-white p-1.5 rounded-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://portal.mpla-diaspora.org/verificar/${member.membershipNo}`} 
                  alt="QR" 
                  className="w-20 h-20"
                />
              </div>
              <p className="text-[8px] font-mono text-slate-400 uppercase font-bold tracking-wider">Verificar</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 text-center">
            <div className="h-6 w-full bg-white/10 rounded flex items-center justify-center overflow-hidden px-4">
              <div className="flex gap-[1.5px] items-stretch h-3.5 w-full">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="bg-white" style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} />
                ))}
              </div>
            </div>
            <p className="text-[8px] font-mono text-slate-400 mt-1">*{member.membershipNo}*</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 italic">Clique no cartão de identificação para rodar.</p>

      {/* Action buttons row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        <button onClick={() => window.print()} className="p-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex flex-col items-center gap-1.5 hover:bg-slate-50 transition cursor-pointer shadow-sm">
          <Printer className="w-4.5 h-4.5 text-slate-500" /> Imprimir Cartão
        </button>
        <button onClick={() => alert("PDF com o cartão gerado para download!")} className="p-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex flex-col items-center gap-1.5 hover:bg-slate-50 transition cursor-pointer shadow-sm">
          <FileText className="w-4.5 h-4.5 text-slate-500" /> Exportar PDF
        </button>
        <button onClick={() => alert("Link de verificação copiado!")} className="p-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs flex flex-col items-center gap-1.5 hover:bg-slate-50 transition cursor-pointer shadow-sm">
          <Share2 className="w-4.5 h-4.5 text-slate-500" /> Partilhar Credencial
        </button>
        <button onClick={() => alert("Adicionado ao Carteira Apple com sucesso.")} className="p-3 bg-[#FFCC00] text-slate-950 font-black rounded-xl text-xs flex flex-col items-center gap-1.5 hover:bg-yellow-500 transition cursor-pointer shadow-sm">
          <Sparkles className="w-4.5 h-4.5" /> Adicionar Carteira
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. DETAILED LOGISTICS / MEMBERSHIP STATUS
// ==========================================
function MembershipStatusView({ member }: { member: Member }) {
  const registeredAt = new Date(member.registrationDate || new Date().toISOString());
  const addDays = (days: number) => new Date(registeredAt.getTime() + days * 24 * 3600 * 1000).toLocaleDateString("pt-ZA");
  const deliveryDate = member.physicalCardEstDate || new Date(registeredAt.getTime() + 14 * 24 * 3600 * 1000).toISOString().split("T")[0];
  const trackingCode = `MPLA-CPT-${member.membershipNo.replace(/[^A-Z0-9]/gi, "").slice(-8)}-${member.id.replace(/[^A-Z0-9]/gi, "").toUpperCase()}`;
  const statusOrder = ["Submitted", "Verification", "Approved", "Printing", "In Transit", "Available for Collection", "Collected"];
  const currentIndex = Math.max(0, statusOrder.indexOf(member.physicalCardStatus));
  const steps = [
    { key: "Submitted", title: "Pedido Submetido", date: addDays(0), desc: "Pedido registado em tempo real no portal do Comité MPLA Cape Town.", done: currentIndex >= 0 },
    { key: "Verification", title: "Verificação de Ficha", date: addDays(2), desc: "Dados do BI/Passaporte e ficha partidária em validação segura.", done: currentIndex >= 1 },
    { key: "Approved", title: "Aprovação Central", date: addDays(4), desc: "Número de militante confirmado e reservado para emissão.", done: currentIndex >= 2 },
    { key: "Printing", title: "Impressão e Holograma", date: addDays(7), desc: "Cartão em preparação para impressão segura local.", done: currentIndex >= 3 },
    { key: "In Transit", title: "Trânsito Logístico", date: addDays(10), desc: "Processo logístico da emissão local para o gabinete emissor em Cape Town.", done: currentIndex >= 4 },
    { key: "Available for Collection", title: "Pronto para Levantamento", date: new Date(deliveryDate).toLocaleDateString("pt-ZA"), desc: "Previsão automática de duas semanas a partir do registo inicial.", done: currentIndex >= 5 }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in" id="logistics-tracking">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Rastreamento de Identidade Física</h2>
        <p className="text-xs text-slate-500">Logística de emissão militarizada do cartão oficial do partido.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Tracker Info Block */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
          <div>
            <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Código de Rastreio</p>
            <p className="font-bold text-slate-800 font-mono text-[#C8102E]">{trackingCode}</p>
          </div>
          <div>
            <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Gabinete Emissor</p>
            <p className="font-bold text-slate-800">Cape Town</p>
          </div>
          <div>
            <p className="text-slate-400 font-mono uppercase text-[9px] font-bold">Previsão de Entrega</p>
            <p className="font-bold text-slate-800 font-mono">{new Date(deliveryDate).toLocaleDateString("pt-ZA")}</p>
          </div>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8 py-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Stepper Dot */}
              <div className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                step.done 
                  ? "bg-[#C8102E] border-[#C8102E] text-white" 
                  : "bg-white border-slate-200 text-slate-400"
              }`}>
                <Check className="w-3.5 h-3.5" />
              </div>

              {/* Step info card */}
              <div className={`p-4 rounded-xl border transition ${
                step.done 
                  ? "bg-white border-slate-200 shadow-xs" 
                  : "bg-slate-50/50 border-slate-100 text-slate-400"
              }`}>
                <div className="flex justify-between items-center gap-4 text-xs">
                  <h4 className="font-bold text-slate-800">{step.title}</h4>
                  <span className="font-mono text-[10px] text-slate-400">{step.date}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. DOCUMENTS / BEAUTIFUL FILE MANAGER
// ==========================================
function DocumentsEmptyState({ onSeed }: { onSeed: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto space-y-6 animate-fade-in bg-white rounded-3xl border border-slate-100 shadow-xs">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C8102E]/10 to-[#FFCC00]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute w-40 h-40 border-2 border-dashed border-[#FFCC00]/30 rounded-full animate-spin-slow" />
        <div className="absolute w-28 h-28 border border-slate-200 rounded-full" />
        
        <div className="absolute transform -rotate-12 translate-x-3 -translate-y-2 bg-slate-100 border border-slate-300 w-16 h-20 rounded-lg shadow-sm flex flex-col justify-between p-2">
          <div className="w-8 h-1 bg-slate-300 rounded" />
          <div className="space-y-1">
            <div className="w-10 h-1 bg-slate-200 rounded" />
            <div className="w-12 h-1 bg-slate-200 rounded" />
          </div>
          <div className="flex justify-end"><FileText className="w-4 h-4 text-slate-400" /></div>
        </div>

        <div className="absolute transform rotate-6 translate-y-2 -translate-x-2 bg-[#0F172A] w-18 h-22 rounded-xl shadow-lg border border-slate-800 flex flex-col justify-between p-3 z-10">
          <div className="flex justify-between items-center">
            <div className="w-4 h-4 rounded bg-[#C8102E] flex items-center justify-center">
              <span className="text-[7px] text-[#FFCC00] font-black">★</span>
            </div>
            <div className="w-6 h-1.5 bg-[#FFCC00] rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="w-12 h-1 bg-slate-700 rounded" />
            <div className="w-10 h-1 bg-slate-700 rounded" />
            <div className="w-8 h-1 bg-slate-700 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[7px] font-mono text-slate-500">PDF SECURE</span>
            <ShieldCheck className="w-4 h-4 text-[#FFCC00]" />
          </div>
        </div>

        <div className="absolute top-6 left-6 w-3 h-3 bg-[#C8102E] rounded-full animate-bounce" />
        <div className="absolute bottom-6 right-6 w-4 h-4 bg-[#FFCC00] rounded-sm rotate-45 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-black text-slate-900 text-sm">Pasta de Documentos Vazia</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          Ainda não possui documentos homologados nesta secção. Aqui serão arquivados os seus comprovativos de quotas, fichas oficiais e diplomas académicos do partido.
        </p>
      </div>

      <button
        onClick={onSeed}
        className="px-5 py-2.5 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shadow-md hover:shadow-red-500/20 flex items-center gap-2 cursor-pointer mx-auto"
      >
        <Sparkles className="w-4 h-4 text-[#FFCC00]" />
        Solicitar documento ao Super Administrador
      </button>
    </div>
  );
}

function DocumentsManagerView({ member }: { member: Member }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<string>("All");
  const [onboardingEmpty, setOnboardingEmpty] = useState(false);

  const [files, setFiles] = useState([
    { name: "Ficha_Inscricao_Homologada_2026.pdf", folder: "Membership", size: "1.4 MB", date: "01 Jul 2026" },
    { name: "Cartao_Digital_Segunda_Via_Crypto.pdf", folder: "Membership", size: "820 KB", date: "05 Jul 2026" },
    { name: "Diploma_Curso_Valores_MPLA.pdf", folder: "Certificates", size: "2.1 MB", date: "15 Jul 2026" },
    { name: "Certificado_Academia_Militancia.pdf", folder: "Certificates", size: "1.9 MB", date: "12 Jul 2026" },
    { name: `Ficha_${member.membershipNo}.pdf`, folder: "Membership", size: "Tempo real", date: new Date().toLocaleDateString("pt-ZA") }
  ]);

  const folders = [
    { name: "Todos", count: files.length, key: "All" },
    { name: "Fichas Partidárias", count: files.filter(f => f.folder === "Membership").length, key: "Membership" },
    { name: "Academia Política", count: files.filter(f => f.folder === "Certificates").length, key: "Certificates" },
    { name: "Finanças & Recibos", count: files.filter(f => f.folder === "Receipts").length, key: "Receipts" }
  ];

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder === "All" || f.folder === activeFolder;
    return matchesSearch && matchesFolder;
  });

  const handleSeed = () => {
    setFiles([
      { name: "Ficha_Inscricao_Homologada_2026.pdf", folder: "Membership", size: "1.4 MB", date: "01 Jul 2026" },
      { name: "Cartao_Digital_Segunda_Via_Crypto.pdf", folder: "Membership", size: "820 KB", date: "05 Jul 2026" },
      { name: "Diploma_Curso_Valores_MPLA.pdf", folder: "Certificates", size: "2.1 MB", date: "15 Jul 2026" },
      { name: "Certificado_Academia_Militancia.pdf", folder: "Certificates", size: "1.9 MB", date: "12 Jul 2026" },
      { name: "Recibo_Inscricao_Quotas_2026.pdf", folder: "Receipts", size: "340 KB", date: "05 Jan 2026" },
      { name: "Comprovativo_Taxa_Consular_SA.pdf", folder: "Receipts", size: "510 KB", date: "10 Jan 2025" }
    ]);
    setOnboardingEmpty(false);
  };

  const handleClear = () => {
    setFiles([]);
    setOnboardingEmpty(true);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="documents-filemanager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Cofre de Documentos Oficiais</h2>
          <p className="text-xs text-slate-500">Aceda, faça download e partilhe os seus certificados, recibos e fichas.</p>
        </div>

        {/* Onboarding Mode & Layout Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Onboarding Empty state simulation toggle */}
          <button 
            onClick={() => onboardingEmpty ? handleSeed() : handleClear()}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition cursor-pointer flex items-center gap-1.5 ${
              onboardingEmpty 
                ? "bg-red-50 text-[#C8102E] border-red-200" 
                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onboardingEmpty ? "bg-[#C8102E] animate-ping" : "bg-slate-400"}`} />
            {onboardingEmpty ? "Modo Vazio Activo" : "Sincronizar em tempo real"}
          </button>

          {/* Grid List Toggles */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold border border-slate-200">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}><Grid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Folders row */}
      {!onboardingEmpty && files.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 whitespace-nowrap">
          {folders.map((f, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveFolder(f.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                activeFolder === f.key 
                  ? "bg-[#C8102E] text-white border-[#C8102E]" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f.name} ({f.count})
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      {!onboardingEmpty && files.length > 0 && (
        <div className="relative">
          <span className="absolute left-3 top-3 text-slate-400"><Search className="w-4 h-4" /></span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar nos seus ficheiros oficiais..." 
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#C8102E]/20"
          />
        </div>
      )}

      {/* File Grid or List rendering */}
      {!onboardingEmpty && filteredFiles.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#C8102E]/30 transition shadow-xs flex flex-col justify-between space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-red-50 text-[#C8102E] rounded-xl"><FileText className="w-6 h-6" /></div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate" title={file.name}>{file.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{file.size} • {file.folder}</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Modificado: {file.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => alert("Visualização de ficheiro em desenvolvimento...")} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-950"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => alert("Download do PDF oficial em curso...")} className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-[#C8102E]"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {filteredFiles.map((file, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center gap-4 text-xs hover:bg-slate-50 transition">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-[#C8102E] shrink-0" />
                  <span className="font-bold text-slate-800 truncate" title={file.name}>{file.name}</span>
                </div>
                <div className="flex items-center gap-6 text-slate-400 shrink-0 font-mono text-[10px]">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => alert("Download do PDF em curso...")} className="p-1.5 hover:bg-slate-200 rounded text-slate-600 hover:text-slate-900"><Download className="w-4.5 h-4.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <DocumentsEmptyState onSeed={handleSeed} />
      )}
    </div>
  );
}

// ==========================================
// 6. PAYMENTS / BANKING STYLE DASHBOARD
// ==========================================
// ==========================================
// 6. PAYMENTS / BANKING STYLE DASHBOARD
// ==========================================
function PaymentsDashboardView({ member, onMakePayment }: { member: Member, onMakePayment: (amount: number, purpose: string, method: string) => void }) {
  const [payAmount, setPayAmount] = useState(member.outstandingBalance);
  const [payPurpose, setPayPurpose] = useState("Monthly Dues");
  const [payMethod, setPayMethod] = useState("Credit Card");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Recurring payment method states
  const [autoPay, setAutoPay] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const generatedCard = `5155 ${member.id.replace(/\D/g, "").padEnd(4, "0").slice(0,4)} ${member.membershipNo.replace(/\D/g, "").padEnd(4, "7").slice(-4)} ${member.mobile.replace(/\D/g, "").padEnd(4, "9").slice(-4)}`;
  const [linkedCard, setLinkedCard] = useState(generatedCard.replace(/\s/g, ""));
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [cardBlocked, setCardBlocked] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) return;
    onMakePayment(payAmount, payPurpose, payMethod);
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setPayAmount(member.outstandingBalance);
    }, 4000);
  };

  // Recharts custom analytics graph data
  const annualPaymentData = [
    { month: "Jan", valor: 120 },
    { month: "Fev", valor: 100 },
    { month: "Mar", valor: 120 },
    { month: "Abr", valor: 120 },
    { month: "Mai", valor: 120 },
    { month: "Jun", valor: 120 },
    { month: "Jul", valor: 120 },
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="banking-payments">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Finanças & Quotas Partidárias</h2>
        <p className="text-xs text-slate-500">Gerencie contribuições financeiras e mensalidades de membro com transparência bancária.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Outstanding Balance card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0F172A] to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">Saldo Pendente</p>
            <h3 className="text-3xl font-display font-black text-[#FFCC00] font-mono">R{member.outstandingBalance}.00</h3>
            <p className="text-[10px] text-slate-400">Mensalidade referente ao ciclo corrente do ano fiscal.</p>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">Débito Automático</span>
            <button 
              onClick={() => setAutoPay(!autoPay)} 
              className={`w-9 h-5 rounded-full p-0.5 transition ${autoPay ? "bg-[#16A34A]" : "bg-slate-700"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition transform ${autoPay ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {/* Analytics area graph */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Analytics de Mensalidades 2026</h4>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={annualPaymentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8102E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: 10, fontFamily: "monospace" }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: 10, fontFamily: "monospace" }} />
                <Tooltip />
                <Area type="monotone" dataKey="valor" stroke="#C8102E" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-display font-black text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-1.5">
            <DollarSign className="w-5 h-5 text-[#C8102E]" /> Efectuar Pagamento
          </h4>

          {paymentSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-5 rounded-xl text-center space-y-2 animate-fade-in">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-bold">Quotas Regularizadas!</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">Transação concluída com sucesso. Receberá um comprovativo oficial no seu e-mail.</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Finalidade</label>
                <select value={payPurpose} onChange={(e) => setPayPurpose(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium">
                  <option value="Monthly Dues">Quotas Mensais de Membro</option>
                  <option value="Annual Membership Renewal">Renovação de Inscrição Anual</option>
                  <option value="Donation">Contribuição Extraordinária / Doação</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Valor (ZAR)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-xs font-mono">R</span>
                  <input type="number" value={payAmount} onChange={(e) => setPayAmount(Number(e.target.value))} className="w-full pl-7 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold" min="10" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Método</label>
                <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium">
                  <option value="Credit Card">Whop Payment — Cartão de Crédito / Débito</option>
                  <option value="Mobile Money">Dinheiro Móvel (M-Pesa)</option>
                  <option value="EFT">Transferência Bancária Directa</option>
                </select>
              </div>

              <button type="submit" className="w-full py-3 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-lg text-xs transition shadow-sm">
                Confirmar Pagamento Seguro via Whop
              </button>
            </form>
          )}
        </div>

        {/* Payment History Log */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-display font-black text-slate-900 text-sm border-b border-slate-100 pb-2">Últimas Transações</h4>
          <div className="space-y-3.5">
            {[
              { id: "TX-9021-GP", date: "05 Jan 2026", purpose: "Quotas Anuais 2026", amount: 120, status: "Pago" },
              { id: "TX-7012-GP", date: "10 Jan 2025", purpose: "Quotas Anuais 2025", amount: 100, status: "Pago" }
            ].map((tx, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">{tx.purpose}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Ref: {tx.id} • {tx.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-mono font-bold text-slate-800">R{tx.amount}.00</p>
                  <span className="inline-block text-[8px] bg-emerald-50 text-[#16A34A] px-1.5 py-0.5 rounded font-bold uppercase">Pago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: LINK AUTOMATIC ANNUAL PAYMENT METHOD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h4 className="font-display font-black text-slate-900 text-sm flex items-center gap-1.5">
              <CreditCard className="w-5 h-5 text-[#C8102E]" /> Débito Automático de Quotas Anuais
            </h4>
            <p className="text-xs text-slate-500">Active o débito automático recorrente para manter a sua filiação sempre ativa e regularizada.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-slate-400">Cobrança Recorrente</span>
            <button 
              onClick={() => setAutoPay(!autoPay)} 
              className={`w-11 h-6 rounded-full p-0.5 transition ${autoPay ? "bg-[#16A34A]" : "bg-slate-200"}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${autoPay ? "translate-x-5" : "translate-x-0"} shadow-sm`} />
            </button>
          </div>
        </div>

        {autoPay ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Simulated Credit Card Graphic */}
            <div className="md:col-span-5 flex justify-center">
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 rounded-2xl border border-slate-800 text-white relative overflow-hidden shadow-lg aspect-5/3 flex flex-col justify-between max-w-sm w-full min-h-[180px]">
                {/* Micro-chip and branding logo */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-7 bg-amber-400/20 rounded border border-amber-400/30 flex items-center justify-center">
                    <div className="w-6 h-4 bg-amber-400/30 rounded-sm" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#FFCC00] font-black">★ MPLA/WHOP</span>
                </div>

                <div className="space-y-1">
                  <p className="text-[8px] uppercase font-mono tracking-wider text-slate-400">Número do Cartão</p>
                  <p className="font-mono text-sm tracking-widest font-bold">
                    {linkedCard 
                      ? `${showCardDetails ? generatedCard : `•••• •••• •••• ${linkedCard.slice(-4)}`}` 
                      : (cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : "•••• •••• •••• ••••")
                    }
                  </p>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono">
                  <div>
                    <p className="text-[8px] text-slate-500">Titular</p>
                    <p className="font-bold truncate max-w-[150px] uppercase">{cardName || member.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-slate-500">Validade</p>
                    <p className="font-bold">{cardExpiry || "MM/AA"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Card Details Link Form */}
            <div className="md:col-span-7 space-y-4">
              {linkedCard ? (
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl text-emerald-800 text-xs flex items-start gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <p className="font-bold text-slate-900">Método de Débito Autorizado!</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      O seu cartão terminado em <strong className="font-mono text-slate-800">*{linkedCard.slice(-4)}</strong> foi vinculado com sucesso para Débito Directo Seguro. As quotas de filiação no valor de <strong>R120.00 ZAR</strong> serão renovadas anualmente em Janeiro de cada ano de forma transparente.
                    </p>
                    <button 
                      onClick={() => {
                        setCardBlocked(true);
                      }}
                      className="text-[#C8102E] font-bold text-[10px] hover:underline pt-2 block cursor-pointer"
                    >
                      Bloquear Cartão
                    </button>
                    <button onClick={() => setShowCardDetails(!showCardDetails)} className="ml-3 text-slate-700 font-bold text-[10px] hover:underline pt-2 cursor-pointer">{showCardDetails ? "Ocultar detalhes" : "Ver detalhes"}</button>
                    <button onClick={() => alert("Abrir fluxo Whop para financiar cartão") } className="ml-3 text-emerald-700 font-bold text-[10px] hover:underline pt-2 cursor-pointer">Fund Card</button>
                    {cardBlocked && <p className="text-[10px] text-red-600 font-bold pt-2">Cartão bloqueado.</p>}
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (cardNumber.length < 15) {
                      alert("Por favor insira um número de cartão de crédito válido.");
                      return;
                    }
                    setLinkedCard(cardNumber);
                  }} 
                  className="space-y-3 text-xs"
                >
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Insira os seus dados de facturação bancária para autorizar o processamento anual de quotas de filiação.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">Número do Cartão</label>
                      <input 
                        type="text" 
                        maxLength={16}
                        placeholder="4000123456789010" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))} 
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">Nome Impresso</label>
                      <input 
                        type="text" 
                        placeholder="NOME COMPLETO" 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">Validade</label>
                      <input 
                        type="text" 
                        maxLength={5}
                        placeholder="MM/AA" 
                        value={cardExpiry} 
                        onChange={(e) => setCardExpiry(e.target.value)} 
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs" 
                        required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">CVC / Código</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        placeholder="•••" 
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs" 
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="px-5 py-2.5 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer">
                    Salvar e Activar Renovação Recorrente
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
            Pagamentos anuais automatizados estão actualmente desactivos. Active o botão de cobrança acima para associar o seu cartão de crédito.
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. EVENTS CAROUSEL VIEW
// ==========================================
const ConfettiBurst = () => {
  const particles = Array.from({ length: 60 }).map((_, i) => {
    const angle = Math.random() * 360;
    const distance = 40 + Math.random() * 120;
    const x = Math.cos(angle * (Math.PI / 180)) * distance;
    const y = Math.sin(angle * (Math.PI / 180)) * distance - 20;
    const size = 4 + Math.random() * 10;
    const duration = 1.2 + Math.random() * 1.5;
    const colors = ["#C8102E", "#FFCC00", "#16A34A", "#0F172A", "#FFFFFF"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { id: i, x, y, size, duration, color, rotate: Math.random() * 720 };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.2, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y + 100,
            opacity: [1, 1, 0],
            scale: [1, 1.3, 0.4],
            rotate: p.rotate
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

function EventsCarouselView({ member, events, onRegisterEvent }: { member: Member, events: PartyEvent[], onRegisterEvent: (eventId: string) => void }) {
  const [successEventId, setSuccessEventId] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    onRegisterEvent(id);
    setSuccessEventId(id);
  };

  const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=60"
  ];

  const activeEvent = events.find(e => e.id === successEventId);

  return (
    <div className="space-y-6 animate-fade-in" id="events-carousel">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Agenda de Eventos e Plenários</h2>
        <p className="text-xs text-slate-500">Mantenha-se informado e inscreva-se nas sessões oficiais de militantes.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {events.map((ev, idx) => {
          const isRegistered = ev.registeredMemberIds?.includes(member.id);
          const image = images[idx % images.length];

          return (
            <div key={ev.id} className="min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs shrink-0 flex flex-col justify-between hover:border-[#C8102E]/30 transition-all">
              <div className="relative h-40">
                <img src={image} className="w-full h-full object-cover" alt={ev.title} />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-red-600 text-white text-[9px] font-mono rounded font-bold uppercase">
                  {ev.organizer}
                </div>
              </div>

              <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-display font-black text-slate-800 text-sm leading-snug truncate" title={ev.title}>{ev.title}</h3>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#C8102E]" /> {ev.date}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#C8102E]" /> {ev.location}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{ev.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>Lotação: {ev.capacity} Militantes</span>
                    <span className="font-bold text-[#C8102E]">Vagas: {ev.capacity - (ev.registeredCount || 0)}</span>
                  </div>

                  <button 
                    onClick={() => handleRegister(ev.id)}
                    disabled={isRegistered}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isRegistered 
                        ? "bg-emerald-50 text-[#16A34A] border border-emerald-100 cursor-default" 
                        : "bg-[#C8102E] hover:bg-red-700 text-white shadow-sm"
                    }`}
                  >
                    {isRegistered ? <Check className="w-4 h-4" /> : null}
                    {isRegistered ? "Inscrito" : "Inscrição Rápida"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP-UP SUCCESS MICRO-INTERACTION MODAL */}
      <AnimatePresence>
        {successEventId && activeEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-[#FFCC00]/30 space-y-4 relative overflow-hidden"
            >
              <ConfettiBurst />

              {/* Success Ring animation */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-emerald-50 rounded-full text-emerald-500">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="bg-[#16A34A] text-white p-3.5 rounded-full"
                >
                  <Check className="w-9 h-9 stroke-[3]" />
                </motion.div>
              </div>

              <div className="space-y-1.5 relative z-10">
                <h3 className="font-display font-black text-slate-900 text-lg">Inscrição Confirmada!</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  A sua presença para o evento <strong className="text-slate-800">"{activeEvent.title}"</strong> foi registrada de forma segura no Comité de Militantes.
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => setSuccessEventId(null)}
                  className="px-6 py-2.5 bg-[#0F172A] hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Excelente, obrigado!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 8. LEARNING CENTRE / NETFLIX STYLE LAYOUT
// ==========================================
function LearningCentreView({ member, courses, onCompleteCourse }: { member: Member, courses: LearningCourse[], onCompleteCourse: (courseId: string) => void }) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const categories = ["Valores", "Política", "Comunidade", "Liderança"];

  return (
    <div className="space-y-8 animate-fade-in" id="learning-academy">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Academia Política do MPLA</h2>
        <p className="text-xs text-slate-500">Aprimore seus conhecimentos ideológicos e doutrinários com as nossas masterclasses.</p>
      </div>

      {categories.map((cat, cIdx) => {
        const catCourses = courses.filter(c => c.category === cat || (cat === "Valores" && c.category.includes("Ideology")));

        return (
          <div key={cIdx} className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono border-l-2 border-[#C8102E] pl-2">{cat}</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {catCourses.map((course) => {
                const isCompleted = member.completedCourses?.includes(course.id);

                return (
                  <div key={course.id} className="min-w-[260px] sm:min-w-[300px] bg-white rounded-xl border border-slate-200 p-4 shrink-0 flex flex-col justify-between space-y-3 hover:border-[#FFCC00]/40 transition">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-slate-800 text-xs leading-snug line-clamp-1">{course.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Duração: {course.duration || "45m"}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{course.description}</p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-50">
                      {isCompleted ? (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#16A34A] bg-emerald-50 py-1 px-2.5 rounded-lg border border-emerald-100">
                          <Check className="w-4 h-4" /> Certificado Concedido
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            onCompleteCourse(course.id);
                            alert(`Curso "${course.title}" concluído! Certificado emitido.`);
                          }}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-950 text-white text-[10px] font-bold rounded-lg transition text-center cursor-pointer"
                        >
                          Começar Aprendizado
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 9. NEWS FEED / MODERN NEWS LAYOUT
// ==========================================
function NewsFeedView({ announcements }: { announcements: Announcement[] }) {
  const images = [
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?w=600&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=60"
  ];

  return (
    <div className="space-y-6 animate-fade-in" id="news-feed">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Comunicados & Notícias Oficiais</h2>
        <p className="text-xs text-slate-500">Acompanhe as notícias de última hora, comunicados de imprensa e campanhas activas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((news, idx) => (
          <div key={news.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#C8102E]/35 transition-all flex flex-col justify-between">
            <div className="relative h-48 bg-slate-100">
              <img src={images[idx % images.length]} className="w-full h-full object-cover" alt="News Cover" />
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#C8102E] text-white text-[9px] font-mono rounded font-bold uppercase">
                {news.source}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {news.date} • 3 min de leitura
                </span>
                <h3 className="font-display font-black text-slate-900 text-sm leading-snug">{news.title}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">{news.content}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono font-bold">Autor: {news.author}</span>
                <div className="flex gap-2 text-slate-400">
                  <button onClick={() => alert("Gostou!")} className="p-1 hover:bg-slate-100 rounded text-[#C8102E]"><Heart className="w-4 h-4" /></button>
                  <button onClick={() => alert("Guardado!")} className="p-1 hover:bg-slate-100 rounded text-slate-600"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 10. MESSAGES / MESSENGER INTERFACE
// ==========================================
// ==========================================
// 10. MESSAGES / MESSENGER INTERFACE
// ==========================================
function MessagesEmptyState({ onStartChat }: { onStartChat: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto space-y-6 animate-fade-in bg-white rounded-3xl">
      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#C8102E]/10 via-[#FFCC00]/5 to-[#16A34A]/5 rounded-full blur-2xl animate-pulse" />
        
        {/* Interlocking Rings */}
        <div className="absolute w-36 h-36 border border-slate-100 rounded-full" />
        <div className="absolute w-28 h-28 border border-dashed border-[#FFCC00]/40 rounded-full animate-spin-slow" />
        
        {/* Yellow Bubble (Left / Back) */}
        <div className="absolute transform -translate-x-6 translate-y-2 bg-[#FFCC00] text-slate-900 px-3.5 py-2 rounded-2xl rounded-bl-none shadow-md border border-amber-300 flex items-center gap-1">
          <span className="text-[10px] font-mono font-black">★</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce delay-200" />
            <span className="w-1.5 h-1.5 bg-slate-900 rounded-full animate-bounce delay-300" />
          </div>
        </div>

        {/* Red Bubble (Right / Front) */}
        <div className="absolute transform translate-x-6 -translate-y-4 bg-[#C8102E] text-white px-4 py-2.5 rounded-2xl rounded-br-none shadow-lg flex flex-col gap-1 z-10 border border-red-700">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[7px] font-bold uppercase tracking-wider text-slate-200">MPLA SECURE</span>
          </div>
          <p className="text-[10px] font-semibold text-left">Camarada...</p>
        </div>

        {/* Small floating accents */}
        <div className="absolute top-2 left-6 w-2.5 h-2.5 bg-[#16A34A] rounded-full animate-pulse" />
        <div className="absolute bottom-4 right-10 text-[#FFCC00] text-sm font-black animate-bounce">★</div>
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display font-black text-slate-900 text-sm">Sem Mensagens Activas</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
          A sua caixa de correio seguro com o Secretariado está limpa. Aqui pode tirar dúvidas directamente com os oficiais do partido.
        </p>
      </div>

      <button
        onClick={onStartChat}
        className="px-5 py-2.5 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shadow-md hover:shadow-red-500/20 flex items-center gap-2 cursor-pointer mx-auto"
      >
        <MessageSquare className="w-4 h-4 text-[#FFCC00]" />
        Iniciar Conversa de Boas-Vindas
      </button>
    </div>
  );
}

function MessagesMessengerView({ member }: { member: Member }) {
  const [messages, setMessages] = useState([
    { sender: "officer", name: "Secretário Geral Ward 117", text: "Olá camarada, a sua ficha cadastral foi verificada com sucesso. O cartão estará pronto em breve.", time: "Hoje 09:12" }
  ]);
  const [onboardingEmpty, setOnboardingEmpty] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    const newMsg = { sender: "member", name: member.fullName, text: typedMessage, time: "Agora" };
    setMessages([...messages, newMsg]);
    setTypedMessage("");

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "officer", name: "Secretário Geral Ward 117", text: "Obrigado pela confirmação. Informaremos assim que o envio internacional for despachado.", time: "Agora" }
      ]);
    }, 1500);
  };

  const handleStartChat = () => {
    setMessages([
      { sender: "officer", name: "Secretário Geral Ward 117", text: "Olá camarada, seja bem-vindo ao canal de mensagens directas do MPLA Sede África do Sul. Como podemos ajudar hoje?", time: "Agora" }
    ]);
    setOnboardingEmpty(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    setOnboardingEmpty(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl overflow-hidden h-[520px] shadow-xs" id="messenger-panel">
      {/* Channels Sidebar List */}
      <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50/50 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider">Conversas</h3>
          <button 
            onClick={() => onboardingEmpty ? handleStartChat() : handleClearChat()}
            className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition flex items-center gap-1 ${
              onboardingEmpty 
                ? "bg-red-50 text-[#C8102E] border border-red-100" 
                : "bg-slate-200 text-slate-600 hover:bg-slate-300"
            }`}
            title="Simular caixa de mensagens vazia"
          >
            {onboardingEmpty ? "Modo Vazio" : "Simular Vazio"}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {!onboardingEmpty && messages.length > 0 ? (
            <div className="p-4 bg-white flex gap-3 cursor-pointer border-l-4 border-[#C8102E]">
              <div className="w-10 h-10 bg-[#C8102E]/10 rounded-full flex items-center justify-center text-[#C8102E] shrink-0 font-bold">W</div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Comité Ward 117</span>
                  <span className="text-[9px] text-slate-400 font-mono">09:12</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                  {messages[messages.length - 1]?.text || "Inicie a conversa..."}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-[11px] text-slate-400 font-mono">
              Nenhuma conversa activa.
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-8 flex flex-col justify-between h-full bg-white relative">
        {onboardingEmpty || messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center bg-white p-6">
            <MessagesEmptyState onStartChat={handleStartChat} />
          </div>
        ) : (
          <>
            {/* Chat window top header bar */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#16A34A] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Secretariado Local Ward 117</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Ativo Agora</span>
            </div>

            {/* Scrollable messages container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === "member" ? "items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-xl max-w-[85%] text-xs ${
                    msg.sender === "member" 
                      ? "bg-[#C8102E] text-white rounded-br-none" 
                      : "bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-2xs"
                  }`}>
                    <p className="font-bold text-[10px] opacity-80 mb-1">{msg.name}</p>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom typed input tray */}
            <form onSubmit={sendMessage} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
              <input 
                type="text" 
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Escreva a sua mensagem para o comité..." 
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#C8102E]"
              />
              <button type="submit" className="p-2.5 bg-[#C8102E] text-white rounded-xl hover:bg-red-700 transition shadow-sm cursor-pointer">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 11. COMMUNITY / SOCIAL FÖRD
// ==========================================
function CommunitySocialView({ member, polls, onCastVote }: { member: Member, polls: SurveyPoll[], onCastVote: (pollId: string, option: string) => void }) {
  const [posts, setPosts] = useState([
    { id: 1, author: "Maria Fernandes", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop", text: "Excelente ver a nossa delegação em Joanesburgo a crescer com tanto empenho dos jovens militantes. Juntos pelo progresso de Angola! 🇦🇴❤️", likes: 18, comments: 4, liked: false },
    { id: 2, author: "Camarada João Neto", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", text: "Lembrete: o plenário de debate político ideológico de sábado terá início às 14:00 em ponto. Não faltem!", likes: 12, comments: 2, liked: false }
  ]);
  const [newPostText, setNewPostText] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: member.fullName,
      avatar: member.photo,
      text: newPostText,
      likes: 0,
      comments: 0,
      liked: false
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in" id="community-forum">
      {/* Left Area: Main Feed */}
      <div className="lg:col-span-8 space-y-6">
        {/* Create Post Card */}
        <form onSubmit={handleCreatePost} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex gap-3">
            <img src={member.photo} className="w-9 h-9 rounded-full object-cover border" alt="Me" referrerPolicy="no-referrer" />
            <textarea 
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="O que está a pensar hoje, camarada?" 
              className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#C8102E] resize-none h-18"
            />
          </div>
          <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
            <div className="flex gap-2">
              <button type="button" className="p-1.5 hover:bg-slate-50 text-slate-500 rounded flex items-center gap-1 text-[10px] font-bold"><ImageIcon className="w-4 h-4 text-emerald-600" /> Foto</button>
              <button type="button" className="p-1.5 hover:bg-slate-50 text-slate-500 rounded flex items-center gap-1 text-[10px] font-bold"><Video className="w-4 h-4 text-rose-600" /> Vídeo</button>
            </div>
            <button type="submit" className="px-4 py-1.5 bg-[#C8102E] text-white text-xs font-bold rounded-lg hover:bg-red-700 transition shadow-sm cursor-pointer">
              Publicar
            </button>
          </div>
        </form>

        {/* Posts lists */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <img src={post.avatar} className="w-10 h-10 rounded-full object-cover border" alt="Author" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">{post.author}</h4>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 block">Membro Consular</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{post.text}</p>
              
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <button 
                  type="button" 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 font-bold ${post.liked ? "text-[#C8102E]" : "hover:text-slate-600"}`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? "fill-[#C8102E]" : ""}`} /> {post.likes} Apoios
                </button>
                <span>{post.comments} Comentários</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area: Interactive Polls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Consultas do Comité</h4>
          
          {polls.map((poll) => {
            const totalVotes = Object.values(poll.votes).reduce((a, b) => a + b, 0);
            const hasVoted = poll.votedMemberIds?.includes(member.id);

            return (
              <div key={poll.id} className="space-y-3">
                <h5 className="text-xs font-bold text-slate-800 leading-snug">{poll.title}</h5>
                <p className="text-[10px] text-slate-500 leading-relaxed">{poll.description}</p>
                <div className="space-y-2 pt-1">
                  {poll.options.map((opt) => {
                    const votes = poll.votes[opt] || 0;
                    const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

                    return (
                      <div key={opt}>
                        {hasVoted ? (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-bold text-slate-600">
                              <span>{opt}</span>
                              <span className="font-mono">{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#C8102E]" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => onCastVote(poll.id, opt)}
                            className="w-full text-left px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold hover:bg-red-50 hover:border-[#C8102E]/30 transition cursor-pointer"
                          >
                            {opt}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 12. COMMITTEE DETAILS VIEW
// ==========================================
function CommitteeDetailsView({ member, announcements }: { member: Member, announcements: Announcement[] }) {
  const officers = [
    { role: "Secretário de Círculo", name: "Camarada Dr. Manuel Silva", phone: "+27 82 555 9011", email: "secretario.ward117@mpla-sa.org" },
    { role: "Coordenadora de Mobilização", name: "Camarada Teresa Dias", phone: "+27 83 444 8922", email: "mobilizacao.ward117@mpla-sa.org" },
    { role: "Secretária de Finanças", name: "Camarada Amélia Neto", phone: "+27 82 111 8899", email: "financas.ward117@mpla-sa.org" }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in" id="committee-section">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Comité de Especialidade Ward 117</h2>
        <p className="text-xs text-slate-500">Informação e contacto directo com a direcção consular local na Sede da África do Sul.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {/* Committee Address Box */}
        <div className="flex gap-3 bg-red-50/50 border border-red-100 p-4 rounded-xl">
          <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-slate-800">Sede Consular de Joanesburgo</h4>
            <p className="text-slate-500 leading-relaxed">
              156 Rivonia Rd, Morningside, Sandton, Joanesburgo, África do Sul. Atendimento de Segunda a Sexta: 09:00 - 16:30.
            </p>
          </div>
        </div>

        {/* Officers Grid */}
        <div className="space-y-3.5">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Quadros do Secretariado</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {officers.map((off, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                <span className="text-[9px] font-mono font-black uppercase text-[#C8102E] tracking-wider">{off.role}</span>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800 leading-snug">{off.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{off.phone}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate" title={off.email}>{off.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. SUPPORT CENTRE VIEW
// ==========================================
function SupportCentreView({ member, tickets, onSubmitTicket, onSubmitTicketReply }: { member: Member, tickets: SupportTicket[], onSubmitTicket: (type: any, description: string) => void, onSubmitTicketReply: (ticketId: string, text: string) => void }) {
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState<any>("Profile Correction");
  const [success, setSuccess] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    onSubmitTicket(newType, newDesc);
    setNewDesc("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleReply = (e: React.FormEvent, tId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSubmitTicketReply(tId, replyText);
    setReplyText("");
    alert("Resposta submetida com sucesso!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in" id="support-centre">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Centro de Apoio Consular</h2>
        <p className="text-xs text-slate-500">Abra pedidos de retificação, informe perda de credenciais ou envie dúvidas ao secretariado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Ticket Submission form */}
        <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Novo Pedido</h4>
          
          {success ? (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-center space-y-1 text-xs">
              <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
              <p className="font-bold">Ticket Aberto com Sucesso!</p>
              <p className="text-[10px] text-slate-500">A delegação local analisará a solicitação brevemente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Tipo de Solicitação</label>
                <select value={newType} onChange={(e) => setNewType(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold">
                  <option value="Profile Correction">Retificação de Nome / Dados</option>
                  <option value="Lost Card Report">Perda de Cartão Físico</option>
                  <option value="Card Replacement">Pedido de Segunda Via</option>
                  <option value="General Inquiry">Consulta Geral</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Descrição da Solicitação</label>
                <textarea 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explique detalhadamente o seu pedido ao secretariado..." 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg h-24 resize-none"
                  required
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-[#C8102E] hover:bg-red-700 text-white font-bold rounded-lg transition shadow-xs cursor-pointer">
                Submeter Pedido Oficial
              </button>
            </form>
          )}
        </div>

        {/* Existing tickets list */}
        <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Seus Pedidos Activos</h4>
          
          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {tickets.map((tk) => (
              <div key={tk.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 font-mono text-[#C8102E]">{tk.type}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                    tk.status === "Resolved" ? "bg-emerald-50 text-[#16A34A]" : "bg-yellow-50 text-amber-600"
                  }`}>{tk.status}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{tk.description}</p>
                <span className="text-[9px] text-slate-400 font-mono block">Criado em: {tk.createdAt}</span>

                {/* Show replies */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {tk.replies?.map((rp, rIdx) => (
                    <div key={rIdx} className="p-2 bg-white rounded border border-slate-200/50 text-[10px]">
                      <span className="font-bold text-slate-800">{rp.senderName}:</span>
                      <p className="text-slate-600 mt-0.5">{rp.text}</p>
                    </div>
                  ))}

                  <form onSubmit={(e) => handleReply(e, tk.id)} className="flex gap-1.5 pt-1">
                    <input 
                      type="text" 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Responder..." 
                      className="flex-1 p-1.5 bg-white border border-slate-200 rounded text-[10px]"
                    />
                    <button type="submit" className="px-3 bg-slate-800 text-white rounded text-[10px] font-bold">Enviar</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 14. SETTINGS VIEW
// ==========================================
function SettingsView({ member, onUpdateProfile }: { member: Member, onUpdateProfile: (updatedData: Partial<Member>) => void }) {
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in" id="settings-panel">
      <div className="space-y-1">
        <h2 className="text-xl font-display font-black text-slate-900 tracking-tight">Preferências & Segurança</h2>
        <p className="text-xs text-slate-500">Ajuste as suas credenciais, alertas e opções de privacidade.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="space-y-4">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Parâmetros de Segurança</h4>
          
          <div className="flex justify-between items-center text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-800">Autenticação multifatorial (2FA)</p>
              <p className="text-[10px] text-slate-400">Solicitar OTP móvel em cada login consurlar.</p>
            </div>
            <button onClick={() => setTwoFactor(!twoFactor)} className={`w-9 h-5 rounded-full p-0.5 transition ${twoFactor ? "bg-[#C8102E]" : "bg-slate-200"}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition transform ${twoFactor ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-50">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-800">Criptografia Biométrica</p>
              <p className="text-[10px] text-slate-400">Permitir Face ID / Touch ID na carteira digital móvel.</p>
            </div>
            <button onClick={() => setBiometrics(!biometrics)} className={`w-9 h-5 rounded-full p-0.5 transition ${biometrics ? "bg-[#C8102E]" : "bg-slate-200"}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition transform ${biometrics ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Comunicação</h4>
          
          <div className="flex justify-between items-center text-xs">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-800">Comunicados por E-mail</p>
              <p className="text-[10px] text-slate-400">Receber alertas de plenários locais imediatos.</p>
            </div>
            <button onClick={() => setNotifEmail(!notifEmail)} className={`w-9 h-5 rounded-full p-0.5 transition ${notifEmail ? "bg-[#C8102E]" : "bg-slate-200"}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition transform ${notifEmail ? "translate-x-4" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
