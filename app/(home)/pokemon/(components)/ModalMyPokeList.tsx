import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useMemo, useState } from "react";

interface MyPokeListProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const buttonStyle = {
  position: "absolute" as "absolute",
  right: 16,
  bottom: 16,
};

export default function ModalMyPokeList({
  open,
  handleClose,
}: MyPokeListProps) {
  const [myPokemon, setMyPokemon] = useState<string[]>([]);

  useMemo(() => {
    const storedPokemon = localStorage.getItem("pokemon");
    if (storedPokemon) {
      setMyPokemon(JSON.parse(storedPokemon));
    } else {
      setMyPokemon([]);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          My Pokemon List
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ul>
            {myPokemon.map((pokemon: string, index: number) => (
              <li key={index}>{pokemon}</li>
            ))}
          </ul>
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          sx={buttonStyle}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
