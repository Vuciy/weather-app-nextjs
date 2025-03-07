import { IResponse } from "@/interfaces/IResponse";

export function success(message: string, content: any): IResponse {
  return {
    success: true,
    message: message,
    content: content,
  };
}
