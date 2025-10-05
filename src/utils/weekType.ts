export function getWeekType(date: Date = new Date()): 'morning' | 'afternoon' {
  const referenceDate = new Date('2025-10-06');
  const referenceWeekType = 'afternoon';

  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const startOfWeek = (d: Date) => {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.getFullYear(), d.getMonth(), diff);
  };

  const refWeekStart = startOfWeek(referenceDate);
  const currentWeekStart = startOfWeek(date);

  const weeksDiff = Math.floor((currentWeekStart.getTime() - refWeekStart.getTime()) / oneWeek);

  const isEvenWeek = weeksDiff % 2 === 0;

  return isEvenWeek ? referenceWeekType : (referenceWeekType === 'morning' ? 'afternoon' : 'morning');
}

export function formatWeekType(type: 'morning' | 'afternoon'): string {
  return type === 'morning' ? 'Semaine de matinée (7h-13h)' : 'Semaine d\'après-midi (13h-19h)';
}
