import { Box, Button, Modal, Paper } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { IVFormErrors, VTextField } from "app/shared/forms";
import {
  IDetalheUsuario,
  UsuarioService,
} from "app/shared/services/api/usuários/UsuarioService";
import React, { useRef } from "react";
import { AutoCompleteModal } from "./components/AutoComplete";
import * as yup from "yup";

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface IDetalheUsuarioProps {
  NOME: string;
  EMAIL: string;
  SENHA: string;
  TIPO: string;
}

const formValidationUser: yup.Schema<IDetalheUsuarioProps> = yup
  .object()
  .shape({
    NOME: yup.string().required(),
    EMAIL: yup.string().email().required(),
    SENHA: yup.string().required(),
    TIPO: yup.string().required(),
  });

export const ModalUser: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (dados: IDetalheUsuario) => {
    formValidationUser
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        UsuarioService.createUsuario(dadosValidados).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            formRef.current?.setData({
              NOME: "",
              EMAIL: "",
              SENHA: "",
              TIPO: "",
            });
          }
        });
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      component={Paper}
      padding={1}
    >
      <Button variant="contained" onClick={handleOpen}>
        Adicionar Usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column" gap={1}>
          <Form ref={formRef} onSubmit={handleClick}>
            <VTextField
              sx={{ width: 300 }}
              margin="normal"
              name="NOME"
              label="Nome"
              variant="outlined"
              size="small"
              value={""}
              placeholder="Digite o nome..."
            />
            <VTextField
              sx={{ width: 300 }}
              margin="normal"
              name="EMAIL"
              label="Email"
              variant="outlined"
              size="small"
              value={""}
              placeholder="Digite o Email..."
              type="email"
            />
            <VTextField
              sx={{ width: 300 }}
              margin="normal"
              name="SENHA"
              label="Senha"
              variant="outlined"
              size="small"
              value={""}
              placeholder="Digite a Senha..."
              type="password"
            />
            <AutoCompleteModal />
          </Form>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                formRef.current?.submitForm();
              }}
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
