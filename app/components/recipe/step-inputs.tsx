import { NewRecipeErrors, Step } from "@/lib/definitions/recipes";
import DeleteIconComponent from "@/components/recipe/delete-button";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface StepInputsProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  error: NewRecipeErrors | null;
  validate: () => void;
  isLoading: boolean;
}

const StepInputs: React.FC<StepInputsProps> = ({
  steps,
  setSteps,
  error,
  validate,
  isLoading,
}) => {
  const handleStepChange = (stepId: string, value: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.clientId === stepId ? { ...step, description: value } : step
      )
    );
  };

  const handleAddingStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        clientId: crypto.randomUUID(),
        stepNumber: steps.length + 1,
        description: "",
      },
    ]);
  };

  return (
    <Box>
      <Typography variant="h2">Steps</Typography>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {steps.map((step, i) => {
          return (
            <Box key={step.id || step.clientId}>
              <Box display="flex" gap={3} alignItems="center">
                <Typography>{step.stepNumber}.</Typography>
                <TextField
                  type="text"
                  name="step"
                  label="Description"
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(step.clientId, e.target.value)
                  }
                  error={
                    !!error?.steps?.items?.[i]?.properties?.description?.errors
                      ?.length
                  }
                  helperText={
                    error?.steps?.items?.[i]?.properties?.description
                      ?.errors?.[0]
                  }
                  variant="standard"
                  autoFocus={i === steps.length - 1}
                />
                <Box sx={{ width: 115 }}>
                  {i !== 0 && (
                    <DeleteIconComponent
                      id={step.clientId}
                      setItems={setSteps}
                      type={"step"}
                      validate={validate}
                      isLoading={isLoading}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={handleAddingStep}
        sx={{ fontSize: "1.3rem" }}
        disabled={isLoading}
      >
        + add step
      </Button>
    </Box>
  );
};

export default StepInputs;
