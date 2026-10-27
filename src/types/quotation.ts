export interface QuotationCustomer {
  name?: string;
  phone: string;
  lineId?: string;
}

export interface QuotationLocation {
  province: string;
  district?: string;
}

export interface QuotationJobDetails {
  jobType: string;
  origin: QuotationLocation;
  destination: QuotationLocation;
  appointmentDate: string;
  timeSlot?: string;
  cargoDescription?: string;
  liftingHelp?: string;
  floorOrigin?: string;
  floorDestination?: string;
  notes?: string;
  motorcycleType?: string;
  motorcycleModel?: string;
  isRideable?: string;
  factoryPackaging?: string;
  factoryWeight?: string;
  needsPodReturn?: boolean;
}

export interface QuotationNotificationStatus {
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  retryCount: number;
  lastError?: string;
}

export interface QuotationRecord {
  id: string; // e.g., "WMS-123456"
  idempotencyKey?: string;
  createdAt: string; // ISO 8601
  customer: QuotationCustomer;
  jobDetails: QuotationJobDetails;
  summaryText: string;
  sourceUrl?: string;
  notification: QuotationNotificationStatus;
}

export interface QuotationSubmissionInput {
  customerName?: string;
  customerPhone: string;
  customerLineId?: string;
  jobType?: string;
  originProvince: string;
  originDistrict?: string;
  destinationProvince: string;
  destinationDistrict?: string;
  appointmentDate: string;
  timeSlot?: string;
  cargoDescription?: string;
  liftingHelp?: string;
  floorOrigin?: string;
  floorDestination?: string;
  notes?: string;
  motorcycleType?: string;
  motorcycleModel?: string;
  isRideable?: string;
  factoryPackaging?: string;
  factoryWeight?: string;
  needsPodReturn?: boolean;
  summaryText?: string;
  sourceUrl?: string;
  idempotencyKey?: string;
}

export interface QuotationSubmissionResult {
  success: boolean;
  isDuplicate?: boolean;
  quoteRef: string;
  formattedSummary: string;
  notificationStatus: 'pending' | 'sent' | 'failed';
  message?: string;
}
