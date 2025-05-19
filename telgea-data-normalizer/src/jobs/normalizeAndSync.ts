import { extractMvnoDataUsage, extractMvnoSmsUsage } from '../extract';
import { normalizeDataUsage } from '../transform';
import { saveSubscriberToDB } from '../load/dbMockClient';
import { MvnoDataUsage, MvnoSmsUsage, TelgeaSubscribeUsage } from '../types';

export async function normalizeAndSync() {
  try {
    console.log(`[${new Date().toISOString()}] Extracting...`);
    const mvnoDataUsage: MvnoDataUsage = await extractMvnoDataUsage();
    const mvnoSmsUsage: MvnoSmsUsage = await extractMvnoSmsUsage();

    console.log(`[${new Date().toISOString()}] Transforming...`);
    const normalizedUserData: TelgeaSubscribeUsage = normalizeDataUsage(
      mvnoDataUsage,
      mvnoSmsUsage
    );

    console.log(`[${new Date().toISOString()}] Loading...`);
    await saveSubscriberToDB(normalizedUserData);

    console.log(`[${new Date().toISOString()}] ETL job complete ✅`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ETL job failed ❌`, err);
  }
}
