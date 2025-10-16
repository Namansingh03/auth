export type ServerResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export function createResponse<T>(success: boolean, data: T, message: string): ServerResponse<T> {
  return { success, data, message };
}
