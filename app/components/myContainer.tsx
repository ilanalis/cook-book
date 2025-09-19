import { Container } from "@mui/material";
import React, { ReactNode } from "react";

interface MyContainerProps {
  children: ReactNode;
}

const MyContainer: React.FC<MyContainerProps> = ({ children }) => {
  return (
    <Container
      sx={{
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "rgba(63, 55, 55, 0.6)",
        color: "#fff",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        p: "30px",
        mt: "30px",
      }}
    >
      {children}
    </Container>
  );
};

export default MyContainer;
