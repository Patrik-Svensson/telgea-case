import { extractSubscriberData } from '../extract';
import { normalizeSubscriber } from '../transform';
import { saveSubscriberToDB } from './dbClient';
import { MvnoDataUsage } from '../types';

export async function normalizeAndSync() {
  try {
    const raw = await extractSubscriberData();
    const normalized: ApiResponse = normalizeSubscriber(raw);
    console.log(`[${new Date().toISOString()}] Normalized:`, normalized);
    await saveSubscriberToDB(normalized);
  } catch (err) {
    console.error('ETL error:', err);
  }
}
