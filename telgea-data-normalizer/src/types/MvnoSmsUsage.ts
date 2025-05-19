export interface MvnoSmsUsage {
  userId: string;
  phoneNumber: string;
  messageId: string;
  timestamp: string;
  chargeAmount: number;
  currency: string;
}
