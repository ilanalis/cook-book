import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

interface DeleteIconComponentProps<
  T extends { clientId: string; stepNumber?: number }
> {
  id: string;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  type: "step" | "ingredient";
  validate: () => void;
  isLoading: boolean;
}

const DeleteIconComponent = <
  T extends { clientId: string; stepNumber?: number }
>({
  id,
  setItems,
  type,
  isLoading,
}: DeleteIconComponentProps<T>) => {
  const handleDeleteItem = () => {
    setItems((prev) => {
      const filteredItems = prev.filter((item) => item.clientId !== id);
      if (type === "step") {
        const reindexedItems = filteredItems.map((item, index) => ({
          ...item,
          stepNumber: index + 1,
        }));
        return reindexedItems;
      }
      return filteredItems;
    });
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      sx={{ minWidth: "100px", height: "50px" }}
      color="warning"
      onClick={handleDeleteItem}
      disabled={isLoading}
    >
      Delete
    </Button>
  );
};

export default DeleteIconComponent;
