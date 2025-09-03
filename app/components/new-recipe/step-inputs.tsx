import { NewRecipeErrors, Step } from "@/lib/definitions/recipes";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface StepInputsProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  error: NewRecipeErrors | null;
}

const StepInputs: React.FC<StepInputsProps> = ({ steps, setSteps, error }) => {
  const handleStepChange = (stepNumber: number, value: string) => {
    setSteps((prev) => {
      const newSteps = [...prev];
      newSteps[stepNumber - 1].description = value;
      return newSteps;
    });
  };

  const handleAddingStep = () => {
    setSteps((prev) => [
      ...prev,
      { stepNumber: steps.length + 1, description: "" },
    ]);
  };

  return (
    <Box>
      <Typography variant="h2">Steps</Typography>
      {steps.map((step, i) => {
        return (
          <Box key={i}>
            <Box display="flex" gap={3} alignItems="center">
              <Typography>{step.stepNumber}.</Typography>
              <TextField
                type="text"
                name="step"
                label="Description"
                value={steps[i].description}
                onChange={(e) =>
                  handleStepChange(step.stepNumber, e.target.value)
                }
                error={
                  !!error?.steps?.items?.[i]?.properties?.description?.errors
                    ?.length
                }
                helperText={
                  error?.steps?.items?.[i]?.properties?.description?.errors?.[0]
                }
                variant="standard"
                autoFocus={i === steps.length - 1}
              />
            </Box>
          </Box>
        );
      })}
      <Button onClick={handleAddingStep} sx={{ fontSize: "1.3rem" }}>
        + add step
      </Button>
    </Box>
  );
};

export default StepInputs;
