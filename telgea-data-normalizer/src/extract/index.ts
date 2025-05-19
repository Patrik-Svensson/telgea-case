import { fetchSubscriberDataUsage } from './extractors/mvnoDataUsageExtractor';
import { fetchSubscriberSmsUsage } from './extractors/mvnoSmsUsageExtractor';
import { parseMvnoDataUsage } from './parsers/mvnoDataUsageParser';
import { parseMvnoSmsUsage } from './parsers/mvnoSmsUsageParser';
import { MvnoDataUsage, MvnoSmsUsage } from '../types';

export async function extractMvnoDataUsage(): Promise<MvnoDataUsage> {
  const rawMvnoDataUsage: string = await fetchSubscriberDataUsage();
  const parsedMvnoDataUsage: MvnoDataUsage =
    parseMvnoDataUsage(rawMvnoDataUsage);

  return parsedMvnoDataUsage;
}

export async function extractMvnoSmsUsage(): Promise<MvnoSmsUsage> {
  const rawMvnoSmsUsage: string = await fetchSubscriberSmsUsage();
  const parsedMvnoSmsUsage: MvnoSmsUsage =
    await parseMvnoSmsUsage(rawMvnoSmsUsage);

  return parsedMvnoSmsUsage;
}
