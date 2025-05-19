import { MvnoSmsUsage } from '../../types';
import { parseStringPromise } from 'xml2js';

export async function parseMvnoSmsUsage(raw: string): Promise<MvnoSmsUsage> {
  try {
    const result = await parseStringPromise(raw, {
      explicitArray: false,
      tagNameProcessors: [stripPrefix],
    });

    const body = result.Envelope?.Body;
    const chargeSMS = body?.ChargeSMS;

    if (!chargeSMS) {
      throw new Error('Missing <ChargeSMS> in SOAP response');
    }

    return {
      userId: chargeSMS.UserID,
      phoneNumber: chargeSMS.PhoneNumber,
      messageId: chargeSMS.MessageID,
      timestamp: chargeSMS.Timestamp,
      chargeAmount: parseFloat(chargeSMS.ChargeAmount),
      currency: chargeSMS.Currency,
    };
  } catch (err) {
    throw new Error(`Failed to parse SOAP response: ${(err as Error).message}`);
  }
}

// Import the built-in namespace stripper
import { stripPrefix } from 'xml2js/lib/processors';
