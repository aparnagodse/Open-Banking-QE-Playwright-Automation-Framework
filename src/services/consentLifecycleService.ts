export type ConsentLifecycleState =
  | 'Created'
  | 'Authorised'
  | 'Active'
  | 'Revoked'
  | 'Expired';

export interface ConsentDetails {
  consentId: string;
  userId: string;
  accounts: string[];
  requestedAt: string;
  expiresAt?: string;
}

export interface ConsentLifecycleResult {
  consentId: string;
  state: ConsentLifecycleState;
  updatedAt: string;
  message?: string;
}

export class ConsentLifecycleService {
  async createConsent(details: ConsentDetails): Promise<ConsentLifecycleResult> {
    return {
      consentId: details.consentId,
      state: 'Created',
      updatedAt: new Date().toISOString(),
      message: 'Consent created',
    };
  }

  async authorizeConsent(consentId: string): Promise<ConsentLifecycleResult> {
    return {
      consentId,
      state: 'Authorised',
      updatedAt: new Date().toISOString(),
      message: 'Consent authorised',
    };
  }

  async activateConsent(consentId: string): Promise<ConsentLifecycleResult> {
    return {
      consentId,
      state: 'Active',
      updatedAt: new Date().toISOString(),
      message: 'Consent activated',
    };
  }

  async revokeConsent(consentId: string): Promise<ConsentLifecycleResult> {
    return {
      consentId,
      state: 'Revoked',
      updatedAt: new Date().toISOString(),
      message: 'Consent revoked',
    };
  }

  async expireConsent(consentId: string): Promise<ConsentLifecycleResult> {
    return {
      consentId,
      state: 'Expired',
      updatedAt: new Date().toISOString(),
      message: 'Consent expired',
    };
  }

  async getConsentState(consentId: string): Promise<ConsentLifecycleResult> {
    return {
      consentId,
      state: 'Created',
      updatedAt: new Date().toISOString(),
      message: 'Consent state retrieved',
    };
  }
}
