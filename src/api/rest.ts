import { NextApiRequest, NextApiResponse } from "next";

import { Prisma } from "@prisma/client";

export type SuccessResponse<T> = { data: T };
export type ErrorResponse = { message: string };

export type CreateResponse<T> = SuccessResponse<T>;
export type UpdateResponse<T> = SuccessResponse<T>;
export type GetResponse<T> = SuccessResponse<T | null>;
export type QueryResponse<T> = SuccessResponse<T[]>;
export type DeleteResponse<T> = SuccessResponse<T>;

export function parseQuery(key: string, req: NextApiRequest): string {
  const value = req.query[key]!;
  return Array.isArray(value) ? value[0] : value;
}

export function handleError(err: unknown, res: NextApiResponse) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const message = parseErrorMessage(err) ?? "Internal server error.";
    return internalServerError(message, res);
  }
  throw err;
}

export function internalServerError(message: string, res: NextApiResponse) {
  return res.status(500).json({ message });
}

export function methodNotAllowed(res: NextApiResponse) {
  return res.status(405).json({ message: "Method not allowed." });
}

export function parseErrorMessage(err: Prisma.PrismaClientKnownRequestError) {
  return err.meta?.cause as string;
}
