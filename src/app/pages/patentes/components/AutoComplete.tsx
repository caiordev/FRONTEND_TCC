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
  const [selected, setSelected] = useState<string | null>("");
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("STATUS");
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
      value={selected}
      renderInput={(params) => <TextField {...params} label="Status" />}
      onChange={(_, newValue) => {
        setSelected(newValue);
      }}
    />
  );
};
