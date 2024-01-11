/* eslint-disable @typescript-eslint/no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

const lista = ["Admnistrador", "Usuário Comum"];

export const AutoCompleteModal: React.FC = () => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("TIPO");
  const [selected, setSelected] = useState<string | null>("");
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected,
      setValue: (_, newSelected) => setSelected(newSelected),
    });
  }, [registerField, fieldName, selected]);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      size="small"
      options={lista}
      value={selected}
      renderInput={(params) => (
        <TextField
          margin="normal"
          error={!!error}
          helperText={error}
          {...params}
          label="Tipo"
        />
      )}
      onChange={(_, newValue) => {
        setSelected(newValue);
        clearError();
      }}
    />
  );
};
