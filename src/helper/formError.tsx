import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message: string | undefined;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex justify-center items-center gap-x-2 text-sm text-destructive">
         <FaExclamationTriangle className="h-4 w-4" />
         <p>{message}</p>
        </div>
    )
}