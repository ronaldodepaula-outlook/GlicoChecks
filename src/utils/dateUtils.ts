export const DateUtils = {
  // Formatar data para exibição
  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  },

  // Formatar hora para exibição
  formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },

  // Formatar data e hora
  formatDateTime(date: Date): string {
    return `${this.formatDate(date)} ${this.formatTime(date)}`;
  },

  // Criar data a partir de string (para date picker simples)
  createDate(dateString: string, timeString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    const [hours, minutes] = timeString.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
};