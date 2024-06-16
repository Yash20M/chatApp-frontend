import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkComponent, Navigate, useLocation } from "react-router-dom";
import { colorGray, matBlack } from "../../constants/color";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "User",
    path: "/admin/user-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <>
      <Stack
        width={w}
        direction={"column"}
        p={{ sm: "0.5rem", md: "3rem" }}
        spacing={"3rem"}
      >
        <Typography variant="h5" textTransform={"uppercase"}>
          ChatApp
        </Typography>

        <Stack spacing={"1rem"}>
          {adminTabs.map((tab, index) => (
            <Link
              to={tab.path}
              key={index}
              sx={
                location.pathname === tab.path && {
                  bgcolor: matBlack,
                  color: "white",
                  ":hover": {
                    color: "white",
                  },
                }
              }
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography fontSize={"1rem"}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))}
          <Link onClick={logoutHandler}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToAppIcon />
              <Typography fontSize={"1rem"}>Logout</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { isAdmin } = useSelector((state) => state.auth);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Grid container minHeight={"100vh"}>
        <Box
          display={{ xs: "block", md: "none" }}
          position={"fixed"}
          top="1rem"
          right={"1rem"}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Grid
          item
          lg={3}
          md={4}
          sx={{ display: { xs: "none", md: "block" } }}
          border={"2px solid red"}
        >
          <Sidebar />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          sx={{
            bgcolor: colorGray,
          }}
        >
          {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleClose}>
          <Sidebar w="50vw" />
        </Drawer>
      </Grid>
    </>
  );
};

export default AdminLayout;
