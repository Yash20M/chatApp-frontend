import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../Components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../Components/specific/Charts";
import {
  CurvedButton,
  SearchField,
} from "../../Components/styles/StyledComponents";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hooks";

const Dashboard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/admin/stats`,
    "dashboard-stats"
  );

  const { message } = data || {};
  useErrors([{ isError: error, error: error }]);

  const singleChat = message?.totalChatCount - message?.groupsCount || 0;

  const AppBar = (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "3rem",
          margin: "2rem 0",
          borderRadius: "1rem",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <AdminPanelSettingsIcon sx={{ fontSize: "2rem" }} />

          <SearchField type="text" placeholder="Search" />

          <CurvedButton>
            <SearchIcon />
            <Typography
              display={{
                xs: "none",
                sm: "block",
              }}
              fontWeight={600}
            >
              Search
            </Typography>
          </CurvedButton>

          <Box flexGrow={1} />
          <Typography
            display={{
              xs: "none",
              lg: "block",
            }}
            color={"rgba(0,0,0,0.7)"}
            textAlign={"center"}
          >
            {moment().format("MMMM Do YYYY")}
          </Typography>

          <IconButton>
            <NotificationIcon />
          </IconButton>
        </Stack>
      </Paper>
    </>
  );

  const Widgets = (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={"2rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"2rem 0"}
      >
        <Widget
          title={"Users"}
          value={message?.usersCount}
          Icon={<PersonIcon />}
        />
        <Widget
          title={"Chats"}
          value={message?.totalChatCount}
          Icon={<GroupIcon />}
        />
        <Widget
          title={"Messages"}
          value={message?.messagesCount}
          Icon={<MessageIcon />}
        />
      </Stack>
    </>
  );

  return (
    <>
      <AdminLayout>
        {loading ? (
          <Skeleton height={"100vh"} />
        ) : (
          <Container component={"main"}>
            {AppBar}

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={"2rem"}
              justifyContent={"center"}
              alignItems={{
                xs: "center",
                lg: "stretch",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  padding: "2rem 3rem",
                  width: { xs: "100%", md: "65%" },
                  borderRadius: "1rem",
                }}
              >
                <Typography variant="h4" margin={"2rem 0"}>
                  Last Messages
                </Typography>
                <LineChart valueArray={message?.messageChart || []} />
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: { xs: "100%", md: "35%" },
                }}
              >
                <DoughnutChart
                  labels={["Single Chats", "Group Chats"]}
                  valueArray={[singleChat, message?.groupsCount || 0]}
                />

                <Stack
                  direction={"row"}
                  position={"absolute"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  height={"100%"}
                >
                  <GroupIcon /> <Typography>vs</Typography>
                  <PersonIcon />
                </Stack>
              </Paper>
            </Stack>

            <Stack>{Widgets}</Stack>
          </Container>
        )}
      </AdminLayout>
    </>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          margin: "2rem 0",
          borderRadius: "1.5rem",
          width: "20rem",
        }}
      >
        <Stack alignItems={"center"} spacing={"1rem"}>
          <Typography
            sx={{
              color: "rgba(0,0,0,0.7)",
              borderRadius: "50%",
              border: "5px solid rgba(0,0,0,0.9)",
              width: "5rem",
              height: "5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Paper>
    </>
  );
};

export default Dashboard;
