import React, { useState } from "react";
import { Member, SystemAuditLog } from "../types";
import { formatCurrencyPT, traduzirEstadoMembro } from "../utils/portugal";
import { 
  Users, CheckCircle, ShieldAlert, Clock, Search, MapPin, 
  Trash2, ShieldOff, CheckSquare, XCircle, ChevronRight, 
  AlertTriangle, Filter, FolderPlus, Compass, Download, FileText 
} from "lucide-react";

interface AdminDashboardProps {
  members: Member[];
  auditLogs: SystemAuditLog[];
  onUpdateMember: (id: string, updatedData: Partial<Member>) => void;
  onDeleteMember: (id: string) => void;
}

export default function AdminDashboard({
  members,
  auditLogs,
  onUpdateMember,
  onDeleteMember
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"members" | "registration" | "hierarchy" | "audit">("members");

  // Filter/Search states for Member Management
  const [memberSearch, setMemberSearch] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected region in geographic explorer
  const [selectedProvince, setSelectedProvince] = useState<string>("Gauteng");
  const [selectedMuni, setSelectedMuni] = useState<string>("City of Johannesburg");

  // KPI Calculations
  const totalMembers = members.length;
  const activeCount = members.filter(m => m.status === "Active").length;
  const pendingCount = members.filter(m => m.status === "Pending Verification").length;
  const suspendedCount = members.filter(m => m.status === "Suspended").length;
  const totalOutstanding = members.reduce((sum, m) => sum + m.outstandingBalance, 0);

  // Filtered members list
  const filteredMembers = members.filter(m => {
    const matchesSearch = m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) || 
                          m.membershipNo.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          m.nationalId.includes(memberSearch);
    const matchesProvince = provinceFilter === "All" || m.province === provinceFilter;
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesProvince && matchesStatus;
  });

  const pendingRegistrations = members.filter(m => m.status === "Pending Verification");

  const downloadBlob = (content: string, fileName: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportMembersCsv = () => {
    const header = "membershipNo,fullName,email,mobile,province,committee,status,outstandingBalance";
    const rows = filteredMembers.map(m => [m.membershipNo, m.fullName, m.email, m.mobile, m.province, m.committee, m.status, m.outstandingBalance].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
    downloadBlob([header, ...rows].join("\n"), "mpla-cape-members.csv", "text/csv;charset=utf-8");
  };

  const exportAuditPdf = () => {
    const html = `<!doctype html><html><head><title>Relatório de Auditoria</title><style>body{font-family:Arial,sans-serif;padding:24px}h1{color:#c8102e}table{width:100%;border-collapse:collapse;font-size:11px}td,th{border:1px solid #ddd;padding:6px;text-align:left}</style></head><body><h1>MPLA CAPE — Relatório de Auditoria</h1><p>Gerado em ${new Date().toLocaleString("pt-ZA")}</p><table><thead><tr><th>Data</th><th>Utilizador</th><th>Ação</th><th>Detalhes</th></tr></thead><tbody>${auditLogs.map(log => `<tr><td>${log.timestamp}</td><td>${log.user}</td><td>${log.action}</td><td>${log.details}</td></tr>`).join("")}</tbody></table><script>window.print()</script></body></html>`;
    const win = window.open("", "_blank", "width=1000,height=700");
    if (!win) return;
    win.document.write(html);
    win.document.close();
  };

  // Geographic hierarchy mock data
  const geoHierarchy: { [prov: string]: { [muni: string]: string[] } } = {
    "Gauteng": {
      "City of Johannesburg": ["Ward 117 Local Committee", "Ward 103 Local Committee", "Rosebank Assembly Branch"],
      "Tshwane Metro": ["Ward 2 Local Committee", "Hatfield Branch Assembly"],
      "Ekurhuleni": ["Ward 10 Assembly Branch", "Germiston Council Committee"]
    },
    "Western Cape": {
      "City of Cape Town": ["Ward 57 Committee", "Woodstock Assembly Branch", "Claremont Democratic Ward"],
      "Stellenbosch": ["Ward 3 Committee", "Stellenbosch Branch Assembly"]
    },
    "KwaZulu-Natal": {
      "eThekwini Metro": ["Ward 1 Local Committee", "Durban Central Ward"],
      "uMsunduzi": ["Ward 8 Local Assembly"]
    }
  };

  return (
    <div className="space-y-8" id="admin-dashboard-panel">
      <div className="flex flex-wrap justify-end gap-2">
        <button onClick={exportMembersCsv} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Download className="w-4 h-4" />Exportar membros CSV</button>
        <button onClick={exportAuditPdf} className="px-3 py-2 bg-[#D3122A] text-white rounded-xl text-xs font-bold hover:bg-red-700 flex items-center gap-2"><FileText className="w-4 h-4" />Exportar auditoria PDF</button>
      </div>

      {/* Super Admin KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[
          { label: "Total de Militantes", count: totalMembers, desc: "Registados na diáspora", icon: Users, color: "text-[#D3122A] bg-red-50" },
          { label: "Militantes Ativos", count: activeCount, desc: "Credenciais verificadas", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50" },
          { label: "Em Regularização", count: pendingCount, desc: "Fila de aprovações", icon: Clock, color: "text-amber-600 bg-amber-50" },
          { label: "Registos Suspensos", count: suspendedCount, desc: "Sinalizados ou arquivados", icon: ShieldAlert, color: "text-rose-600 bg-rose-50" },
          { label: "Quotas em Dívida", count: formatCurrencyPT(totalOutstanding), desc: "Saldos de quotas em atraso", icon: AlertTriangle, color: "text-[#D3122A] bg-red-50" }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">{kpi.label}</p>
                <p className="text-xl lg:text-2xl font-display font-extrabold text-slate-800 tracking-tight mt-1 font-mono">{kpi.count}</p>
              </div>
              <div className={`p-2 rounded-xl ${kpi.color}`}>
                <kpi.icon className="w-4.5 h-4.5" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-mono">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* Admin Operations Sub-Tab Navigation */}
      <div className="border-b border-slate-200 flex flex-wrap gap-2 pt-2 text-xs font-semibold">
        {[
          { key: "members", label: "Gestão do Registo de Militantes", icon: Users },
          { key: "registration", label: "Fila de Aprovações de Registo", badge: pendingRegistrations.length, icon: CheckSquare },
          { key: "hierarchy", label: "Explorador da Hierarquia da Diáspora", icon: Compass },
          { key: "audit", label: "Registos de Auditoria Imutáveis", icon: Clock }
        ].map((subTab) => (
          <button
            key={subTab.key}
            onClick={() => setActiveSubTab(subTab.key as any)}
            className={`px-4 py-2.5 border-b-2 font-bold transition flex items-center gap-2 cursor-pointer ${
              activeSubTab === subTab.key
                ? "border-[#D3122A] text-[#D3122A] font-bold"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <subTab.icon className="w-4 h-4" />
            {subTab.label}
            {subTab.badge !== undefined && subTab.badge > 0 && (
              <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[9px] font-bold font-mono">
                {subTab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeSubTab === "members" && (
        /* MEMBER REGISTRY MANAGEMENT PANEL */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3.5 top-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Pesquisar nome, número de militante, B.I. ou passaporte..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-[#D3122A] outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              {/* Province Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Província:</span>
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="All">Todas as províncias</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="Free State">Free State</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                </select>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Estado:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="All">Todos os estados</option>
                  <option value="Active">Active</option>
                  <option value="Pending Verification">Em Regularização</option>
                  <option value="Suspended">Suspenso</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Members Grid Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-mono font-bold border-b border-slate-200">
                  <th className="p-4">Dados do Militante</th>
                  <th className="p-4">Comité / Morada</th>
                  <th className="p-4">Nível e Categoria</th>
                  <th className="p-4">Estado do Cartão</th>
                  <th className="p-4 text-center">Ações de Estado</th>
                  <th className="p-4 text-right">Eliminar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={m.photo}
                        alt={m.fullName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-semibold text-slate-800 text-xs">{m.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">No: {m.membershipNo} • ID: {m.nationalId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-700">{m.committee}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{m.province} • {m.municipality}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-[#D3122A] bg-red-50 px-2 py-0.5 rounded text-[10px] font-mono border border-red-100">
                        {m.membershipLevel}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{m.category} Branch</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 font-mono">
                        <span className="w-1.5 h-1.5 bg-[#D3122A] rounded-full" />
                        {m.physicalCardStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-1.5">
                        {m.status === "Suspended" ? (
                          <button
                            onClick={() => onUpdateMember(m.id, { status: "Active" })}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition rounded-lg font-bold text-[10px]"
                          >
                            Reativar
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateMember(m.id, { status: "Suspended" })}
                            className="px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 transition rounded-lg font-bold text-[10px]"
                          >
                            Suspender
                          </button>
                        )}

                        <select
                          value={m.committee}
                          onChange={(e) => onUpdateMember(m.id, { committee: e.target.value })}
                          className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] outline-none"
                        >
                          <option value="Ward 117 Local Committee">Ward 117</option>
                          <option value="Ward 2 Local Committee">Ward 2</option>
                          <option value="Ward 57 Committee">Ward 57</option>
                          <option value="Ward 4 Committee">Ward 4</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Tem a certeza de que pretende eliminar definitivamente a ficha de ${m.fullName}?`)) {
                            onDeleteMember(m.id);
                          }
                        }}
                        className="text-rose-400 hover:text-rose-600 transition p-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === "registration" && (
        /* REGISTRATION APPROVALS QUEUE */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm">Applications Em Regularização</h3>
            <p className="text-xs text-slate-500 mt-1">Review newly registered citizens, verify biographical credentials, and authorize print queues.</p>
          </div>

          <div className="space-y-4">
            {pendingRegistrations.length > 0 ? (
              pendingRegistrations.map((m) => (
                <div key={m.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-200 transition">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.photo}
                      alt={m.fullName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-bold text-slate-800 text-sm">{m.fullName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Email: {m.email} • Mobile: {m.mobile}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-[9px] bg-red-50 text-[#D3122A] font-bold px-2 py-0.5 rounded-md font-mono border border-red-100">ID: {m.nationalId}</span>
                        <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-md font-mono">DOB: {m.dob} • {m.gender}</span>
                        <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-md font-mono">Branch: {m.committee} ({m.province})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 w-full md:w-auto text-xs font-semibold shrink-0">
                    <button
                      onClick={() => onUpdateMember(m.id, { status: "Active", physicalCardStatus: "Approved" })}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition shadow cursor-pointer"
                    >
                      Verify & Approve
                    </button>
                    <button
                      onClick={() => onUpdateMember(m.id, { status: "Suspended" })}
                      className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition cursor-pointer"
                    >
                      Reject Application
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-800 text-sm">Approvals Queue is Empty</p>
                <p className="text-xs text-slate-500">All member biographical credentials have been successfully verified and approved.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === "hierarchy" && (
        /* GEOGRAPHIC HIERARCHY EXPLORER */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm">Geographic Administration Hierarchy</h3>
            <p className="text-xs text-slate-500 mt-1">Navigate national organizational structures from Provinces down to Municipalities and Ward Local Branches.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Province Selection */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 border-b border-slate-200 pb-2">Provinces</h4>
              <div className="space-y-1.5">
                {Object.keys(geoHierarchy).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => {
                      setSelectedProvince(prov);
                      setSelectedMuni(Object.keys(geoHierarchy[prov])[0]);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                      selectedProvince === prov
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{prov} Office</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Municipality selection */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 border-b border-slate-200 pb-2">Municipalities ({selectedProvince})</h4>
              <div className="space-y-1.5">
                {Object.keys(geoHierarchy[selectedProvince] || {}).map((muni) => (
                  <button
                    key={muni}
                    onClick={() => setSelectedMuni(muni)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                      selectedMuni === muni
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{muni}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Local Ward Branches */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 border-b border-slate-200 pb-2">Células e Comités ({selectedMuni})</h4>
              <div className="space-y-1.5">
                {(geoHierarchy[selectedProvince]?.[selectedMuni] || []).map((branch, idx) => {
                  const mCount = members.filter(m => m.committee === branch).length;
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 flex justify-between items-center"
                    >
                      <span className="font-semibold">{branch}</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded font-mono font-bold text-[9px] text-slate-500">
                        {mCount} Militantes Ativos
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "audit" && (
        /* IMMUTABLE AUDIT CENTER LOGS */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-display font-semibold text-slate-800 text-sm">Security Audit Logs</h3>
            <p className="text-xs text-slate-500 mt-1">Immutable security ledger capturing administrative updates, card prints, and system configurations.</p>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono rounded">
                      {log.role}
                    </span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                </div>

                <div className="text-right shrink-0 text-[10px] text-slate-400 font-mono space-y-0.5">
                  <p>{new Date(log.timestamp).toLocaleString()}</p>
                  <p>User: {log.user} • IP: {log.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
