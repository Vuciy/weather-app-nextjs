import { IResponse } from "@/interfaces/IResponse";

export function failure(message: string, error: any = null): IResponse {
  return {
    success: false,
    message: error?.message ?? message,
    content: null,
  };
}
