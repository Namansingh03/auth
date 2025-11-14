
type ResponseType<T> = {
  success: boolean;
  data: T | null;
  message: string;
  errorResponse : boolean
};

export const createResponse = <T>(
  success: boolean,
  data: T | null = null,
  message: string = "",
  errorResponse : boolean = true
): ResponseType<T> => {
  return {
    success,
    data,
    message,
    errorResponse
  };
};