import React from "react";
import AppLayout from "../Components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box bgcolor={"#ececec"} height="100%">
        <Typography p={"2rem"} variant="h5" textAlign={"center"}>
          Select a friend to Chat
        </Typography>
      </Box>
    </>
  );
};

export default AppLayout()(Home);
