import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarViewMonthRounded as CalenderIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/Features";

const Profile = ({ user }) => {
  return (
    <>
      <Stack spacing={"2rem"} direction="column" alignItems={"center"}>
        <Avatar
          src={transformImage(user?.avatar?.url)}
          sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            border: "5px solid white",
          }}
        />
        <ProfileCard heading={"bio"} text={user?.bio} />
        <ProfileCard
          heading={"Username"}
          text={user?.username}
          Icon={UsernameIcon}
        />
        <ProfileCard heading={"Name"} text={user?.name} Icon={FaceIcon} />
        <ProfileCard 
          heading={"calender Icon"}
          text={moment(user?.createdAt).fromNow()}
          Icon={CalenderIcon}
        />
      </Stack>
    </>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        textAlign={"center"}
      >
        {Icon && <Icon sx={{ color: "white" }} />}

        <Stack>
          <Typography color={"white"} variant="body1">
            {text}
          </Typography>
          <Typography color={"gray"} variant="caption">
            {heading}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
export default Profile;
