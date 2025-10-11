export class PhoneUtils {
	static cleanPhone(phone: string): string {
		return phone ? phone.replace(/\D/g, '') : '';
	}

	static formatPhone(phone: string): string {
		const cleaned = this.cleanPhone(phone);
		if (cleaned.length === 11) {
			return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
		}
		if (cleaned.length === 10) {
			return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
		}
		return cleaned;
	}

	static isValidBrazilianPhone(phone: string): boolean {
		const cleaned = this.cleanPhone(phone);
		return /^(\d{10}|\d{11})$/.test(cleaned);
	}
}
