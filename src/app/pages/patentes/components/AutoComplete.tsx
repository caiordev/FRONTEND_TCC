/* eslint-disable @typescript-eslint/no-unused-vars */
import { Autocomplete, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

const lista = [
  "Anulado",
  "Em Sigilo",
  "Arquivado",
  "Indeferido",
  "Deferido",
  "Concedido",
  "Extinta",
];

export const AutoComplete: React.FC = () => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("STATUS");

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
      options={lista}
      noOptionsText="Sem opções"
      disablePortal
      value={selected}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Status"
          error={!!error}
          helperText={error}
        />
      )}
      onChange={(_, newValue) => {
        setSelected(newValue);
        clearError();
      }}
    />
  );
};
