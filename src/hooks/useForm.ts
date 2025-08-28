import { useState } from "react";

interface UseFormReturn<T> {
  formState: T;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onResetForm: () => void;
}

function useForm<T extends Record<string, unknown>>(
  initialForm: T
): UseFormReturn<T> {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return { formState, onInputChange, onResetForm };
}

export default useForm;