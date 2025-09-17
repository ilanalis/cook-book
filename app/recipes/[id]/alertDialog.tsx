import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";

interface AlertDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  recipeTitle: string;
  isLoading: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  handleClose,
  handleDelete,
  recipeTitle,
  isLoading,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "black", fontSize: "1.4rem" }}
          >
            The recipe &quot;<strong>{recipeTitle}</strong>&quot; will be
            permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            onClick={handleClose}
            sx={{ color: "black" }}
          >
            Disagree
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleDelete}
            autoFocus
            sx={{ color: "red" }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
