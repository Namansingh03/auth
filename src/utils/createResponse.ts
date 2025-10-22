
type ResponseType<T> = {
  success: boolean;
  data: T | null;
  message: string;
};

export const CreateResponse = <T>(
  success: boolean,
  data: T | null = null,
  message: string = ""
): ResponseType<T> => {
  return {
    success,
    data,
    message,
  };
};
