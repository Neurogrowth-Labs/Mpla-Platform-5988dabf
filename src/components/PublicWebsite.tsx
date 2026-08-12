import { images } from "../assets/images";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Mail, Clock, Globe, ArrowRight, User, Shield, Users, 
  Calendar, MapPin, Award, BookOpen, Volume2, ShieldCheck, 
  Download, Search, Eye, Share2, HelpCircle, ChevronRight, 
  ChevronDown, ExternalLink, MessageSquare, Heart, Sparkles,
  Check, FileText, CheckCircle2, Moon, Sun, Type, Play, X,
  ArrowLeft, ChevronLeft, Send, Sparkle, Trophy
} from "lucide-react";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

interface PublicWebsiteProps {
  onNavigateToAuth: (mode: "signin" | "signup") => void;
}

export default function PublicWebsite({ onNavigateToAuth }: PublicWebsiteProps) {
  // Localization / Language
  const [language, setLanguage] = useState<"PT" | "EN">("PT");

  // Accessibility & Visual settings
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");

  // Navigation state (Transparent to Solid on scroll)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hero slideshow auto-rotation
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title_pt: "Construindo Unidade. Fortalecendo Comunidades.",
      title_en: "Building Unity. Empowering Communities.",
      sub_pt: "Promovendo a cidadania participativa, solidariedade e progresso dos angolanos na África do Sul.",
      sub_en: "Promoting participatory citizenship, solidarity and progress for Angolans in Diáspora.",
      image: "https://cdn.dailymaverick.co.za/dailymaverick/wp-content/uploads/2022/01/000_9D84GG-1.jpg"
    },
    {
      title_pt: "Inovação, Disciplina e Liderança Jovem",
      title_en: "Innovation, Discipline and Youth Leadership",
      sub_pt: "A JMPLA liderando a formação académica, empreendedorismo e o futuro da nossa comunidade.",
      sub_en: "JMPLA leading academic training, entrepreneurship and the future of our community.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaULF4VKz7AMPfCly9-Y4QQMctIz6BYkUBN80F38Q-w&s=10"
    },
    {
      title_pt: "Emancipação da Mulher e Ação Social OMA",
      title_en: "Women Empowerment and OMA Social Action",
      sub_pt: "Garantindo a igualdade de oportunidades e o amparo social a todas as famílias angolanas.",
      sub_en: "Ensuring equal opportunities and social support for all Angolan families.",
      image: "https://shutterstock.com/editorial/image-editorial/O1Tbk617M9TbI32cODU5Ng==/delegates-popular-movement-liberation-angola-mpla-show-440nw-9876929i.jpg"
    },
    {
      title_pt: "Diplomacia Cívica e Preservação da Identidade",
      title_en: "Civic Diplomacy and Preserving Identity",
      sub_pt: "Sede central de coordenação unindo a nossa pátria aos desafios e conquistas na diáspora.",
      sub_en: "Central coordination headquarter linking our homeland to the challenges and achievements in diaspora.",
      image: "https://static.euronews.com/articles/stories/06/94/41/36/1024x538_cmsv2_cce1dd0f-274d-57f6-90e8-bdf685f81aae-6944136.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Dynamic news ticker rolling text
  const tickerText = {
    PT: "📢 AVISO: Campanha de Recadastramento Digital 2026 ativa • 📅 Fórum de Negócios em Sandton no próximo mês • 🌍 Nova linha de Apoio Consular 24h aberta • 💡 Faça parte da OMA e JMPLA hoje",
    EN: "📢 NOTICE: 2026 Digital Re-registration Campaign is Active • 📅 Business Forum in Sandton next month • 🌍 New 24h Consular Support Line open • 💡 Join OMA and JMPLA today"
  }[language];

  // About tabs: Mission, Vision, Values
  const [aboutTab, setAboutTab] = useState<"mission" | "vision" | "values">("mission");

  // Interactive horizontal timeline state
  const [activeYear, setActiveYear] = useState(2026);
  const timelineData = [
    {
      year: 1956,
      title_pt: "Fundação do MPLA",
      title_en: "MPLA Foundation",
      desc_pt: "Nascimento do Movimento Popular de Libertação de Angola, lançando as bases para a autodeterminação nacional.",
      desc_en: "Birth of the Popular Movement for the Liberation of Angola, laying the ground for national self-determination.",
      milestone: "Unidade e Luta",
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=500&q=80"
    },
    {
      year: 1975,
      title_pt: "Proclamação da Independência",
      title_en: "Proclamation of Independence",
      desc_pt: "O Presidente António Agostinho Neto proclama a independência nacional de Angola em 11 de Novembro.",
      desc_en: "President António Agostinho Neto proclaims Angola's national independence on November 11th.",
      milestone: "Independência Nacional",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80"
    },
    {
      year: 2002,
      title_pt: "Conquista da Paz Definitiva",
      title_en: "Achieving Definitive Peace",
      desc_pt: "Assinatura do Memorando de Entendimento do Luena, unificando a nação e abrindo caminho para a reconstrução.",
      desc_en: "Signing of the Luena Peace Accord, unifying the nation and paving the path for massive reconstruction.",
      milestone: "Reconstrução e Paz",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500&q=80"
    },
    {
      year: 2012,
      title_pt: "Expansão da Representação na SADC",
      title_en: "SADC Representation Expansion",
      desc_pt: "Criação do Círculo de Coordenação Nacional da África do Sul, formalizando apoio à imensa comunidade diáspora.",
      desc_en: "Creation of the Diáspora National Coordination Circle, formalizing institutional support for the diaspora.",
      milestone: "Presença Internacional",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80"
    },
    {
      year: 2020,
      title_pt: "Transição e Modernização Tecnológica",
      title_en: "Transition & Technological Modernization",
      desc_pt: "Lançamento de bases digitais para acompanhamento consular, cursos académicos e integração comunitária.",
      desc_en: "Launch of online portals for consular assistance tracking, academic support and community integration.",
      milestone: "Modernização",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=500&q=80"
    },
    {
      year: 2026,
      title_pt: "Filiação Digital Unificada",
      title_en: "Unified Digital Membership",
      desc_pt: "Integração total do sistema de cartões criptografados e carteiras virtuais de apoio a todos os angolanos na África do Sul.",
      desc_en: "Full rollout of encrypted digital cards and community support hubs across all Diásporan provinces.",
      milestone: "Futuro e Conectividade",
      image: "/src/assets/images/mpla_supporters_background_1784328681804.jpg"
    }
  ];

  // Leadership state
  const [leadershipFilter, setLeadershipFilter] = useState("all");
  const [selectedLeader, setSelectedLeader] = useState<any | null>(null);

  const leaders = [
    {
      name: "Camarada Dr. Manuel Diogo",
      role_pt: "Secretário Executivo da Coordenação Nacional",
      role_en: "National Coordination Executive Secretary",
      committee: "national",
      bio_pt: "Diplomata e cientista político com mais de 18 anos de coordenação de assuntos comunitários e bilaterais entre Angola e África do Sul. Dedicado a reestruturar os mecanismos de apoio consular.",
      bio_en: "Diplomat and political scientist with over 18 years of experience coordinating community and bilateral affairs between Angola and Diáspora. Dedicated to improving consular helpdesks.",
      speech_pt: "A nossa missão na diáspora sul-africana transcende a política; somos uma família unida pela identidade, trabalhando incansavelmente para o progresso de cada angolano.",
      speech_en: "Our mission in the Diásporan diaspora transcends politics; we are a family united by identity, working tirelessly for the progress of every Angolan citizen.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop"
    },
    {
      name: "Camarada Teresa Francisco",
      role_pt: "Coordenadora Regional da OMA - África do Sul",
      role_en: "OMA Regional Coordinator - Diáspora",
      committee: "oma",
      bio_pt: "Líder de direitos cívicos femininos, gestora comunitária em Joanesburgo, foca no apoio ao empreendedorismo feminino, capacitação de mulheres e amparo social a agregados familiares vulneráveis.",
      bio_en: "Women's civic rights advocate, community manager in Johannesburg, focusing on women's entrepreneurship, child education, and welfare support for single-parent families.",
      speech_pt: "Mulheres fortes constroem nações fortes. Na OMA, abrimos portas de formação e autonomia financeira para que a mulher angolana seja protagonista de sua história.",
      speech_en: "Strong women build strong nations. At OMA, we open avenues for professional training and financial autonomy so that Angolan women can lead their destinies.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop"
    },
    {
      name: "Camarada António Bernardo",
      role_pt: "Secretário Geral da JMPLA - Província do Gauteng",
      role_en: "JMPLA General Secretary - Gauteng Province",
      committee: "jmpla",
      bio_pt: "Engenheiro de sistemas e mentor académico, lidera projetos de bolsas de estudo e integração de jovens angolanos nas universidades sul-africanas de prestígio.",
      bio_en: "Systems engineer and academic mentor, leading student bursaries and the smooth integration of young Angolans into premium Diásporan universities.",
      speech_pt: "A juventude é o motor da inovação. Capacitar nossos estudantes na África do Sul com tecnologia e ciência é semear o progresso de Angola no amanhã.",
      speech_en: "Youth is the engine of innovation. Empowering our students in Diáspora with technology and science is sowing the seeds of Angola's progress tomorrow.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop"
    },
    {
      name: "Camarada Sofia Cassule",
      role_pt: "Secretária de Mobilização e Integração Social",
      role_en: "Secretary of Mobilization and Social Integration",
      committee: "national",
      bio_pt: "Especialista em assistência humanitária, lidera o registo social unificado, auxiliando os imigrantes a regularizarem a sua documentação e inserção laboral digna.",
      bio_en: "Humanitarian assistance specialist, leading the unified social registry, assisting immigrants in regularizing documentation and obtaining dignified employment.",
      speech_pt: "A solidariedade é a nossa maior divisa. Nenhum compatriota nosso deve sentir-se desamparado nas terras da África do Sul.",
      speech_en: "Solidarity is our greatest currency. No compatriot of ours should ever feel helpless or forgotten while living in Diáspora.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop"
    }
  ];

  // Interactive Diáspora Map state
  const [hoveredProvince, setHoveredProvince] = useState<string | null>("GP");
  const provinceDetails: Record<string, { name: string; members: string; caps: number; projects: string }> = {
    GP: { name: "Gauteng (Johannesburg/Pretoria)", members: "6,420+", caps: 14, projects: "Aulas de Português, Gabinete Jurídico, Distribuição Alimentar" },
    WC: { name: "Western Cape (Cape Town)", members: "3,150+", caps: 8, projects: "Mentoria Académica JMPLA, Integração Consular" },
    KZN: { name: "KwaZulu-Natal (Durban)", members: "1,580+", caps: 4, projects: "Encontros de Negócios Bilaterais SADC" },
    EC: { name: "Eastern Cape (Gqeberha)", members: "650+", caps: 2, projects: "Apoio a Famílias Estudantis" },
    FS: { name: "Free State (Bloemfontein)", members: "650+", caps: 2, projects: "Apoio de Integração a Estudantes Universitários" }
  };

  // Recharts Dashboard Data
  const membershipGrowthData = [
    { year: "2021", membros: 7800 },
    { year: "2022", membros: 9100 },
    { year: "2023", membros: 10400 },
    { year: "2024", membros: 11200 },
    { year: "2025", membros: 11900 },
    { year: "2026", membros: 12450 }
  ];

  const distributionData = [
    { name: "Gauteng", Membros: 6420 },
    { name: "Western Cape", Membros: 3150 },
    { name: "KwaZulu-Natal", Membros: 1580 },
    { name: "Outras Províncias", Membros: 1300 }
  ];

  // Netflix-style Events Countdown State
  const [eventCountdowns, setEventCountdowns] = useState<Record<number, string>>({});
  
  useEffect(() => {
    const dates = [
      new Date("2026-08-12T09:00:00").getTime(),
      new Date("2026-08-29T14:00:00").getTime(),
      new Date("2026-09-08T10:00:00").getTime()
    ];

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updated: Record<number, string> = {};
      
      dates.forEach((target, index) => {
        const diff = target - now;
        if (diff < 0) {
          updated[index] = "EVENT LIVE";
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          updated[index] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setEventCountdowns(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const eventList = [
    {
      title_pt: "Conferência Provincial de Quadros e Militantes - Gauteng 2026",
      title_en: "Gauteng Provincial Officers and Members Conference 2026",
      location: "Sandton Convention Centre, Johannesburg",
      date_pt: "12 de Agosto de 2026",
      date_en: "August 12, 2026",
      time: "09:00 - 16:00",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80"
    },
    {
      title_pt: "Comício da Juventude e Palestra sobre Integração e Liderança Cívica",
      title_en: "Youth Rally and Seminar on Civic Leadership and Integration",
      location: "Pretoria Town Hall, Tshwane",
      date_pt: "29 de Agosto de 2026",
      date_en: "August 29, 2026",
      time: "14:00 - 18:00",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80"
    },
    {
      title_pt: "Encontro de Negócios Angola-SA para Jovens Empreendedores",
      title_en: "Angola-SA Business Linkage for Youth Entrepreneurs",
      location: "Cape Town ICC, Western Cape",
      date_pt: "08 de Setembro de 2026",
      date_en: "September 08, 2026",
      time: "10:00 - 13:00",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Community Gallery Lightbox & Filter state
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = [
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaULF4VKz7AMPfCly9-Y4QQMctIz6BYkUBN80F38Q-w&s=10", category: "events", title_pt: "JMPLA - Reunião Geral de Quadros", title_en: "JMPLA - General Officers Meeting" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dmmZOI1ueDakZtkqMPnmf0eiT0u1cSnhl0Y2VfhY9hQMfZ9Gld5iCJZv&s=10", category: "education", title_pt: "JMPLA - Fórum Académico em Gauteng", title_en: "JMPLA - Academic Forum in Gauteng" },
    { url: "https://shutterstock.com/editorial/image-editorial/O1Tbk617M9TbI32cODU5Ng==/delegates-popular-movement-liberation-angola-mpla-show-440nw-9876929i.jpg", category: "community", title_pt: "OMA - Delegação no Congresso Regional", title_en: "OMA - Regional Congress Delegation" },
    { url: "https://static.euronews.com/articles/stories/06/94/41/36/1024x538_cmsv2_cce1dd0f-274d-57f6-90e8-bdf685f81aae-6944136.jpg", category: "events", title_pt: "MPLA - Lançamento da Campanha Nacional", title_en: "MPLA - National Campaign Launch" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYheVPTZ0uDgb5oLwwkZPgDYLD4_PPiP2cHPsR1EtvwKl5la7599hJuowQ&s=10", category: "leadership", title_pt: "MPLA - Liderança e Comitê Central", title_en: "MPLA - Leadership and Central Committee" },
    { url: "https://cdn.dailymaverick.co.za/dailymaverick/wp-content/uploads/2022/01/000_9D84GG-1.jpg", category: "culture", title_pt: "Militantes e Apoiantes na Diáspora", title_en: "Members and Supporters in the Diaspora" },
    { url: "https://static.euronews.com/articles/stories/06/96/07/50/900x506_cmsv2_2419f12a-d327-5928-bc76-4b6eb6218eec-6960750.jpg", category: "events", title_pt: "MPLA - Congresso de Concertação Política", title_en: "MPLA - Political Concertation Congress" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTigATXWgvEI8URDv80_l3AezYSMuce5RnbGw5qRU187KizdGYQdXgln3jq&s=10", category: "culture", title_pt: "MPLA - Mobilização de Apoio e Solidariedade", title_en: "MPLA - Support & Solidarity Mobilization" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx9MypTt1ZG2w-y3ZCEknhdIZIs6vBY6DG952S_6oe8pCfRv9bnH-TnePV&s=10", category: "community", title_pt: "Acção Cívica de Integração da Diáspora", title_en: "Civic Integration Outreach for Diaspora" }
  ];

  const filteredGallery = useMemo(() => {
    if (galleryCategory === "all") return galleryImages;
    return galleryImages.filter(img => img.category === galleryCategory);
  }, [galleryCategory, galleryImages]);

  // Video Section state
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Donation Modal state
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Al Jazeera News Article Modal state
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // Dropdown for Sobre in navigation
  const [showSobreDropdown, setShowSobreDropdown] = useState(false);

  // Testimonials Auto-slide Carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      quote_pt: "O amparo e dedicação do Comitê de Solidariedade do MPLA na África do Sul permitiram-me renovar a minha documentação civil e encontrar um ambiente acolhedor e seguro para as minhas filhas estudarem em Gauteng.",
      quote_en: "The care and commitment of the MPLA Solidarity Committee in Diáspora enabled me to renew my civil documents and find a welcoming and secure environment for my daughters to study in Gauteng.",
      author: "Maria de Lurdes Neto",
      role_pt: "Estudante e Mãe, Residente em Germiston",
      role_en: "Student and Mother, Residing in Germiston",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
    },
    {
      quote_pt: "O Fórum de Jovens Empreendedores da JMPLA foi o catalisador ideal para conectar a minha startup de consultoria de rede a investidores bilaterais em Luanda. Um ecossistema de excelência e amizade profunda.",
      quote_en: "The JMPLA Young Entrepreneurs Forum was the perfect catalyst to connect my networking startup to bilateral investors in Luanda. A community of excellence and deep solidarity.",
      author: "Camarada Dr. Mateus Simão",
      role_pt: "Engenheiro de Redes, Membro em Cape Town",
      role_en: "Network Engineer, Cape Town Member",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, [testimonials.length]);

  // Form handling
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Global search autocomplete
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchAutocomplete, setShowSearchAutocomplete] = useState(false);
  const searchableItems = [
    { text_pt: "Registo Digital de Militantes 2026", text_en: "2026 Digital Membership Registration", link: "#membership" },
    { text_pt: "Calendário de Reuniões de Gauteng", text_en: "Gauteng Meeting Calendars", link: "#events" },
    { text_pt: "Estatutos Oficiais do Partido (PDF)", text_en: "Official Party Statutes (PDF)", link: "#infocenter" },
    { text_pt: "OMA Apoio Social e Cívico", text_en: "OMA Civic & Social Welfare Support", link: "#about" },
    { text_pt: "Apostila Consular e Bolsas JMPLA", text_en: "Consular Registration & JMPLA Bursaries", link: "#about" }
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return searchableItems.filter(item => 
      item.text_pt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.text_en.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div 
      className={`min-h-screen antialiased transition-all duration-300 ${
        highContrast ? "bg-black text-white" : "bg-[#FAF9F5] text-slate-900"
      } ${
        fontSize === "large" ? "text-lg" : fontSize === "xlarge" ? "text-xl" : "text-base"
      }`}
      id="portal-root"
    >
      {/* ACCESS ACCESSIBILITY & TICKER HEADER */}
      <div className="relative z-50 bg-[#151515] text-white border-b border-neutral-800 text-xs py-1.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Dynamic News Ticker */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-3/5">
            <span className="bg-[#B5121B] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
              LATEST
            </span>
            <div className="relative w-full overflow-hidden h-4">
              <motion.div 
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute whitespace-nowrap text-[11px] font-medium text-amber-400"
              >
                {tickerText}
              </motion.div>
            </div>
          </div>

          {/* Accessibility controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Font Scaling */}
            <div className="flex items-center gap-1.5 border-r border-neutral-800 pr-3">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              <button 
                onClick={() => setFontSize("normal")} 
                className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${fontSize === "normal" ? "bg-amber-400 text-black" : "text-slate-400 hover:text-white"}`}
                title="Normal Font"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize("large")} 
                className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${fontSize === "large" ? "bg-amber-400 text-black" : "text-slate-400 hover:text-white"}`}
                title="Large Font"
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize("xlarge")} 
                className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${fontSize === "xlarge" ? "bg-amber-400 text-black" : "text-slate-400 hover:text-white"}`}
                title="Extra Large Font"
              >
                A++
              </button>
            </div>

            {/* High Contrast */}
            <button 
              onClick={() => setHighContrast(!highContrast)}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white"
              aria-label="Toggle contrast theme"
            >
              {highContrast ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-400" />}
              <span>{highContrast ? "NORMAL" : "CONTRAST"}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 font-bold text-[11px] pl-2 border-l border-neutral-800">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <button onClick={() => setLanguage("PT")} className={`hover:text-white ${language === "PT" ? "text-amber-400 underline" : "text-slate-400"}`}>PT</button>
              <span className="text-neutral-700">|</span>
              <button onClick={() => setLanguage("EN")} className={`hover:text-white ${language === "EN" ? "text-amber-400 underline" : "text-slate-400"}`}>EN</button>
            </div>
          </div>
        </div>
      </div>

      {/* LUXURIOUS FLOATING STICKY HEADER */}
      <header 
        className="sticky top-0 z-40 transition-all duration-300 w-full bg-[#B5121B] text-white shadow-xl py-4"
        id="navbar-site"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#portal-root" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border-2 border-[#D4AF37] p-1 shadow-md transform group-hover:scale-105 transition duration-300">
              <img 
                src={images.mplaLogo} 
                alt="MPLA Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base tracking-tight leading-none text-white">
                MPLA • ÁFRICA DO SUL
              </h2>
              <p className="text-[9px] text-[#D4AF37] font-mono font-black tracking-widest mt-1 uppercase">
                {language === "PT" ? "UNIDADE, LUTA, PROGRESSO" : "UNITY, STRUGGLE, PROGRESS"}
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest text-slate-100">
            {/* SOBRE DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setShowSobreDropdown(true)}
              onMouseLeave={() => setShowSobreDropdown(false)}
            >
              <button 
                className="hover:text-amber-300 transition flex items-center gap-1 py-2 font-bold uppercase tracking-widest text-xs cursor-pointer bg-transparent border-0 text-slate-100"
              >
                {language === "PT" ? "Sobre" : "About"}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showSobreDropdown ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {showSobreDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-1 w-48 bg-slate-900 border border-neutral-800 rounded-xl shadow-2xl p-2 flex flex-col z-50 text-left"
                  >
                    <a 
                      href="#about" 
                      onClick={() => setShowSobreDropdown(false)}
                      className="px-3 py-2 text-xs font-bold text-slate-100 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
                    >
                      MPLA
                    </a>
                    <a 
                      href="#jmpla" 
                      onClick={() => setShowSobreDropdown(false)}
                      className="px-3 py-2 text-xs font-bold text-slate-100 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
                    >
                      JMPLA
                    </a>
                    <a 
                      href="#oma" 
                      onClick={() => setShowSobreDropdown(false)}
                      className="px-3 py-2 text-xs font-bold text-slate-100 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
                    >
                      OMA
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#leadership" className="hover:text-amber-300 transition">{language === "PT" ? "Liderança" : "Leaders"}</a>
            <a href="#dashboard" className="hover:text-amber-300 transition">{language === "PT" ? "Painel" : "Dashboard"}</a>
            <a href="#news" className="hover:text-amber-300 transition">{language === "PT" ? "Notícias" : "News"}</a>
            <a href="#events" className="hover:text-amber-300 transition">{language === "PT" ? "Eventos" : "Events"}</a>
            <a href="#gallery" className="hover:text-amber-300 transition">{language === "PT" ? "Galeria" : "Gallery"}</a>
            <a href="#membership" className="hover:text-amber-300 transition">{language === "PT" ? "Filiação" : "Join"}</a>
            <a href="#contact" className="hover:text-amber-300 transition">{language === "PT" ? "Contacto" : "Contact"}</a>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigateToAuth("signin")}
              className="px-4 py-2 text-xs font-bold bg-amber-400 text-slate-950 rounded-xl hover:bg-amber-300 transition cursor-pointer shadow-md"
            >
              {language === "PT" ? "Entrar" : "Login"}
            </button>
            <button 
              onClick={() => setShowDonationModal(true)}
              className="px-4 py-2 text-xs font-bold bg-[#D4AF37] text-slate-950 hover:bg-yellow-500 rounded-xl transition shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              {language === "PT" ? "Doar" : "Donate"}
            </button>
          </div>
        </div>
      </header>

      {/* 100VH CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center text-white" id="hero-slider">
        {/* Carousel Background with Crossfades & Ken Burns effect */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={heroSlides[currentSlide].image} 
                alt="MPLA CAPE background" 
                className="w-full h-full object-cover opacity-35"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          {/* Deep Luxurious Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-[#B5121B]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-16">
          <div className="lg:col-span-8 text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]"
            >
              <Sparkle className="w-3.5 h-3.5 animate-spin" />
              {language === "PT" ? "Delegação Oficial África do Sul" : "Official Diáspora Delegation"}
            </motion.div>

            {/* Giant Bold Typography Animated Reveal */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white max-w-4xl drop-shadow-xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                {language === "PT" ? heroSlides[currentSlide].title_pt : heroSlides[currentSlide].title_en}
              </span>
            </h1>

            <motion.p 
              key={currentSlide + "-p"}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg text-slate-300 font-light max-w-xl leading-relaxed"
            >
              {language === "PT" ? heroSlides[currentSlide].sub_pt : heroSlides[currentSlide].sub_en}
            </motion.p>

            <div className="flex flex-wrap gap-4 pt-3">
              <button 
                onClick={() => onNavigateToAuth("signup")}
                className="px-6 py-3.5 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs rounded-xl tracking-widest uppercase transition-all shadow-xl shadow-red-900/40 hover:shadow-red-900/60 flex items-center gap-2 cursor-pointer"
              >
                {language === "PT" ? "Torne-se Militante" : "Become a Member"}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#about"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-xl tracking-widest uppercase transition"
              >
                {language === "PT" ? "Explorar Nosso Trabalho" : "Explore Our Work"}
              </a>
            </div>
          </div>

          {/* Floating live stats with beautiful grid layout */}
          <div className="lg:col-span-4 bg-slate-900/75 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5121B]/10 rounded-full blur-2xl" />
            <p className="text-[9px] font-mono font-black uppercase text-[#D4AF37] tracking-widest border-b border-white/5 pb-2.5 mb-4">
              {language === "PT" ? "DADOS INSTITUCIONAIS • REGISTO" : "INSTITUTIONAL METRICS • REGISTRY"}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block mb-1">{language === "PT" ? "Membros Registados" : "Registered Members"}</span>
                <span className="text-2xl font-black text-white block">15,000+</span>
                <span className="text-[9px] text-emerald-400 font-mono">▲ +12% / 2026</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block mb-1">{language === "PT" ? "Ações Sociais" : "Community Progs"}</span>
                <span className="text-2xl font-black text-[#D4AF37] block">350+</span>
                <span className="text-[9px] text-slate-400 font-mono">Provinces-wide</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-slate-400 text-[10px] uppercase block mb-1">{language === "PT" ? "Eventos Realizados" : "Events Conducted"}</span>
                <span className="text-2xl font-black text-white block">120+</span>
                <span className="text-[9px] text-slate-400 font-mono">Anual / Annual</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <span className="text-slate-400 text-[10px] uppercase block mb-1">{language === "PT" ? "Anos de Trabalho" : "Years of Support"}</span>
                <span className="text-2xl font-black text-[#D4AF37] block">25+</span>
                <span className="text-[9px] text-slate-400 font-mono">Em Diáspora</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-80">
          <span className="text-[9px] font-mono tracking-widest uppercase text-slate-400">
            {language === "PT" ? "Deslize para Entrar" : "Scroll to Enter"}
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </section>

      {/* GLOBAL SEARCH SECTION */}
      <section className="relative z-20 max-w-2xl mx-auto px-6 -mt-8 mb-16" id="site-search">
        <div className="relative shadow-2xl rounded-2xl">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchAutocomplete(true);
            }}
            onFocus={() => setShowSearchAutocomplete(true)}
            placeholder={language === "PT" ? "Pesquisar notícias, eventos, documentos, ajuda..." : "Search news, events, documents, support..."}
            className={`w-full pl-12 pr-4 py-3.5 border rounded-2xl shadow-lg text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-[#B5121B] transition ${
              highContrast ? "bg-[#111111] border-neutral-700 text-white" : "bg-white border-slate-200 text-slate-800"
            }`}
          />
          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {showSearchAutocomplete && searchQuery && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-neutral-800 rounded-xl shadow-2xl z-50 p-2 text-left max-h-60 overflow-y-auto"
              >
                <p className="text-[9px] font-mono uppercase text-[#D4AF37] px-3 py-1 font-black">Suggested Results:</p>
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <a 
                      key={idx} 
                      href={result.link}
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchAutocomplete(false);
                      }}
                      className="flex justify-between items-center px-3 py-2 hover:bg-slate-800 rounded-lg transition"
                    >
                      <span className="text-xs text-white font-medium">{language === "PT" ? result.text_pt : result.text_en}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </a>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 px-3 py-2">No results matching "{searchQuery}"</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* PRESIDENT'S WELCOME (A WOW FEATURE) */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-left" id="president-message">
        <div className={`p-8 sm:p-12 rounded-3xl border ${
          highContrast ? "bg-[#111111] border-neutral-800 text-white" : "bg-white border-slate-200"
        } shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}>
          <div className="absolute top-0 left-0 w-2 h-full bg-[#B5121B]" />
          
          {/* Portrait and play trigger */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl">
              <img 
                src="/src/assets/images/mpla_presidents_collage_1784384603231.jpg" 
                alt={language === "PT" ? "Presidentes Históricos do MPLA" : "Historic MPLA Presidents"} 
                className="w-full h-[380px] object-cover filter brightness-95 group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Play video overlay trigger */}
              <button 
                onClick={() => setShowVideoModal(true)}
                className="absolute inset-0 m-auto w-16 h-16 bg-[#B5121B]/90 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition transform hover:scale-110 active:scale-95"
                title="Assistir Mensagem de Boas-Vindas"
              >
                <Play className="w-7 h-7 fill-current ml-1 text-white" />
              </button>
            </div>
          </div>

          {/* Letter and signature */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 px-3 py-1 rounded-full border border-red-100">
              {language === "PT" ? "MENSAGEM DO PRESIDENTE DO COMITÉ" : "MESSAGE FROM THE COMMITTEE PRESIDENT"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {language === "PT" ? "Liderança Que Inspira. Serviço Que Transforma." : "Leadership That Inspires. Service That Matters."}
            </h2>
            <p className="text-slate-600 leading-relaxed font-light text-sm italic border-l-4 border-[#D4AF37] pl-4">
              "{language === "PT" 
                ? "Benvindo ao portal cívico unificado dos militantes e amigos do MPLA na África do Sul. A nossa missão é aproximar cada angolano, fornecer representação autêntica, e contribuir diretamente para o desenvolvimento do nosso país." 
                : "Welcome to the unified civic portal of MPLA members and friends in Diáspora. Our goal is to bring every Angolan closer, provide authentic representation, and contribute directly to the development of our country."}"
            </p>
            <p className="text-slate-500 leading-relaxed text-xs">
              {language === "PT"
                ? "Estamos focados em modernizar a nossa coordenação através de recursos digitais, apoio consular estruturado e programas sociais inovadores voltados para a formação de jovens, solidariedade de género e atracção de investimentos comerciais."
                : "We are focused on modernizing our coordination via advanced digital tools, structured consular backup and community programs aimed at training the youth, reinforcing gender equality and driving bilateral investments."}
            </p>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">Camarada Dr. Manuel Diogo</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  {language === "PT" ? "Presidente do Comité de Coordenação Nacional" : "President of the National Coordination Committee"}
                </p>
              </div>
              {/* handwritten simulation signature in gold */}
              <div className="text-[#D4AF37] font-serif italic text-2xl tracking-wider select-none pr-4">
                Manuel Diogo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION: TWO-COLUMN TABS */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-left" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Cinematic Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80" 
                alt="MPLA general assembly conference" 
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#D4AF37] text-slate-950 p-5 rounded-2xl shadow-xl flex items-center gap-4">
              <Trophy className="w-8 h-8 text-slate-950" />
              <div>
                <p className="text-2xl font-black leading-none">20+</p>
                <p className="text-[9px] font-mono uppercase font-black tracking-widest mt-0.5">Anos de Diáspora Ativa</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision, Values Tab Display */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              {language === "PT" ? "A NOSSA IDENTIDADE INSTITUCIONAL" : "OUR INSTITUTIONAL IDENTITY"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === "PT" ? "Unindo a Diáspora Angolana com Visão de Futuro" : "Unifying the Angolan Diaspora with a Vision for the Future"}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {language === "PT" 
                ? "Como representação cívica e política unificada, apoiamos os imigrantes angolanos na sua regularização e inserção digna na sociedade sul-africana, ao mesmo tempo que cultivamos os valores patrióticos."
                : "As a unified civic and political representation body, we support Angolan immigrants in their formal integration into Diásporan society, while preserving patriotic cultural values."}
            </p>

            {/* Tab Controls */}
            <div className="flex border-b border-slate-200">
              {["mission", "vision", "values"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAboutTab(tab as any)}
                  className={`py-2 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer ${
                    aboutTab === tab 
                      ? "border-[#B5121B] text-[#B5121B]" 
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="min-h-32 bg-slate-100/50 p-5 rounded-2xl border border-slate-200">
              {aboutTab === "mission" && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>{language === "PT" ? "Missão:" : "Mission:"}</strong>{" "}
                  {language === "PT" 
                    ? "Unir a diáspora angolana na África do Sul sob os princípios de solidariedade, legalidade e participação cívica ativa, atuando como o canal oficial que faz ouvir a voz de nossos militantes na pátria."
                    : "To unite the Angolan diaspora in Diáspora under the principles of solidarity, legality and active citizenship, serving as the official channel to let the voice of our members be heard."}
                </p>
              )}
              {aboutTab === "vision" && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>{language === "PT" ? "Visão:" : "Vision:"}</strong>{" "}
                  {language === "PT"
                    ? "Ser reconhecido como o comitê de diáspora mais organizado, moderno e transparente da SADC, garantindo pleno suporte à integração académica e financeira de todas as famílias angolanas."
                    : "To be recognized as the most organized, modern and transparent diaspora committee in the SADC, ensuring full support for the academic and financial integration of all Angolan families."}
                </p>
              )}
              {aboutTab === "values" && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>{language === "PT" ? "Valores Primordiais:" : "Core Values:"}</strong>{" "}
                  {language === "PT"
                    ? "Solidariedade Social • Patriotismo Construtivo • Transparência Administrativa • Democracia Interna • Respeito Pelas Leis da África do Sul"
                    : "Social Solidarity • Constructive Patriotism • Administrative Transparency • Participatory Democracy • Absolute Respect for Diásporan Laws"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* JMPLA SHOWCASE SECTION */}
      <section className="py-20 text-left border-t border-slate-150 bg-[#FAF9F5] dark:bg-[#111] dark:border-neutral-800" id="jmpla">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Description & Initiatives */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30">
                {language === "PT" ? "JUVENTUDE DO PARTIDO" : "PARTY YOUTH WING"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                JMPLA
              </h2>
              <p className="text-sm font-semibold text-[#D4AF37] tracking-wider uppercase font-mono">
                {language === "PT" ? "Juventude do Movimento Popular de Libertação de Angola" : "Youth of the Popular Movement for the Liberation of Angola"}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-light">
                {language === "PT" 
                  ? "A JMPLA na África do Sul é o motor dinâmico que mobiliza, capacita e integra a juventude angolana na diáspora. Focamo-nos no desenvolvimento de líderes do amanhã, através de programas académicos, mentorias de carreira, eventos culturais e integração tecnológica."
                  : "JMPLA in Diáspora is the dynamic engine mobilizing, empowering, and integrating Angolan youth in the diaspora. We focus on developing the leaders of tomorrow through academic programs, career mentorship, cultural events, and technological integration."}
              </p>

              {/* Grid of Initiatives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 bg-[#D4AF37]/15 rounded-lg flex items-center justify-center mb-3">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                    {language === "PT" ? "Suporte Académico" : "Academic Support"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {language === "PT" 
                      ? "Aconselhamento universitário, auxílio com matrículas, bolsas de estudo locais e grupos de estudo."
                      : "University advisory, application assistance, local bursary coordination, and study groups."}
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 bg-[#B5121B]/15 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-4 h-4 text-[#B5121B]" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                    {language === "PT" ? "Liderança e Cidadania" : "Leadership & Citizenship"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {language === "PT" 
                      ? "Fóruns de debate, capacitação de quadros jovens e fortalecimento da consciência cívica e patriótica."
                      : "Debate forums, training of young leaders, and strengthening civic and patriotic awareness."}
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 bg-amber-500/15 rounded-lg flex items-center justify-center mb-3">
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                    {language === "PT" ? "Empreendedorismo" : "Entrepreneurship"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {language === "PT" 
                      ? "Networking de jovens profissionais, workshops práticos de negócios e incentivo a startups cívicas."
                      : "Young professionals networking, business workshops, and boosting civic-oriented startups."}
                  </p>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800 rounded-2xl shadow-xs">
                  <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center mb-3">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-1">
                    {language === "PT" ? "Cultura e Desporto" : "Culture & Sports"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {language === "PT" 
                      ? "Torneios de futebol comunitário, festivais culturais de música e dança integrando a pátria."
                      : "Community soccer tournaments, cultural music & dance festivals connecting to our homeland."}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => onNavigateToAuth("signup")}
                  className="px-6 py-3 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg shadow-red-900/10 hover:shadow-red-900/20 cursor-pointer"
                >
                  {language === "PT" ? "Filiar-me na JMPLA" : "Join JMPLA"}
                </button>
              </div>
            </div>

            {/* Right Column: Images Grid using User Provided JMPLA Images */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-lg h-80 group relative">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUaULF4VKz7AMPfCly9-Y4QQMctIz6BYkUBN80F38Q-w&s=10" 
                    alt="JMPLA Youth Event" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex items-end p-3">
                    <p className="text-[10px] text-slate-200 font-bold uppercase tracking-wider font-mono">
                      {language === "PT" ? "Organização e União" : "Organization & Unity"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 shadow-lg h-80 group relative">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dmmZOI1ueDakZtkqMPnmf0eiT0u1cSnhl0Y2VfhY9hQMfZ9Gld5iCJZv&s=10" 
                    alt="JMPLA Assembly" 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex items-end p-3">
                    <p className="text-[10px] text-slate-200 font-bold uppercase tracking-wider font-mono">
                      {language === "PT" ? "Liderança Jovem" : "Youth Leadership"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Banner Block with provided Logo */}
              <div className="bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shrink-0">
                  <img 
                    src="https://logowik.com/content/uploads/images/mpla-angola8253.logowik.com.webp" 
                    alt="MPLA Brand" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase">
                    {language === "PT" ? "Juventude do MPLA" : "MPLA Youth Wing"}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {language === "PT" ? "Por Angola ao encontro do futuro!" : "For Angola, towards the future!"}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OMA SHOWCASE SECTION */}
      <section className="py-20 text-left border-t border-slate-150 bg-white dark:bg-neutral-950 dark:border-neutral-800" id="oma">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Image Showcase using User Provided OMA Image */}
            <div className="lg:col-span-5 space-y-6 order-last lg:order-first">
              <div className="rounded-3xl overflow-hidden border-4 border-slate-50 dark:border-neutral-900 shadow-2xl h-[400px] group relative">
                <img 
                  src="https://shutterstock.com/editorial/image-editorial/O1Tbk617M9TbI32cODU5Ng==/delegates-popular-movement-liberation-angola-mpla-show-440nw-9876929i.jpg" 
                  alt="OMA Delegates and Supporters" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="px-2.5 py-1 bg-[#B5121B] text-white text-[9px] font-mono font-bold uppercase rounded-sm block mb-1.5 w-max">
                      {language === "PT" ? "DELEGADAS OMA" : "OMA DELEGATES"}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white">
                      {language === "PT" ? "Organização da Mulher Angolana na Diáspora" : "Organization of Angolan Women in Diaspora"}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Decorative Stats Strip */}
              <div className="grid grid-cols-3 gap-4 bg-slate-50 dark:bg-neutral-900/50 border border-slate-100 dark:border-neutral-800 p-4 rounded-2xl text-center">
                <div>
                  <span className="block text-lg font-black text-[#B5121B]">4,500+</span>
                  <span className="text-[9px] text-slate-500 font-semibold uppercase">{language === "PT" ? "Filiadas" : "Members"}</span>
                </div>
                <div>
                  <span className="block text-lg font-black text-[#D4AF37]">9</span>
                  <span className="text-[9px] text-slate-500 font-semibold uppercase">{language === "PT" ? "Comités" : "Committees"}</span>
                </div>
                <div>
                  <span className="block text-lg font-black text-slate-900 dark:text-white">100%</span>
                  <span className="text-[9px] text-slate-500 font-semibold uppercase">{language === "PT" ? "Dedicadas" : "Dedicated"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission and Programs */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono font-black uppercase text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {language === "PT" ? "EMANCIPAÇÃO DA MULHER" : "WOMEN EMANCIPATION"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                OMA
              </h2>
              <p className="text-sm font-semibold text-[#B5121B] tracking-wider uppercase font-mono">
                {language === "PT" ? "Organização da Mulher Angolana" : "Organization of Angolan Women"}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm font-light">
                {language === "PT" 
                  ? "A OMA é o pilar de solidariedade, igualdade e apoio social das famílias angolanas na África do Sul. A nossa missão reside em defender os direitos das mulheres, apoiar a inclusão financeira e garantir amparo direto a mães, crianças e compatriotas em situação de vulnerabilidade migratória."
                  : "OMA is the pillars of solidarity, equality, and social support for Angolan families in Diáspora. Our mission lies in defending women's rights, supporting financial inclusion, and providing direct welfare to mothers, children, and compatriots in vulnerable migration states."}
              </p>

              {/* Core Programs Stack */}
              <div className="space-y-3">
                <div className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-neutral-900/60 rounded-2xl border border-transparent hover:border-slate-150 transition">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/40 rounded-xl flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5">
                      {language === "PT" ? "Apoio e Assistência Social" : "Welfare & Social Assistance"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {language === "PT" 
                        ? "Distribuição de donativos alimentares, vestuário, agasalhos de inverno e auxílio médico voluntário para famílias imigrantes vulneráveis."
                        : "Distribution of food hampers, clothing, winter blankets, and volunteer medical backup for vulnerable immigrant families."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-neutral-900/60 rounded-2xl border border-transparent hover:border-slate-150 transition">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-950/40 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#B5121B]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5">
                      {language === "PT" ? "Empreendedorismo e Formação" : "Women Entrepreneurship & Training"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {language === "PT" 
                        ? "Aulas de costura, literacia financeira, workshops de culinária e incentivo à formalização de pequenos comércios comunitários."
                        : "Sewing classes, financial literacy, catering workshops, and support for formalizing small community-based retail trades."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-neutral-900/60 rounded-2xl border border-transparent hover:border-slate-150 transition">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-0.5">
                      {language === "PT" ? "Aconselhamento e Integração Legal" : "Advisory & Legal Integration"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {language === "PT" 
                        ? "Orientações práticas para mães solo sobre documentação de menores, processos consulares e inserção escolar regular de crianças."
                        : "Practical tips for single mothers on minors documentation, consular services, and formal school enrollment for children."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigateToAuth("signup")}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-yellow-500 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl transition shadow-lg cursor-pointer"
                >
                  {language === "PT" ? "Unir-se à OMA" : "Join OMA"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HORIZONTAL INTERACTIVE TIMELINE */}
      <section className="bg-slate-950 py-20 text-white text-left" id="timeline">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              {language === "PT" ? "LINHA DO TEMPO HISTÓRICA" : "HISTORICAL TIMELINE"}
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              {language === "PT" ? "A Nossa História, O Nosso Legado" : "Our Journey, Our Proud Legacy"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore os momentos e conquistas desde a fundação até aos desafios contemporâneos.
            </p>
          </div>

          {/* Timeline Bar Indicator */}
          <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#B5121B] to-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500" 
              style={{
                width: `${(timelineData.findIndex(d => d.year === activeYear) / (timelineData.length - 1)) * 100}%`
              }}
            />
            {timelineData.map((d) => (
              <button
                key={d.year}
                onClick={() => setActiveYear(d.year)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-all cursor-pointer ${
                  activeYear === d.year 
                    ? "bg-[#B5121B] text-white border-2 border-[#D4AF37] scale-110 shadow-lg" 
                    : "bg-neutral-900 text-slate-400 hover:text-white"
                }`}
              >
                {d.year}
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {timelineData.filter(d => d.year === activeYear).map((d) => (
                <motion.div
                  key={d.year}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-2xl items-center"
                >
                  <div className="md:col-span-5 rounded-2xl overflow-hidden h-48 border border-neutral-800 shadow-md">
                    <img src={d.image} alt={d.title_pt} className="w-full h-full object-cover" />
                  </div>
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase bg-amber-400/10 px-3 py-1 rounded">
                      {d.milestone}
                    </span>
                    <h3 className="text-xl font-bold text-white">{language === "PT" ? d.title_pt : d.title_en}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {language === "PT" ? d.desc_pt : d.desc_en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* LEADERSHIP EXECUTIVE SECTION */}
      <section className={`py-20 border-t border-b text-left ${highContrast ? "bg-black" : "bg-white"}`} id="leadership">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
                {language === "PT" ? "CORPO DE DIREÇÃO EXECUTIVA" : "EXECUTIVE LEADERSHIP BODY"}
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
                {language === "PT" ? "Liderança Unificada no Terreno" : "Unified Leadership on the Ground"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Conheça o corpo diretivo responsável do Comité de MPLA Cape Town.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: language === "PT" ? "Todos" : "All" },
                { key: "national", label: "Coordenação" },
                { key: "oma", label: "OMA" },
                { key: "jmpla", label: "JMPLA" }
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setLeadershipFilter(btn.key)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                    leadershipFilter === btn.key 
                      ? "bg-[#B5121B] text-white border-[#B5121B]" 
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.filter(l => leadershipFilter === "all" || l.committee === leadershipFilter).map((leader, idx) => (
              <div 
                key={idx}
                className="group bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-[#B5121B]/30 hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-200 border-b border-slate-200 shrink-0">
                  <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-90 transition duration-300 flex flex-col justify-end p-4">
                    <p className="text-[10px] text-amber-400 font-mono font-bold leading-relaxed mb-1">
                      {language === "PT" ? leader.role_pt : leader.role_en}
                    </p>
                    <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                      {language === "PT" ? leader.bio_pt : leader.bio_en}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between items-start gap-4 text-left">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{leader.name}</h4>
                    <p className="text-[10px] font-mono text-[#B5121B] font-bold uppercase tracking-wider mt-0.5">
                      {language === "PT" ? leader.role_pt : leader.role_en}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedLeader(leader)}
                    className="text-xs font-bold text-[#B5121B] group-hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {language === "PT" ? "Ver Perfil & Discurso" : "View Profile & Quote"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP DETAILS MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-12">
                <div className="sm:col-span-5 h-64 sm:h-full min-h-[300px] bg-slate-200">
                  <img src={selectedLeader.photo} alt={selectedLeader.name} className="w-full h-full object-cover" />
                </div>
                <div className="sm:col-span-7 p-6 space-y-4">
                  <span className="text-[10px] font-mono font-bold text-[#B5121B] uppercase bg-red-50 border border-red-100 px-3 py-1 rounded">
                    {selectedLeader.committee.toUpperCase()} DELEGATION
                  </span>
                  <h3 className="text-xl font-black text-slate-900">{selectedLeader.name}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {language === "PT" ? selectedLeader.role_pt : selectedLeader.role_en}
                  </p>
                  
                  <div className="border-t border-b border-slate-100 py-3 mt-4 space-y-2">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === "PT" ? selectedLeader.bio_pt : selectedLeader.bio_en}
                    </p>
                    <p className="text-xs italic font-medium text-slate-700 bg-amber-50 border-l-4 border-[#D4AF37] p-3 rounded-r-lg">
                      "{language === "PT" ? selectedLeader.speech_pt : selectedLeader.speech_en}"
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => alert(`Enviando email a ${selectedLeader.name}`)}
                      className="px-4 py-2 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs rounded-xl transition"
                    >
                      {language === "PT" ? "Contactar Oficial" : "Contact Officer"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMMUNITY IMPACT DASHBOARD & INTERACTIVE MAP */}
      <section className="py-20 text-left bg-slate-900 text-white border-t border-b border-white/5 relative overflow-hidden" id="dashboard">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B5121B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              {language === "PT" ? "DASHBOARD DE IMPACTO SOCIAL" : "SOCIAL IMPACT DASHBOARD"}
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              {language === "PT" ? "Transparência, Dados e Alcance" : "Transparency, Data and Footprint"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualização de dados sobre a filiação partidária e apoio às províncias sul-africanas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Interactive map representing Diáspora Provinces */}
            <div className="lg:col-span-4 bg-slate-950/50 p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <p className="text-[9px] font-mono font-black uppercase text-amber-400 tracking-wider mb-2">
                  {language === "PT" ? "MAPA INTERATIVO DE ATIVIDADES" : "INTERACTIVE ACTIVITIES MAP"}
                </p>
                <h4 className="text-lg font-extrabold text-white">
                  {language === "PT" ? "Células da SADC por Província" : "SADC Cells by Diáspora Province"}
                </h4>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  Clique ou selecione uma província para ver as estatísticas locais.
                </p>

                {/* Map Grid */}
                <div className="grid grid-cols-3 gap-2 my-6">
                  {Object.keys(provinceDetails).map((prov) => (
                    <button
                      key={prov}
                      onClick={() => setHoveredProvince(prov)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition cursor-pointer uppercase ${
                        hoveredProvince === prov 
                          ? "bg-[#B5121B] border-[#D4AF37] text-white shadow-lg" 
                          : "bg-slate-900 border-white/10 text-slate-400 hover:bg-slate-850"
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              {/* Province Details Card */}
              {hoveredProvince && (
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/5 space-y-2 mt-4">
                  <p className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">PROVINCIAL DELEGATE INFO</p>
                  <p className="text-sm font-extrabold text-white">{provinceDetails[hoveredProvince].name}</p>
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Militantes:</span>
                    <span className="font-bold text-[#D4AF37]">{provinceDetails[hoveredProvince].members}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Comitês de Ação (CAPs):</span>
                    <span className="font-bold text-[#D4AF37]">{provinceDetails[hoveredProvince].caps}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2 mt-2">
                    <strong>Projetos Ativos:</strong> {provinceDetails[hoveredProvince].projects}
                  </p>
                </div>
              )}
            </div>

            {/* Recharts infographics columns */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-mono font-black uppercase text-[#B5121B] tracking-wider mb-2">CRESCIMENTO HISTÓRICO</p>
                  <h4 className="text-sm font-extrabold text-white">Membros Registados em Diáspora</h4>
                </div>
                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={membershipGrowthData}>
                      <defs>
                        <linearGradient id="colorMemb" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B5121B" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#B5121B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: "#151515", border: "none" }} />
                      <Area type="monotone" dataKey="membros" stroke="#B5121B" strokeWidth={2} fillOpacity={1} fill="url(#colorMemb)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-mono font-black uppercase text-[#D4AF37] tracking-wider mb-2">DISTRIBUIÇÃO POR PROVÍNCIA</p>
                  <h4 className="text-sm font-extrabold text-white">Percentagem de Força do Comitê</h4>
                </div>
                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: "#151515", border: "none" }} />
                      <Bar dataKey="Membros" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AL JAZEERA-STYLE NEWS CENTER */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-left" id="news">
        {/* Al Jazeera Style Header Bar */}
        <div className="border-b-4 border-[#B5121B] pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-8 bg-amber-500 rounded-xs shrink-0 block" />
            <div>
              <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#B5121B]">
                {language === "PT" ? "IMPRENSA E COMUNICADOS OFICIAIS" : "OFFICIAL PRESS & COVERAGE"}
              </span>
              <h2 className="text-3xl font-serif font-black text-slate-950 tracking-tight mt-1">
                {language === "PT" ? "Notícias & Atualidades" : "News & Coverage"}
              </h2>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {language === "PT" ? "Última atualização: Hoje, 14:30" : "Last updated: Today, 14:30"}
          </div>
        </div>

        {/* AL JAZEERA BREAKING NEWS TICKER */}
        <div className="bg-slate-900 text-white rounded-xl overflow-hidden mb-8 border border-slate-800 p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-md">
          <div className="bg-[#B5121B] text-white px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 select-none">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {language === "PT" ? "Última Hora" : "Breaking News"}
          </div>
          <div className="flex-1 text-xs sm:text-xs text-slate-300 overflow-hidden font-medium py-1">
            <motion.div
              animate={{ x: [300, -900] }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="whitespace-nowrap inline-block"
            >
              {language === "PT" 
                ? "• Comité de Sandton conclui registo recorde de 500 novos militantes esta semana • Aulas gratuitas de Língua Portuguesa expandem para Western Cape • Gabinete de Apoio Consular inicia atendimento digital automatizado no próximo sábado • OMA planeia novos fóruns sociais"
                : "• Sandton Committee registers record 500 new members this week • Free Portuguese classes expanding to Western Cape next Monday • Consular Support Office begins automated digital ticketing service • OMA schedules social integration forum"}
            </motion.div>
          </div>
        </div>

        {/* 3-Column Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* COLUMN 1: THE LEAD EDITORIAL (6 Columns) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group">
            <div className="relative h-80 overflow-hidden bg-slate-100 shrink-0">
              <img 
                src={images.mplaSupportersBackground} 
                alt="MPLA digital registration campaign" 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-700 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-[#B5121B] text-white text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                {language === "PT" ? "DESTAQUE PRINCIPAL" : "TOP STORY"}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#B5121B] font-bold uppercase tracking-wider">
                  <span>{language === "PT" ? "ORGANIZAÇÃO" : "ORGANIZATION"}</span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  <span className="text-slate-400 font-normal">15 JUL 2026</span>
                </div>
                <h3 
                  onClick={() => setSelectedArticle({
                    title_pt: "Abertura Oficial do Recadastramento Digital e Atualização de Militantes na SADC",
                    title_en: "Official Launch of the Digital Membership Update and Registry Campaign across SADC",
                    category_pt: "ORGANIZAÇÃO",
                    category_en: "ORGANIZATION",
                    date: "15 Jul 2026",
                    readTime: "4 min read",
                    image: "/src/assets/images/mpla_supporters_background_1784328681804.jpg",
                    summary_pt: "O Comité de Coordenação Nacional da África do Sul lança uma infraestrutura segura para emissão do novo Cartão Digital de Militante com criptografia avançada de dados de apoio ao cidadão.",
                    summary_en: "The Diáspora National Coordination Committee has launched a secure infrastructure for issuing the new Digital Membership Card with advanced encryption backing.",
                    content_pt: "O Comité de Coordenação Nacional do MPLA na África do Sul deu início oficial à campanha de recadastramento digital e actualização de dados para todos os cidadãos angolanos residentes na região da SADC. Esta iniciativa pioneira visa modernizar a base de dados do partido, optimizando os canais de apoio consular, social e formativo na diáspora.\n\nAtravés de uma infraestrutura web encriptada, os militantes podem agora atualizar os seus dados demográficos, submeter documentação e solicitar a emissão do novo Cartão Digital de Militante. O cartão inclui um código QR único que facilita a verificação em assembleias oficiais, além de garantir o acesso a múltiplos programas sociais integrados de apoio à comunidade angolana.\n\n\"Esta transição para o ecossistema digital representa um passo firme em direcção à transparência organizativa e à proximidade com a nossa comunidade\", sublinhou o Coordenador Nacional durante o acto de lançamento em Sandton. O processo decorre de forma contínua através do portal oficial ou junto das brigadas móveis provinciais.",
                    content_en: "The MPLA National Coordination Committee in Diáspora has officially commenced the digital registry and database update campaign for all Angolan citizens residing in the SADC region. This pioneering initiative aims to modernize the party's database, optimizing consular, social, and educational support channels in the diaspora.\n\nThrough an encrypted web infrastructure, members can now update their demographic information, submit documentation, and request the issuance of the new Digital Member Card. The card features a unique QR code to facilitate verification at official assemblies, while securing access to multiple social programs integrated for the Angolan community.\n\n\"This transition to a digital ecosystem represents a firm step towards organizational transparency and absolute proximity to our community,\" highlighted the National Coordinator during the launch ceremony in Sandton. The process is continuous and accessible through the official portal or provincial mobile brigades."
                  })}
                  className="text-2xl font-serif font-black text-slate-900 hover:text-[#B5121B] transition cursor-pointer leading-tight tracking-tight"
                >
                  {language === "PT" 
                    ? "Abertura Oficial do Recadastramento Digital e Atualização de Militantes na SADC"
                    : "Official Launch of the Digital Membership Update and Registry Campaign across SADC"}
                </h3>
                <p className="text-slate-600 text-xs sm:text-xs leading-relaxed font-light line-clamp-3">
                  {language === "PT"
                    ? "O Comité de Coordenação Nacional da África do Sul lança uma infraestrutura segura para emissão do novo Cartão Digital de Militante com criptografia avançada de dados de apoio ao cidadão angolano."
                    : "The Diáspora National Coordination Committee has launched a secure infrastructure for issuing the new Digital Membership Card with advanced encryption backing."}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <button 
                  onClick={() => setSelectedArticle({
                    title_pt: "Abertura Oficial do Recadastramento Digital e Atualização de Militantes na SADC",
                    title_en: "Official Launch of the Digital Membership Update and Registry Campaign across SADC",
                    category_pt: "ORGANIZAÇÃO",
                    category_en: "ORGANIZATION",
                    date: "15 Jul 2026",
                    readTime: "4 min read",
                    image: "/src/assets/images/mpla_supporters_background_1784328681804.jpg",
                    summary_pt: "O Comité de Coordenação Nacional da África do Sul lança uma infraestrutura segura para emissão do novo Cartão Digital de Militante com criptografia avançada de dados de apoio ao cidadão.",
                    summary_en: "The Diáspora National Coordination Committee has launched a secure infrastructure for issuing the new Digital Membership Card with advanced encryption backing.",
                    content_pt: "O Comité de Coordenação Nacional do MPLA na África do Sul deu início oficial à campanha de recadastramento digital e actualização de dados para todos os cidadãos angolanos residentes na região da SADC. Esta iniciativa pioneira visa modernizar a base de dados do partido, optimizando os canais de apoio consular, social e formativo na diáspora.\n\nAtravés de uma infraestrutura web encriptada, os militantes podem agora atualizar os seus dados demográficos, submeter documentação e solicitar a emissão do novo Cartão Digital de Militante. O cartão inclui um código QR único que facilita a verificação em assembleias oficiais, além de garantir o acesso a múltiplos programas sociais integrados de apoio à comunidade angolana.\n\n\"Esta transição para o ecossistema digital representa um passo firme em direcção à transparência organizativa e à proximidade com a nossa comunidade\", sublinhou o Coordenador Nacional durante o acto de lançamento em Sandton. O processo decorre de forma contínua através do portal oficial ou junto das brigadas móveis provinciais.",
                    content_en: "The MPLA National Coordination Committee in Diáspora has officially commenced the digital registry and database update campaign for all Angolan citizens residing in the SADC region. This pioneering initiative aims to modernize the party's database, optimizing consular, social, and educational support channels in the diaspora.\n\nThrough an encrypted web infrastructure, members can now update their demographic information, submit documentation, and request the issuance of the new Digital Member Card. The card features a unique QR code to facilitate verification at official assemblies, while securing access to multiple social programs integrated for the Angolan community.\n\n\"This transition to a digital ecosystem represents a firm step towards organizational transparency and absolute proximity to our community,\" highlighted the National Coordinator during the launch ceremony in Sandton. The process is continuous and accessible through the official portal or provincial mobile brigades."
                  })}
                  className="font-black text-[#B5121B] hover:text-red-700 flex items-center gap-1 cursor-pointer uppercase tracking-wider text-[11px]"
                >
                  {language === "PT" ? "Ler Comunicado Integro" : "Read Full Story"}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[10px]">4 min read</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link da notícia copiado!");
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: SECONDARY RECENT NEWS FEED (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col gap-6 justify-between border-l border-r border-slate-200/60 px-0 lg:px-6 text-left">
            {[
              {
                title_pt: "Sucesso no Fórum de Negócios e Empreendedorismo Diáspora em Sandton",
                title_en: "Success at the Diaspora Business and Entrepreneurship Forum in Sandton",
                desc_pt: "Mais de 250 empresários debateram o comércio SADC e oportunidades de co-investimento no mercado angolano.",
                desc_en: "Over 250 business owners discussed SADC trade frameworks and co-investment in the Angolan domestic market.",
                category_pt: "ECONOMIA",
                category_en: "ECONOMY",
                date: "10 Jul 2026",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
                readTime: "3 min read",
                content_pt: "O fórum realizado no prestigiado centro de convenções de Sandton reuniu mais de 250 líderes empresariais, investidores e jovens empreendedores de origem angolana e sul-africana. Sob o lema \"Investir na Diáspora, Fortalecer a Nação\", os participantes exploraram sinergias comerciais cruciais no âmbito do acordo de livre comércio regional da SADC.\n\nDurante as sessões plenárias, foram discutidos incentivos fiscais para o repatriamento de capital de investimento, mecanismos de facilitação aduaneira e o papel estratégico da classe empresarial angolana na transferência de tecnologias inovadoras para o mercado doméstico.",
                content_en: "The forum held at the prestigious Sandton Convention Center gathered more than 250 business leaders, investors, and young entrepreneurs of Angolan and Diásporan origin. Under the theme \"Investing in the Diaspora, Strengthening the Nation,\" participants explored crucial commercial synergies within the framework of the SADC regional free trade agreement.\n\nDuring the plenary sessions, fiscal incentives for investment capital repatriation, customs facilitation mechanisms, and the strategic role of the Angolan business class in transferring innovative technologies back home were thoroughly discussed."
              },
              {
                title_pt: "Delegação OMA Realiza Donativos de Apoio Alimentar em Soweto",
                title_en: "OMA Delegation Completes Direct Food Relief Aid in Soweto",
                desc_pt: "Famílias de imigrantes vulneráveis receberam cabazes básicos e assistência jurídica sobre vistos sul-africanos.",
                desc_en: "Vulnerable immigrant families received essential grocery parcels and primary legal visa assistance.",
                category_pt: "COMUNIDADE",
                category_en: "COMMUNITY",
                date: "04 Jul 2026",
                image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
                readTime: "3 min read",
                content_pt: "A delegação da Organização da Mulher Angolana (OMA) realizou uma importante acção humanitária e cívica na comunidade de Soweto, beneficiando dezenas de famílias angolanas em situação de vulnerabilidade extrema. A iniciativa incluiu a distribuição de cabazes alimentares completos, cobertores para o período de inverno e kits de higiene básica.\n\nAlém do apoio material, a OMA disponibilizou uma equipa de assessoria jurídica voluntária para esclarecer dúvidas sobre os processos de regularização migratória, renovação de vistos temporários e encaminhamento de crianças para o sistema de ensino sul-africano.",
                content_en: "The delegation of the Organization of Angolan Women (OMA) carried out a significant humanitarian and civic action in the Soweto community, benefiting dozens of Angolan families facing extreme vulnerability. The initiative included distributing comprehensive food parcels, blankets for winter, and basic hygiene kits.\n\nAlongside material support, OMA provided a volunteer legal advisory team to clarify procedures regarding immigration regularization, temporary visa renewals, and enrolling children in the Diásporan education system."
              }
            ].map((newsItem, index) => (
              <div 
                key={index} 
                className="group flex flex-col justify-between h-[48%] border-b border-slate-100 pb-5 last:border-0 last:pb-0 text-left"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#B5121B] font-bold uppercase">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      {language === "PT" ? newsItem.category_pt : newsItem.category_en}
                    </span>
                    <span className="text-slate-400 font-normal">{newsItem.date}</span>
                  </div>
                  <h4 
                    onClick={() => setSelectedArticle(newsItem)}
                    className="font-serif font-black text-slate-900 text-sm leading-snug hover:text-[#B5121B] cursor-pointer transition line-clamp-3"
                  >
                    {language === "PT" ? newsItem.title_pt : newsItem.title_en}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 font-light">
                    {language === "PT" ? newsItem.desc_pt : newsItem.desc_en}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedArticle(newsItem)}
                  className="mt-3 text-[10px] font-black text-[#B5121B] hover:text-red-700 flex items-center gap-1 cursor-pointer uppercase tracking-wider"
                >
                  {language === "PT" ? "Ver Artigo" : "Read More"}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* COLUMN 3: AL JAZEERA iconic "MOST READ & OPINION" (3 Columns) */}
          <div className="lg:col-span-3 flex flex-col space-y-6 text-left">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
                  <h4 className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider">
                    {language === "PT" ? "Destaques e Opinião" : "Trending & Opinion"}
                  </h4>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      id: "trend-1",
                      rank: "01",
                      title_pt: "O Impacto do Novo Estatuto da Diáspora nas Próximas Eleições Nacionais",
                      title_en: "The Impact of the New Diaspora Statute on the Upcoming National Elections",
                      author: "Dr. Adelino Chipanzenda",
                      authorTitle_pt: "Cientista Político e Assessor",
                      authorTitle_en: "Political Scientist & Advisor",
                      content_pt: "O novo estatuto da diáspora angolana estabelece marcos regulatórios sem precedentes, assegurando direitos políticos plenos e facilitando canais de cooperação financeira direta que remodelarão a participação cívica externa.",
                      content_en: "The new statute for the Angolan diaspora establishes unprecedented regulatory frameworks, ensuring full political rights and streamlining direct financial channels."
                    },
                    {
                      id: "trend-2",
                      rank: "02",
                      title_pt: "A Integração dos Médicos Angolanos no Sistema de Saúde da África do Sul",
                      title_en: "Integrating Angolan Doctors into the Diásporan Healthcare System",
                      author: "Dra. Elisa dos Santos",
                      authorTitle_pt: "Coordenadora de Saúde e Bem-estar",
                      authorTitle_en: "Health & Wellbeing Coordinator",
                      content_pt: "Iniciativas conjuntas estão a abrir novas frentes para validação célere de habilitações profissionais, mitigando constrangimentos regulatórios e integrando médicos angolanos de forma produtiva.",
                      content_en: "Joint initiatives are setting new pathways for rapid qualification validations, bypassing historic regulatory bottlenecks."
                    },
                    {
                      id: "trend-3",
                      rank: "03",
                      title_pt: "Estratégias de Apoio Consular: Como Reduzir os Tempos de Espera de Passaportes",
                      title_en: "Consular Support Strategies: How to Reduce Passport Wait Times",
                      author: "Militante Manuel Neto",
                      authorTitle_pt: "Especialista em Administração Pública",
                      authorTitle_en: "Public Administration Specialist",
                      content_pt: "A digitalização dos fluxos consulares promete encurtar em até 60% os prazos de renovação e entrega de passaportes para todos os angolanos residentes nas províncias de Gauteng e KwaZulu-Natal.",
                      content_en: "Digitization of consular workflows is set to slash passport processing timelines by up to 60% for citizens across Gauteng."
                    }
                  ].map((trend, i) => (
                    <div 
                      key={trend.id} 
                      className="group flex gap-3 text-left border-b border-slate-100 last:border-0 pb-3 last:pb-0"
                    >
                      <span className="text-xl font-serif font-black text-amber-500/80 tracking-tighter shrink-0">
                        {trend.rank}
                      </span>
                      <div className="space-y-1">
                        <h5 
                          onClick={() => setSelectedArticle({
                            title_pt: trend.title_pt,
                            title_en: trend.title_en,
                            category_pt: "OPINIÃO",
                            category_en: "OPINION",
                            date: "Hoje / Today",
                            readTime: "3 min read",
                            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
                            summary_pt: trend.content_pt,
                            summary_en: trend.content_en,
                            content_pt: `Artigo de Opinião assinado por ${trend.author} (${trend.authorTitle_pt}):\n\n${trend.content_pt}\n\nA participação ativa da nossa massa intelectual na diáspora sul-africana fortalece o prestígio e a competência organizativa das nossas instituições bilaterais, sedimentando canais inovadores de progresso mútuo e garantindo o retorno construtivo de conhecimentos à pátria mãe.`,
                            content_en: `Opinion article written by ${trend.author} (${trend.authorTitle_en}):\n\n${trend.content_en}\n\nThe active participation of our intellectual diaspora in Diáspora solidifies the prestige and organizational depth of our bilateral institutions, fostering academic exchange and patriotic engagement.`
                          })}
                          className="font-serif font-bold text-slate-800 text-xs sm:text-xs leading-snug hover:text-[#B5121B] cursor-pointer transition line-clamp-3"
                        >
                          {language === "PT" ? trend.title_pt : trend.title_en}
                        </h5>
                        <div className="text-[9px] text-slate-400 font-semibold font-mono">
                          {trend.author}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETFLIX-STYLE EVENTS SECTION */}
      <section className="bg-slate-950 text-white py-20 text-left" id="events">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                {language === "PT" ? "PRÓXIMAS ATIVIDADES REGIONAIS" : "UPCOMING REGIONAL EVENTS"}
              </span>
              <h2 className="text-3xl font-black text-white mt-3">
                {language === "PT" ? "Fóruns, Comícios e Workshops" : "Forums, Rallies and Workshops"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Acompanhe o cronograma de eventos em tempo real. Participe na sua província.
              </p>
            </div>
            <button 
              onClick={() => alert("Calendário oficial de eventos completo em desenvolvimento")}
              className="px-4 py-2 border border-white/10 text-white hover:border-[#D4AF37] hover:bg-white/5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              {language === "PT" ? "Ver Agenda Oficial Completa" : "View Official Calendar"}
            </button>
          </div>

          {/* Events horizontal scroll track */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventList.map((evt, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-[#D4AF37]/40 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
              >
                <div className="h-44 bg-neutral-850 overflow-hidden relative shrink-0">
                  <img src={evt.image} alt={evt.title_pt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Live countdown timer overlay */}
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    <span>COUNTDOWN: {eventCountdowns[idx] || "LOADING..."}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-white text-sm line-clamp-2 hover:text-[#D4AF37]">
                      {language === "PT" ? evt.title_pt : evt.title_en}
                    </h4>
                    <div className="space-y-1 text-slate-400 text-xs">
                      <p className="flex items-center gap-1.5 font-bold text-[#D4AF37]">
                        <Calendar className="w-3.5 h-3.5" />
                        {language === "PT" ? evt.date_pt : evt.date_en}
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        {evt.time}
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        {evt.location}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigateToAuth("signin")}
                    className="w-full py-2.5 bg-neutral-800 hover:bg-[#B5121B] text-white font-bold text-[11px] rounded-xl transition cursor-pointer uppercase tracking-wider"
                  >
                    {language === "PT" ? "Inscrever-me Gratuitamente" : "Register For Event"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY GALLERY (MASONRY PINTEREST GRID) */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-left" id="gallery">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              {language === "PT" ? "GALERIA DE ACTIVIDADES DA DIÁSPORA" : "DIASPORA ACTIVITIES GALLERY"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
              {language === "PT" ? "O Nosso Trabalho em Imagens" : "Our Commitment in Images"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Filtre as atividades sociais, culturais e institucionais realizadas pelas comissões provinciais.
            </p>
          </div>

          {/* Gallery Category Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label_pt: "Todos", label_en: "All" },
              { key: "events", label_pt: "Conferências", label_en: "Conferences" },
              { key: "community", label_pt: "Solidariedade", label_en: "Solidarity" },
              { key: "leadership", label_pt: "Executivo", label_en: "Officers" },
              { key: "education", label_pt: "Educação", label_en: "Education" },
              { key: "culture", label_pt: "Cultura", label_en: "Culture" }
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setGalleryCategory(btn.key)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-xl uppercase tracking-wider border transition cursor-pointer ${
                  galleryCategory === btn.key 
                    ? "bg-[#B5121B] text-white border-[#B5121B]" 
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {language === "PT" ? btn.label_pt : btn.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Pinterest Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-slate-150 rounded-2xl overflow-hidden relative cursor-pointer border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 h-64"
            >
              <img src={img.url} alt={img.title_pt} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX GALLERY VIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              title="Close View"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative max-w-4xl w-full flex flex-col items-center gap-4">
              <div className="h-[60vh] max-h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={filteredGallery[lightboxIndex].url} 
                  alt="Membro do MPLA na África do Sul" 
                  className="w-full h-full object-contain"
                />
              </div>


              {/* Navigation arrows */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! - 1 + filteredGallery.length) % filteredGallery.length);
                  }}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition pointer-events-auto cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! + 1) % filteredGallery.length);
                  }}
                  className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition pointer-events-auto cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO BANNER / SPEECHES FEATURE */}
      <section className="relative w-full py-28 text-center text-white overflow-hidden bg-slate-950" id="video-section">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80" 
            alt="Militantes em conferência regional" 
            className="w-full h-full object-cover opacity-20 filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-[10px] font-mono font-black uppercase text-[#D4AF37] bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            {language === "PT" ? "MULTIMÉDIA E DISCURSOS DA PATRIA" : "MULTIMEDIA & HOMELAND KEY SPEECHES"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === "PT" ? "Assista nossos eventos Oficiais" : "Watch our Official Events"}
          </h2>
          <p className="text-slate-400 font-light text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {language === "PT" 
              ? "Confira os discursos oficiais e o resumo audiovisual dos projectos de acolhimento de famílias angolanas realizados em Joanesburgo e Pretória."
              : "Watch official speeches and the video summary detailing our support for Angolan families living in Johannesburg and Pretoria."}
          </p>

          <button 
            onClick={() => setShowVideoModal(true)}
            className="w-16 h-16 bg-[#B5121B] hover:bg-red-700 text-white rounded-full flex items-center justify-center m-auto shadow-2xl cursor-pointer transition transform hover:scale-110 active:scale-95"
            title="Launch Player"
          >
            <Play className="w-7 h-7 fill-current ml-1 text-white" />
          </button>
        </div>
      </section>

      {/* DOCUMENTARY PLAYER MODAL SIMULATION */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-[#111] rounded-3xl border border-neutral-800 max-w-3xl w-full overflow-hidden shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition z-10"
                title="Close Player"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/live_stream?channel=UCZHPr3QVs-CUMlxdTXmurgA"
                  title="MPLA Cape Town YouTube Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUSINESS BANKING & DONATIONS MODAL */}
      <AnimatePresence>
        {showDonationModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`max-w-xl w-full rounded-3xl border shadow-2xl relative overflow-hidden text-left ${
                highContrast ? "bg-[#111] border-neutral-800 text-white" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {/* Header styling */}
              <div className="p-6 pb-4 border-b border-slate-100 dark:border-neutral-800 flex justify-between items-start bg-[#B5121B] text-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-slate-950">
                    {language === "PT" ? "DADOS BANCÁRIOS OFICIAIS" : "OFFICIAL BANKING DETAILS"}
                  </span>
                  <h3 className="text-xl font-black mt-2">
                    {language === "PT" ? "Fundo de Apoio e Solidariedade" : "Support & Solidarity Fund"}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowDonationModal(false)}
                  className="p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {language === "PT" 
                    ? "As suas contribuições voluntárias e quotas apoiam diretamente os nossos programas sociais gratuitos, incluindo o Gabinete de Apoio Consular, as Aulas de Português, e a assistência a famílias em vulnerabilidade na África do Sul."
                    : "Your voluntary contributions and membership fees directly support our free social programs, including the Consular Support Office, Portuguese Classes, and assistance to vulnerable families in Diáspora."}
                </p>

                {/* Premium FNB Card Layout */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-neutral-800 rounded-2xl p-6 text-white shadow-xl">
                  {/* Subtle decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B5121B]/10 rounded-full blur-xl pointer-events-none" />

                  {/* FNB simulated logo */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">FIRST NATIONAL BANK (FNB)</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400/10 border border-amber-400/20 text-amber-300 rounded">
                      BUSINESS ACCOUNT
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Account Holder */}
                    <div className="flex justify-between items-center group">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                          {language === "PT" ? "Titular da Conta" : "Account Holder"}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-100">
                          MPLA COORDENACAO NACIONAL DELEGACAO
                        </span>
                      </div>
                      <button 
                        onClick={() => handleCopy("MPLA COORDENACAO NACIONAL DELEGACAO", "holder")}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-amber-400 cursor-pointer shrink-0"
                        title="Copy Account Holder"
                      >
                        {copiedField === "holder" ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Account Number */}
                    <div className="flex justify-between items-center group">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                          {language === "PT" ? "Número da Conta" : "Account Number"}
                        </span>
                        <span className="text-base font-black text-white font-mono tracking-wide">
                          62908472910
                        </span>
                      </div>
                      <button 
                        onClick={() => handleCopy("62908472910", "acc")}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition text-slate-400 hover:text-amber-400 cursor-pointer shrink-0"
                        title="Copy Account Number"
                      >
                        {copiedField === "acc" ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                      {/* Branch & Code */}
                      <div className="flex justify-between items-center group">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                            {language === "PT" ? "Agência / Código" : "Branch / Code"}
                          </span>
                          <span className="text-xs font-bold text-slate-100 font-mono">
                            Sandton City (254605)
                          </span>
                        </div>
                        <button 
                          onClick={() => handleCopy("254605", "branch")}
                          className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-amber-400 cursor-pointer shrink-0"
                          title="Copy Branch Code"
                        >
                          {copiedField === "branch" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* SWIFT / BIC */}
                      <div className="flex justify-between items-center group">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-slate-400 block tracking-wider">
                            SWIFT / BIC Code
                          </span>
                          <span className="text-xs font-bold text-slate-100 font-mono uppercase">
                            FIRNZAJJ
                          </span>
                        </div>
                        <button 
                          onClick={() => handleCopy("FIRNZAJJ", "swift")}
                          className="p-1 hover:bg-white/5 rounded text-slate-500 hover:text-amber-400 cursor-pointer shrink-0"
                          title="Copy SWIFT"
                        >
                          {copiedField === "swift" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reference Guideline */}
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4 space-y-1">
                  <p className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    {language === "PT" ? "IMPORTANTE: REFERÊNCIA DO DEPÓSITO" : "IMPORTANT: DEPOSIT REFERENCE"}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal font-light">
                    {language === "PT"
                      ? "Por favor, utilize o seu Nome Completo ou Número de Militante seguido de 'DOACAO' como referência (Ex: MANUEL NETO DOACAO) para permitir a conciliação e envio automático do recibo oficial."
                      : "Please use your Full Name or Member Number followed by 'DOACAO' as reference (e.g., MANUEL NETO DOACAO) to allow quick reconciliation and automatic official receipt delivery."}
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-6 pt-0 flex gap-3 border-t border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
                <button 
                  onClick={() => setShowDonationModal(false)}
                  className="w-full mt-4 py-2.5 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition cursor-pointer text-center"
                >
                  {language === "PT" ? "Concluído" : "Done"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AL JAZEERA ARTICLE READER MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`max-w-2xl w-full rounded-3xl border shadow-2xl relative overflow-hidden text-left flex flex-col max-h-[90vh] ${
                highContrast ? "bg-[#111] border-neutral-800 text-white" : "bg-white border-slate-100 text-slate-800"
              }`}
            >
              {/* Floating Top Banner like a News Wire */}
              <div className="bg-[#B5121B] text-white px-6 py-2.5 flex justify-between items-center shrink-0">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  AL JAZEERA STYLE MPLA COURIER
                </span>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-1 rounded-full bg-black/10 hover:bg-black/25 text-white transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Article Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[9px] font-mono font-black rounded-xs">
                      {language === "PT" ? selectedArticle.category_pt || "NOTÍCIAS" : selectedArticle.category_en || "NEWS"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{selectedArticle.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] font-mono text-slate-400">{selectedArticle.readTime || "3 min read"}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-950 dark:text-white leading-tight">
                    {language === "PT" ? selectedArticle.title_pt : selectedArticle.title_en}
                  </h3>

                  <p className="text-xs text-slate-500 italic border-l-2 border-amber-500 pl-3 leading-relaxed">
                    {language === "PT" ? selectedArticle.summary_pt || selectedArticle.desc_pt : selectedArticle.summary_en || selectedArticle.desc_en}
                  </p>
                </div>

                {selectedArticle.image && (
                  <div className="rounded-2xl overflow-hidden h-64 border border-slate-100 dark:border-neutral-800 shadow-sm shrink-0">
                    <img 
                      src={selectedArticle.image} 
                      alt="News Illustration" 
                      className="w-full h-full object-cover filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 font-serif whitespace-pre-line">
                  {language === "PT" ? selectedArticle.content_pt : selectedArticle.content_en}
                </div>
              </div>

              {/* Share and Bottom Action Bar */}
              <div className="p-6 pt-4 border-t border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex justify-between items-center shrink-0">
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(language === "PT" ? selectedArticle.title_pt : selectedArticle.title_en);
                      alert("Título do artigo copiado!");
                    }}
                    className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg text-slate-600 dark:text-slate-300 text-[10px] font-bold hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#B5121B]" />
                    {language === "PT" ? "Partilhar" : "Share"}
                  </button>
                  <button 
                    onClick={() => {
                      alert(language === "PT" ? "Iniciando download do comunicado em PDF..." : "Initiating statement PDF download...");
                    }}
                    className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg text-slate-600 dark:text-slate-300 text-[10px] font-bold hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-500" />
                    PDF
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-1.5 bg-[#B5121B] hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition cursor-pointer"
                >
                  {language === "PT" ? "Fechar Leitor" : "Close Reader"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LUXURY TESTIMONIALS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-left" id="testimonials">
        <div className="bg-slate-50 p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/5 rounded-full blur-2xl" />
          
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
              {language === "PT" ? "TESTEMUNHOS REAIS DE MILITANTES" : "REAL FEEDBACK FROM MEMBERS"}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
              {language === "PT" ? "A Voz da Nossa Comunidade" : "The Voice of Our Community"}
            </h2>
          </div>

          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <p className="text-lg sm:text-2xl text-slate-700 leading-relaxed font-light italic font-serif">
                  "{language === "PT" ? testimonials[activeTestimonial].quote_pt : testimonials[activeTestimonial].quote_en}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                  <img src={testimonials[activeTestimonial].image} alt={testimonials[activeTestimonial].author} className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{testimonials[activeTestimonial].author}</h5>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                      {language === "PT" ? testimonials[activeTestimonial].role_pt : testimonials[activeTestimonial].role_en}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonials controls */}
            <div className="flex items-center gap-2 pt-6 mt-6 border-t border-slate-150">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3.5 h-1.5 rounded-full transition cursor-pointer ${
                    activeTestimonial === index ? "bg-[#B5121B] w-6" : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONAL MEMBERSHIP SECTION */}
      <section className="bg-slate-900 text-white py-20 text-center relative overflow-hidden border-t border-b border-white/5" id="membership">
        <div className="absolute inset-0 z-0">
          <img 
            src={images.mplaSupportersBackground} 
            alt="Militantes do MPLA África do Sul" 
            className="w-full h-full object-cover opacity-15 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-[#B5121B]/40" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            {language === "PT" ? "CADASTRO UNIFICADO DA DIÁSPORA" : "UNIFIED DIASPORA MEMBERSHIP"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === "PT" ? "Faça Parte da Nossa Força de Progresso" : "Be Part of Our Force for Progress"}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {language === "PT"
              ? "A sua filiação garante representação autêntica, acesso instantâneo ao seu Cartão Digital com chip virtual criptografado e amparo social nas delegações sul-africanas."
              : "Your membership guarantees authentic representation, instant access to your secure Digital Member Card and structural social support."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto my-8 text-left text-xs text-slate-300 bg-slate-950/60 p-6 rounded-2xl border border-white/5">
            <div className="flex items-start gap-2.5">
              <Check className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
              <span>{language === "PT" ? "Emissão de Cartão Digital Oficial com QR Code" : "Issuance of Official Digital Card with QR Code"}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
              <span>{language === "PT" ? "Acesso ao Gabinete de Apoio Jurídico e Documental" : "Access to the Free Legal & Visa Assistance Helpdesk"}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
              <span>{language === "PT" ? "Cursos Gratuitos de Língua Portuguesa e História" : "Free Saturday Portuguese & National History Classes"}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
              <span>{language === "PT" ? "Mentoria de Redes de Negócios e Bolsas JMPLA" : "Business Network Mentorship & Student Bursaries"}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onNavigateToAuth("signup")}
              className="px-6 py-3 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs rounded-xl transition tracking-wider uppercase shadow-xl"
            >
              {language === "PT" ? "Registrar-me Hoje" : "Register Now"}
            </button>
            <button 
              onClick={() => onNavigateToAuth("signin")}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl transition tracking-wider uppercase"
            >
              {language === "PT" ? "Já sou Militante" : "I am already a Member"}
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION: SPLIT LAYOUT WITH CUSTOM INTERACTIVE MAP */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact">
        {/* Left column: Physical Office and map */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#B5121B]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-6">
            <span className="text-[10px] font-mono font-black text-amber-400 tracking-wider uppercase block">
              {language === "PT" ? "DELEGAÇÃO SEDE EM SANDTON" : "SED CENTRAL IN SANDTON"}
            </span>
            <h3 className="text-2xl font-black">
              {language === "PT" ? "Nossa Sede em Joanesburgo" : "Our Johannesburg Office"}
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === "PT" 
                ? "Visite o nosso gabinete principal de coordenação consular e atendimento às famílias na África do Sul."
                : "Visit our primary coordination office and family helpdesk in the Diáspora."}
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>104 Main Street, Sandton, Johannesburg, 2196</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+27 11 555 0192</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>suporte@mpla-sa.org</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{language === "PT" ? "Seg - Sex: 08:30 - 16:30" : "Mon - Fri: 08:30 - 16:30"}</span>
              </p>
            </div>
          </div>

          {/* Interactive Simulated Map Placeholder */}
          <div className="mt-6 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2">
            <p className="text-[9px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">MAP COMPLIANCE GEO</p>
            <div className="h-28 bg-slate-900 rounded-lg flex items-center justify-center border border-white/5 relative overflow-hidden">
              <span className="text-[10px] font-mono text-slate-500">104 Main Street, Sandton Geo-Locator</span>
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#B5121B] rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-3xl shadow-xs">
          <span className="text-[10px] font-mono font-black uppercase text-[#B5121B] bg-red-50 border border-red-100 px-3 py-1 rounded-full">
            {language === "PT" ? "FORMULÁRIO DE CONTACTO OFICIAL" : "OFFICIAL CONTACT FORM"}
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-4 mb-2">
            {language === "PT" ? "Fale Conosco" : "Get In Touch"}
          </h3>
          <p className="text-slate-500 text-xs mb-6">
            Preencha os dados e receba uma resposta formal do secretariado em menos de 24 horas.
          </p>

          {contactSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2 text-emerald-800">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 m-auto" />
              <h4 className="font-bold text-sm">✓ {language === "PT" ? "Mensagem Enviada!" : "Message Sent!"}</h4>
              <p className="text-xs">
                {language === "PT" 
                  ? "A sua mensagem foi registada e encaminhada ao Secretário das Relações Exteriores e Cooperação." 
                  : "Your message was successfully logged and forwarded to the Secretary of Foreign Affairs."}
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Seu Nome Completo</label>
                  <input type="text" required placeholder="Ex: Manuel Neto" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#B5121B] focus:border-[#B5121B]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Correio Eletrónico</label>
                  <input type="email" required placeholder="Ex: manuel@neto.com" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#B5121B] focus:border-[#B5121B]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Contacto de Telefone</label>
                  <input type="tel" required placeholder="Ex: +27 82 555 1234" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#B5121B] focus:border-[#B5121B]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Assunto Principal</label>
                  <select className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#B5121B] focus:border-[#B5121B]">
                    <option>{language === "PT" ? "Apoio Consular / Documental" : "Consular / Document Support"}</option>
                    <option>{language === "PT" ? "Dúvida sobre Filiação Partidária" : "Membership Inquiries"}</option>
                    <option>{language === "PT" ? "Cursos e Atividades JMPLA" : "JMPLA Academic Classes"}</option>
                    <option>{language === "PT" ? "Outros Assuntos" : "Other Matters"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Sua Mensagem Detalhada</label>
                <textarea rows={4} required placeholder={language === "PT" ? "Escreva pormenorizadamente a sua solicitação..." : "Write your detailed inquiry here..."} className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#B5121B] focus:border-[#B5121B]" />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-[#B5121B] hover:bg-red-700 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition cursor-pointer"
              >
                {language === "PT" ? "Enviar Mensagem Oficial" : "Send Official Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* LUXURIOUS INSTITUTIONAL FOOTER */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-neutral-800" id="main-footer">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-0.5 border border-[#D4AF37]">
                <img 
                  src={images.mplaLogo} 
                  alt="MPLA Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-extrabold text-sm text-white tracking-wide">MPLA CAPE</h4>
            </div>
            <p className="text-xs text-slate-400 leading-normal max-w-xs">
              {language === "PT" 
                ? "Portal cívico e de serviços unificado dos angolanos organizados na diáspora sul-africana. Apoio consular, integração social e cooperação económica." 
                : "Unified civic and service portal for Angolans organized in the Diásporan diaspora. Consular assistance, social integration, and trade."}
            </p>
            <p className="text-[10px] font-mono text-[#D4AF37] font-bold">
              {language === "PT" ? "UNIDADE, LUTA, PROGRESSO" : "UNITY, STRUGGLE, PROGRESS"}
            </p>
          </div>

          {/* Col 2: Directory links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">{language === "PT" ? "Recursos" : "Resources"}</h5>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <a href="#about" className="hover:text-[#D4AF37]">{language === "PT" ? "Sobre Nós" : "About Us"}</a>
              <a href="#leadership" className="hover:text-[#D4AF37]">{language === "PT" ? "Liderança do Comité" : "Committee Leaders"}</a>
              <a href="#news" className="hover:text-[#D4AF37]">{language === "PT" ? "Comunicados de Imprensa" : "Press Releases"}</a>
              <a href="#events" className="hover:text-[#D4AF37]">{language === "PT" ? "Calendário de Eventos" : "Events Calendar"}</a>
            </div>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">{language === "PT" ? "Informações" : "Information"}</h5>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <a href="#contact" className="hover:text-[#D4AF37]">{language === "PT" ? "Entre em Contacto" : "Get In Touch"}</a>
              <a href="#membership" className="hover:text-[#D4AF37]">{language === "PT" ? "Filiação Partidária" : "Join Party"}</a>
              <button onClick={() => alert("Estatuto Geral de Proteção de Dados - SADC")} className="text-left hover:text-[#D4AF37] cursor-pointer">
                {language === "PT" ? "Política de Privacidade" : "Privacy Policy"}
              </button>
              <span className="text-[9px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                GATEWAY COMPLIANCE VERIFIED
              </span>
            </div>
          </div>

          {/* Col 4: Newsletter sign-up */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">NEWSLETTER</h5>
            <p className="text-xs text-slate-400 leading-normal">
              Inscreva o seu e-mail para receber alertas consulares e novos cursos da Sede de Coordenação.
            </p>
            {newsletterSuccess ? (
              <p className="text-xs text-emerald-400 font-bold">✓ {language === "PT" ? "Subscrito com sucesso!" : "Subscribed successfully!"}</p>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setNewsletterSuccess(true); }} 
                className="flex gap-2"
              >
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="seu@email.com" 
                  className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-hidden focus:ring-1 focus:ring-[#B5121B] flex-1"
                />
                <button 
                  type="submit" 
                  className="px-3 bg-[#B5121B] hover:bg-red-700 text-white rounded-lg text-xs font-bold transition"
                >
                  OK
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal copyright bar */}
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 mt-10 pt-6 text-center text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>
            © 2026 MPLA CAPE. Todos os direitos reservados.
          </span>
          <span className="font-mono uppercase tracking-widest text-[#D4AF37]">SADC PORTAL AUTHORITY v3.0.0</span>
          <a href="http://www.ai.neurogrowthlabs.co.za" target="_blank" rel="noreferrer" className="font-bold text-[#D4AF37] hover:underline">Developed by NeuroGrowth Labs www.ai.neurogrowthlabs.co.za</a>
        </div>
      </footer>
    </div>
  );
}
