export interface SyntheticDataRequest {
  count: number;
  schemaName: string;
  constraints?: Record<string, unknown>;
  complianceTags?: string[];
}

export interface SyntheticDataSet {
  schemaName: string;
  records: Array<Record<string, unknown>>;
  metadata?: Record<string, unknown>;
}

export class TestDataGenerator {
  async generateData(request: SyntheticDataRequest): Promise<SyntheticDataSet> {
    return {
      schemaName: request.schemaName,
      records: [],
      metadata: {},
    };
  }
}
