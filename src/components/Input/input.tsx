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
          value={type === "number" && field.value === 0 ? "0" : field.value}
          onChange={(e) => {
            const newValue = e.target.value;
            field.onChange(
              type === "number" ? (newValue ? +newValue : "") : newValue
            );
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
