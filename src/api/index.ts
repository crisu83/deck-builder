export type SuccessResponse<T> = { data: T };
export type ErrorResponse = { message: string };

export type CreateResponse<T> = SuccessResponse<T>;
export type UpdateResponse<T> = SuccessResponse<T>;
export type GetResponse<T> = SuccessResponse<T | null>;
export type QueryResponse<T> = SuccessResponse<T[]>;

export * from "./decks";
