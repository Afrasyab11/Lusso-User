import {checkNullOrEmpty} from '../../utils/utils';

export const sortDates = (
  dates: any[],
  order: 'asc' | 'desc' = 'asc',
  target?: string,
): any[] => {
  return dates.sort((a, b) => {
    const aParts = checkNullOrEmpty(target)
      ? a.split('/')
      : a[target as keyof typeof a]?.split('/');
    const bParts = checkNullOrEmpty(target)
      ? b.split('/')
      : b[target as keyof typeof b]?.split('/');

    const aDate = new Date(`${aParts[2]}-${aParts[1]}-${aParts[0]}`);
    const bDate = new Date(`${bParts[2]}-${bParts[1]}-${bParts[0]}`);

    return order === 'asc'
      ? aDate.getTime() - bDate.getTime()
      : bDate.getTime() - aDate.getTime();
  });
};

export const dynamicSort = (field: string, order: 'asc' | 'desc' = 'asc') => {
  return (a: any, b: any): number => {
    let comparison = 0;

    if (typeof a[field] === 'string' && typeof b[field] === 'string') {
      comparison = a[field].localeCompare(b[field]);
    } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      comparison = a[field] - b[field];
    } else if (field === 'lastUpdate') {
      const aParts = a.lastUpdate.split('/');
      const bParts = b.lastUpdate.split('/');
      const aDate = new Date(`${aParts[2]}-${aParts[1]}-${aParts[0]}`);
      const bDate = new Date(`${bParts[2]}-${bParts[1]}-${bParts[0]}`);
      comparison = aDate.getTime() - bDate.getTime();
    }

    return order === 'asc' ? comparison : -comparison;
  };
};
