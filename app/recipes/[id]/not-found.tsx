import MyContainer from "@/components/myContainer";
import Overlay from "@/components/overlay";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('/recipe-bg.jpg')`,
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
      <MyContainer>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          p={10}
        >
          <Typography
            variant="h1"
            className="text-xl font-semibold"
            sx={{ color: "#f99090ff" }}
          >
            404 Not Found
          </Typography>
          <Typography sx={{ fontSize: 30, mt: 2 }}>
            Could not find the requested recipe.
          </Typography>
          <Button
            component={Link}
            href="/recipes"
            variant="contained"
            sx={{ mt: 4, fontSize: 20, width: 200 }}
          >
            Go Back
          </Button>
        </Box>
      </MyContainer>
    </Box>
  );
}
