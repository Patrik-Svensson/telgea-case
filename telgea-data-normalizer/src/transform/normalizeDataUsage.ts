import { MvnoDataUsage, MvnoSmsUsage, TelgeaSubscribeUsage } from '../types';

export function normalizeDataUsage(
  mvnoDataUsage: MvnoDataUsage,
  mvnoSmsUsage: MvnoSmsUsage
): TelgeaSubscribeUsage {
  return {
    telgea_user_id: mvnoDataUsage.user_id,
    msisdn: mvnoDataUsage.msisdn,
    usage_data: {
      total_mb: mvnoDataUsage.usage.data.total_mb,
      roaming_mb: mvnoDataUsage.usage.data.roaming_mb,
      country: mvnoDataUsage.usage.data.country,
      network_type: mvnoDataUsage.network.type,
      provider_code: mvnoDataUsage.network.provider_code,
    },
    sms_charges: [
      {
        message_id: mvnoSmsUsage.messageId,
        timestamp: mvnoSmsUsage.timestamp,
        amount: mvnoSmsUsage.chargeAmount,
        currency: mvnoSmsUsage.currency,
      },
    ],
    billing_period: {
      start: mvnoDataUsage.usage.period.start,
      end: mvnoDataUsage.usage.period.end,
    },
  };
}
