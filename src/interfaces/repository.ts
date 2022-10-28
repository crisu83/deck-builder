export interface Repository<T> {
  create(input: unknown): Promise<T>;

  update(id: string, input: unknown): Promise<T>;

  delete(id: string): Promise<T>;

  findOne(id: string): Promise<T | null>;

  findMany(): Promise<T[]>;
}
