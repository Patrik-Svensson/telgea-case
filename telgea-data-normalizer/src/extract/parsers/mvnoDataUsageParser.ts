import { MvnoDataUsage } from '../../types';

export function parseMvnoDataUsage(raw: string): MvnoDataUsage {
  const keyMap: Record<string, string> = {
    userid: 'user_id',
    msisdn: 'msisdn',
    totalmb: 'total_mb',
    roamingmb: 'roaming_mb',
    providercode: 'provider_code',
  };

  function cleanKeys(obj: any): any {
    if (Array.isArray(obj)) return obj.map(cleanKeys);
    if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        const rawCleaned = key.replace(/[\n_]/g, '').toLowerCase();
        const cleanedKey = keyMap[rawCleaned] ?? rawCleaned;
        acc[cleanedKey] = cleanKeys(value);
        return acc;
      }, {} as any);
    }
    return obj;
  }

  return cleanKeys(raw) as MvnoDataUsage;
}
