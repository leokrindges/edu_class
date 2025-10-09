/**
 * Formata um telefone brasileiro no padrão (11) 99999-9999
 */
export function formatPhone(value: string): string {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  // Telefone com DDD (10 ou 11 dígitos)
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Retorna apenas os números se não conseguir formatar
  return cleaned;
}

/**
 * Remove a formatação do telefone, deixando apenas números
 */
export function unformatPhone(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Valida se o telefone brasileiro está no formato correto
 */
export function isValidPhone(value: string): boolean {
  const cleaned = unformatPhone(value);
  return /^(\d{2})(\d{4,5})(\d{4})$/.test(cleaned);
}

/**
 * Formata CPF no padrão 000.000.000-00
 */
export function formatCPF(value: string): string {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

  if (match) {
    return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
  }

  return cleaned;
}

/**
 * Formata CEP no padrão 00000-000
 */
export function formatCEP(value: string): string {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{5})(\d{3})$/);

  if (match) {
    return `${match[1]}-${match[2]}`;
  }

  return cleaned;
}

/**
 * Formata data no padrão brasileiro DD/MM/AAAA
 */
export function formatDate(date: string | Date): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "";

  return dateObj.toLocaleDateString("pt-BR");
}

/**
 * Formata moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata primeiro nome + sobrenome
 */
export function formatDisplayName(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  if (names.length === 1) return names[0];

  return `${names[0]} ${names[names.length - 1]}`;
}

/**
 * Formata iniciais do nome (máximo 2 letras)
 */
export function formatInitials(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return `${names[0].charAt(0)}${names[names.length - 1].charAt(
    0
  )}`.toUpperCase();
}
