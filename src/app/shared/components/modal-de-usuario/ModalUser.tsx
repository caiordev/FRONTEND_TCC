import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";

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

export const ModalUser: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    console.log("Usuário adicionado");
    setOpen(false);
  };
  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
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
          <TextField
            label="Nome"
            variant="outlined"
            size="small"
            placeholder="Digite o nome..."
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            placeholder="Digite o Email..."
            type="email"
          />
          <TextField
            label="Senha"
            variant="outlined"
            size="small"
            placeholder="Digite a Senha..."
            type="password"
          />
          <TextField
            label="Tipo"
            variant="outlined"
            size="small"
            placeholder="Digite o Tipo de Usuário..."
            type="number"
          />
          <Box display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleClick}>
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
