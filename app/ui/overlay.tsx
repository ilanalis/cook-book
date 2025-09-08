import { Box } from "@mui/material";

const Overlay = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.5)",
        minHeight: "100%",
        inset: 0,
      }}
    />
  );
};

export default Overlay;
