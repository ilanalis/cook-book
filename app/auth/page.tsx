"use client";

import LoginForm from "@/components/auth/login-form";
import OAthButtons from "@/components/auth/oath-buttons";
import SignUpForm from "@/components/auth/signup-form";
import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Auth = () => {
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/auth-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowY: "auto",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      />
      <Box
        sx={{
          mx: "auto",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "500px" },
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 3,
          backgroundColor: "rgba(63, 55, 55, 0.6)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          minHeight: "653px",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
          >
            <Tab label="Log in" {...a11yProps(0)} />
            <Tab label="Sign up" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
          <OAthButtons isLoading={isLoading} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SignUpForm isLoading={isLoading} setIsLoading={setIsLoading} />
          <OAthButtons isLoading={isLoading} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Auth;
