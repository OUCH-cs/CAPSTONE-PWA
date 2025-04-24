import { FieldError } from "react-hook-form";

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

export type { IInputFieldProps };
