import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/Features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  // const avatars = Array.isArray(avatar) ? avatar : [avatar];
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{ position: "relative" }}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar?.map((data, index) => (
            <Avatar
              key={Math.random() * 100 * index}
              src={transformImage(data)}
              alt={`avata${index}`}
              style={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: { xs: `0.5 + ${index}rem`, sm: `${index}rem` },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
