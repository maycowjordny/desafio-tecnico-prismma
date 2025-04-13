import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
};

export function Input({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          inputRef={ref}
          type={type}
          value={field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
