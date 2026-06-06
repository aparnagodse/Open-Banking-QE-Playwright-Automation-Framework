export interface PromptDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
  version: string;
  schema?: Record<string, unknown>;
}

export interface PromptRegistryOptions {
  defaultCategory?: string;
}

export class PromptRegistry {
  private prompts: Map<string, PromptDefinition>;
  private defaultCategory?: string;

  constructor(options?: PromptRegistryOptions) {
    this.prompts = new Map();
    this.defaultCategory = options?.defaultCategory;
  }

  register(prompt: PromptDefinition): void {
    this.prompts.set(prompt.id, prompt);
  }

  getPrompt(id: string): PromptDefinition | undefined {
    return this.prompts.get(id);
  }

  listPrompts(category?: string): PromptDefinition[] {
    const prompts = Array.from(this.prompts.values());
    if (!category) {
      return prompts;
    }
    return prompts.filter((prompt) => prompt.category === category);
  }
}
