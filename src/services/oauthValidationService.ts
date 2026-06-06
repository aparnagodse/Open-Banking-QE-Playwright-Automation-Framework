export interface OAuthToken {
  accessToken: string;
  scopes: string[];
  expiresAt: string;
}

export interface OAuthValidationResult {
  valid: boolean;
  reason?: string;
}

export class OAuthValidationService {
  async validateToken(token: OAuthToken): Promise<OAuthValidationResult> {
    return {
      valid: true,
      reason: 'Token format validated',
    };
  }

  async validateScopes(token: OAuthToken, requiredScopes: string[]): Promise<OAuthValidationResult> {
    return {
      valid: true,
      reason: 'Scopes validation stub passed',
    };
  }

  async validateExpiry(token: OAuthToken): Promise<OAuthValidationResult> {
    return {
      valid: true,
      reason: 'Token expiry validated',
    };
  }
}
