"use client";

import LoginForm from "@/auth/login-form";
import OAthButtons from "@/auth/oath-buttons";
import SignUpForm from "@/auth/signup-form";
import Overlay from "@/components/overlay";
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
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('/auth-background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        boxSizing: "border-box",
        p: "84px 15px 20px",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <Overlay />
      <Box
        sx={{
          mx: "auto",
          width: { xs: "90%", sm: "70%", md: "50%", lg: "500px" },
          mt: { xs: 5, md: 10 },
          p: 1,
          borderRadius: 8,
          backgroundColor: "rgba(63, 55, 55, 0.6)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          minHeight: { xs: "auto", md: "653px" },
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
