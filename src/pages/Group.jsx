import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../Components/layout/Loaders";
import AvatarCard from "../Components/shared/AvatarCard";
import UserItem from "../Components/shared/UserItem";
import { Link } from "../Components/styles/StyledComponents";
import { bgGradient, matBlack } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hooks";
import {
  useChatDetailsQuery,
  useDeletChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducer/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../Components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../Components/dialogs/AddMemberDialog")
);

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery();

  const groupDetials = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupname] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removedMember, isLoadingremoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadinDeleteGroup] =
    useAsyncMutation(useDeletChatMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdateValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetials.isError,
      error: groupDetials.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetials.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat?.members);

      return () => {
        setGroupName("");
        setGroupNameUpdatedValue("");
        setMembers([]);
        setIsEdit(false);
      };
    }
  }, [groupDetials.data]);

  const navigateBack = () => navigate("/");

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating group name....", {
      chatId,
      name: groupNameUpdateValue,
    });
  };

  const openConfirmDeleteHander = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMember = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("deleteing Group...", { chatId });
    closeConfirmDeleteHandler();
    navigate("/");
  };

  const removeMemberHandler = (userId) => {
    removedMember("Removing Member....", { chatId, userId });
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.8)",
              color: "white",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent={"center"}
        spacing="1rem"
        padding={"3rem"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdateValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)} // Ensure e.target.value is passed entirely
            />
            <IconButton onClick={updateGroupName} disabled={isLoadingGroupname}>
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton
              onClick={() => setIsEdit(true)}
              disabled={isLoadingGroupname}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={"1rem"}
        p={{
          xs: "1rem",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          size="large"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddMember}
        >
          Add Member
        </Button>
        <Button
          size="large"
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={openConfirmDeleteHander}
        >
          Delete Group
        </Button>
      </Stack>
    </>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sm={4}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
            height: "100%",
          }}
        >
          <GroupList myGroups={myGroups?.data} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "Center",
            padding: "1rem 3rem",
            position: "relative",
          }}
        >
          {IconBtns}
          {groupName && (
            <>
              {GroupName}
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>

              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                height={"50vh"}
                boxSizing={"border-box"}
                paddding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                overflow={"auto"}
              >
                {/* Member */}
                {isLoadingremoveMember ? (
                  <CircularProgress />
                ) : (
                  members.map((user) => {
                    return (
                      <UserItem
                        user={user}
                        isAdded
                        styling={{
                          boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                          padding: "1rem 2rem",
                          borderRadius: "1rem",
                        }}
                        handler={removeMemberHandler}
                        key={user._id}
                      />
                    );
                  })
                )}
              </Stack>

              {ButtonGroup}
            </>
          )}
        </Grid>
        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={chatId} />
          </Suspense>
        )}

        {confirmDeleteDialog && (
          <>
            <Suspense fallback={<Backdrop open />}>
              <ConfirmDeleteDialog
                open={confirmDeleteDialog}
                handleClose={closeConfirmDeleteHandler}
                deleteHandler={deleteHandler}
              />
            </Suspense>
          </>
        )}

        <Drawer
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileClose}
        >
          <GroupList w={"50vw"} myGroups={myGroups?.data} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <>
      <Stack
        width={w}
        sx={{ backgroundImage: bgGradient, height: "100%", overflow: "auto" }}
      >
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <GroupListItem key={group._id} group={group} chatId={chatId} />
          ))
        ) : (
          <Typography textAlign={"center"} p={"1rem"}>
            No Groups
          </Typography>
        )}
      </Stack>
    </>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <>
      <Link
        to={`?group=${_id}`}
        onClick={(e) => {
          if (chatId === _id) e.preventDefault();
        }}
      >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <AvatarCard avatar={avatar} />
          <Typography>{name}</Typography>
        </Stack>
      </Link>
    </>
  );
});

export default Group;
