export const ptPT = "pt-PT";
export const diasporaCountries = [
  "Angola", "África do Sul", "Namíbia", "Zâmbia", "Zimbabué", "Botswana", "Moçambique", "República Democrática do Congo", "República do Congo", "Portugal", "Brasil", "Reino Unido", "França", "Alemanha", "Espanha", "Estados Unidos da América", "Canadá"
];

export function formatDatePT(date?: string | Date) {
  if (!date) return "Sem data";
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(parsed.getTime())) return "Sem data";
  return new Intl.DateTimeFormat(ptPT, { day: "2-digit", month: "long", year: "numeric" }).format(parsed);
}

export function formatCurrencyPT(value = 0, currency = "EUR") {
  return new Intl.NumberFormat(ptPT, { style: "currency", currency }).format(value);
}

export function traduzirEstadoMembro(status?: string) {
  const estados: Record<string, string> = {
    Active: "Ativo",
    Suspended: "Suspenso",
    "Pending Verification": "Em Regularização",
    Inactive: "Inativo"
  };
  return estados[status || ""] || "Em Regularização";
}

export function traduzirGenero(gender?: string) {
  return ({ Male: "Masculino", Female: "Feminino", Other: "Outro" } as Record<string, string>)[gender || ""] || "Não indicado";
}
