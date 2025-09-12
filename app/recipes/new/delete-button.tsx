import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Ingredient, Step } from "@/lib/definitions/recipes";
import React from "react";

interface DeleteIconComponentProps<
  T extends { id: string; stepNumber?: number }
> {
  id: string;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  type: "step" | "ingredient";
  validate: () => void;
}

const DeleteIconComponent = <T extends { id: string; stepNumber?: number }>({
  id,
  setItems,
  type,
  validate,
}: DeleteIconComponentProps<T>) => {
  const handleDeleteItem = () => {
    setItems((prev) => {
      const filteredItems = prev.filter((item) => item.id !== id);
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
    >
      Delete
    </Button>
  );
};

export default DeleteIconComponent;
