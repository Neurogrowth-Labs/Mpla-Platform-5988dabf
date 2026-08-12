import React, { useState, useEffect } from "react";
import { 
  Settings, Palette, Globe, Sun, Moon, Clock, MailOpen, MessageSquare, 
  HardDriveUpload, Trash2, ShieldAlert, ToggleLeft, Key, Cpu, RefreshCw, 
  Sliders, Download, CheckSquare, Save 
} from "lucide-react";

export default function AdminSystemCentre() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [backupResult, setBackupResult] = useState<any>(null);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  
  // Real-time server diagnostic stats (simulate active polling)
  const [healthMetrics, setHealthMetrics] = useState({
    cpu: 12,
    memory: 48,
    responseTime: 18,
    logsQueue: 24
  });

  // Load settings from backend
  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/system/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Health telemetry generator simulation
    const interval = setInterval(() => {
      setHealthMetrics(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + Math.floor(Math.random() * 9 - 4))),
        memory: Math.max(40, Math.min(65, prev.memory + Math.floor(Math.random() * 3 - 1))),
        responseTime: Math.max(12, Math.min(35, prev.responseTime + Math.floor(Math.random() * 7 - 3))),
        logsQueue: prev.logsQueue
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdateSettings = async (updatedSettings: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/system/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleChangeField = (path: string[], value: any) => {
    const updated = { ...settings };
    let temp = updated;
    for (let i = 0; i < path.length - 1; i++) {
      temp = temp[path[i]];
    }
    temp[path[path.length - 1]] = value;
    setSettings(updated);
  };

  const handleSaveAll = () => {
    handleUpdateSettings(settings);
  };

  // Trigger automated / manual backup
  const triggerManualBackup = async () => {
    setBackupLoading(true);
    setBackupResult(null);
    try {
      const res = await fetch("/api/system/backup", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setBackupResult(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBackupLoading(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-3">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-mono font-bold uppercase tracking-wider">Loading System Configurations state...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="system-administration">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-display font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600 animate-pulse" />
            System Administration Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage platform-wide branding, localized settings, HTML notification templates, feature flags, backups, and server resources.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-blue-100"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Guardar Definições do Sistema
        </button>
      </div>

      {/* SYSTEM DIAGNOSTICS & TELEMETRY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Central Processor (CPU)", value: `${healthMetrics.cpu}%`, color: healthMetrics.cpu > 80 ? "text-rose-600" : "text-[#D3122A]", metric: healthMetrics.cpu, desc: "SLA allocation threshold" },
          { label: "Server RAM Utilization", value: `${healthMetrics.memory}%`, color: "text-red-700", metric: healthMetrics.memory, desc: "Cache buffers load" },
          { label: "Node Response Latency", value: `${healthMetrics.responseTime} ms`, color: "text-emerald-600", metric: (healthMetrics.responseTime / 40) * 100, desc: "Excellent network ping" },
          { label: "System Queue Backlog", value: "0 tasks", color: "text-slate-600", metric: 0, desc: "Horizontal scheduler idle" }
        ].map((met, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-extrabold">{met.label}</span>
              <Cpu className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <p className={`text-lg font-extrabold font-mono ${met.color}`}>{met.value}</p>
              <p className="text-[9px] text-slate-400 mt-0.5">{met.desc}</p>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  met.metric > 80 ? "bg-rose-500" : "bg-blue-600"
                }`} 
                style={{ width: `${met.metric}%` }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* TWO-COLUMN EDIT PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: BRANDING, LOCALIZATION & FEATURE FLAGS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* BRANDING AND LOGO CONFIG */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Palette className="w-4.5 h-4.5 text-[#D3122A]" />
              Corporate Identity & Brand Guidelines
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Party/Organization Name</label>
                <input
                  type="text"
                  value={settings.partyName}
                  onChange={(e) => handleChangeField(["partyName"], e.target.value)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#D3122A] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Brand Logo URL reference</label>
                <input
                  type="text"
                  value={settings.logoUrl}
                  onChange={(e) => handleChangeField(["logoUrl"], e.target.value)}
                  className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#D3122A] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Primary Palette HEX</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleChangeField(["primaryColor"], e.target.value)}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => handleChangeField(["primaryColor"], e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#D3122A] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Paleta Secundária HEX</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleChangeField(["secondaryColor"], e.target.value)}
                    className="w-10 h-10 border-0 rounded-lg cursor-pointer shrink-0"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => handleChangeField(["secondaryColor"], e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#D3122A] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LOCALIZATION & THEME COMPLIANCE */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-4.5 h-4.5 text-[#D3122A]" />
              Regionalização, Fusos Horários e Tema da Interface
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Idioma Predefinido do Sistema</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => handleChangeField(["defaultLanguage"], e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option>Português (Portugal)</option>
                  <option>Português (Angola)</option>
                  <option>Português da Diáspora MPLA</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Fuso Horário Operacional</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChangeField(["timezone"], e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                >
                  <option>Africa/Johannesburg (GMT+2)</option>
                  <option>Africa/Harare (GMT+2)</option>
                  <option>Europe/London (GMT+1)</option>
                </select>
              </div>

              {/* Theme Settings requested by prompt */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Motor de Tema do Portal</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setThemeMode("light")}
                    className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                      themeMode === "light"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Light UI
                  </button>
                  <button
                    onClick={() => setThemeMode("dark")}
                    className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer ${
                      themeMode === "dark"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Dark UI
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TEMPLATES FOR NOTIFICATION CENTER */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <MailOpen className="w-4.5 h-4.5 text-[#D3122A]" />
              SMTP Email & Transactional SMS HTML Templates
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <MailOpen className="w-3.5 h-3.5 text-red-500" /> HTML Email: Verification OTP Template
                </p>
                <textarea
                  value={settings.emailTemplates.verification}
                  onChange={(e) => handleChangeField(["emailTemplates", "verification"], e.target.value)}
                  rows={2}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#D3122A] outline-none"
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-red-500" /> Mobile SMS: OTP Message Template
                </p>
                <input
                  type="text"
                  value={settings.smsTemplates.otp}
                  onChange={(e) => handleChangeField(["smsTemplates", "otp"], e.target.value)}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#D3122A] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <MailOpen className="w-3.5 h-3.5 text-indigo-500" /> Email: Card Shipped Template
                  </label>
                  <textarea
                    value={settings.emailTemplates.cardDispatched}
                    onChange={(e) => handleChangeField(["emailTemplates", "cardDispatched"], e.target.value)}
                    rows={2}
                    className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#D3122A] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-yellow-500" /> SMS: Card Shipped Template
                  </label>
                  <textarea
                    value={settings.smsTemplates.cardDispatched}
                    onChange={(e) => handleChangeField(["smsTemplates", "cardDispatched"], e.target.value)}
                    rows={2}
                    className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#D3122A] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: POLICIES, BACKUPS & SECURITY CONTROL */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CRITICAL FEATURE FLAGS */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Sliders className="w-4.5 h-4.5 text-[#D3122A]" />
              Runtime Feature Flags
            </h3>

            <div className="space-y-4">
              {[
                { key: "aiAssistedScans", label: "Gemini 3.5 Anomaly Scanning", desc: "Allows instant fraud detections on registrations" },
                { key: "instantSelfServiceRegistration", label: "Direct Self-Service Portal", desc: "Permits citizens to apply directly via email" },
                { key: "realtimeCardDispatches", label: "Realtime Delivery Updates", desc: "Hooks instant courier APIs to card printing status" }
              ].map((flag) => {
                const checked = settings.featureFlags[flag.key];
                return (
                  <div key={flag.key} className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{flag.label}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{flag.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        const updated = {
                          ...settings.featureFlags,
                          [flag.key]: !checked
                        };
                        handleChangeField(["featureFlags"], updated);
                      }}
                      className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                        checked ? "bg-[#D3122A]" : "bg-slate-200"
                      }`}
                    >
                      <span 
                        className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          checked ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RETENTION POLICIES & MAINTENANCE SWITCH */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-600" />
              System Hardening & Safety Mode
            </h3>

            <div className="space-y-4">
              {/* Maintenance mode switch */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Maintenance Mode Lock
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">Encaminha utilizadores padrão para a página de manutenção e limita o acesso a super administradores.</p>
                </div>

                <button
                  onClick={() => handleChangeField(["maintenanceModeActive"], !settings.maintenanceModeActive)}
                  className={`w-10 h-5.5 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                    settings.maintenanceModeActive ? "bg-rose-600" : "bg-slate-200"
                  }`}
                >
                  <span 
                    className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      settings.maintenanceModeActive ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" /> Audit Logs Retention Threshold
                </label>
                <select className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option>Retain infinitely (Standard Secure auditing)</option>
                  <option>Purge logs older than 1 Year</option>
                  <option>Purge logs older than 6 Months</option>
                </select>
              </div>
            </div>
          </div>

          {/* DISASTER RECOVERY & ENCRYPTED BACKUP */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <HardDriveUpload className="w-4.5 h-4.5 text-[#D3122A]" />
              Database Backups & Recovery
            </h3>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Automated Scheduled Backup Frequency</label>
                <select className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option>Daily at 02:00 AM (Central SAST)</option>
                  <option>Weekly on Sunday mornings</option>
                  <option>Monthly audit snapshot</option>
                </select>
              </div>

              <button
                onClick={triggerManualBackup}
                disabled={backupLoading}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-[10px] rounded-lg tracking-wider uppercase hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {backupLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                Trigger Manual Encrypted Snapshot
              </button>

              {backupResult && (
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-[10px] font-mono text-slate-700 leading-relaxed space-y-1 relative">
                  <p className="text-[#D3122A] font-bold flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-[#D3122A] animate-pulse" /> Backup Success!
                  </p>
                  <p><strong>Package:</strong> {backupResult.backupFile}</p>
                  <p><strong>Volume size:</strong> {backupResult.size}</p>
                  <p><strong>DB Snapshot:</strong> {backupResult.membersCount} members, {backupResult.logsCount} security logs</p>
                </div>
              )}
            </div>
          </div>

          {/* LICENSE KEY AND PLAN SUBSCRIPTION */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <Key className="w-4.5 h-4.5 text-[#D3122A]" />
              Enterprise License Validation
            </h3>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">Secure Core License Key</label>
                <input
                  type="text"
                  value={settings.licenseKey}
                  onChange={(e) => handleChangeField(["licenseKey"], e.target.value)}
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#D3122A] outline-none"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>Expiration Threshold:</span>
                <span className="text-emerald-600 font-bold">{settings.licenseExpires}</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-[10px] text-emerald-800 leading-normal font-mono text-center">
                <strong>Classe do Plano:</strong> Instância Empresarial Multi-Inquilino Ouro Elite (SLA ativo verificado)
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
