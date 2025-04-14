import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  defaultValue?: any;
  helperText?: string;
};

export default function DateFieldInput({
  name,
  label,
  defaultValue,
  helperText,
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ? dayjs(defaultValue) : dayjs()}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateTimePicker
            sx={{ width: "100%", display: "flex" }}
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              onChange(newValue ? newValue.toDate() : null);
            }}
            format="DD/MM/YYYY HH:mm"
            slotProps={{
              textField: {
                error: !!error,
                helperText: error ? error.message : helperText,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
