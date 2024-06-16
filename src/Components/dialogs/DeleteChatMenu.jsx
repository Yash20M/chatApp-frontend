import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducer/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hooks";
import {
  useDeletChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [deleteChat, _, deleteChatData] =
    useAsyncMutation(useDeletChatMutation);

  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation
  );

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteOptionAnchor = null;
  };

  const leaveGroupHandler = () => {
    leaveGroup("Leaving Group", selectedDeleteChat.chatId);
    closeHandler();
  };

  const deleteChatHandler = () => {
    deleteChat("Deleting Chat...", selectedDeleteChat.chatId);

    closeHandler();s
  };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <>
      <Menu
        open={isDeleteMenu}
        onClose={closeHandler}
        anchorEl={deleteOptionAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Stack
          sx={{ width: "10rem", padding: "0.5rem", cursor: "pointer" }}
          direction={"row"}
          alignItems={"center"}
          spacing={"0.5rem"}
          onClick={
            selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler
          }
        >
          {selectedDeleteChat.groupChat ? (
            <>
              <ExitToAppIcon />
              <Typography>Leave Group</Typography>
            </>
          ) : (
            <>
              <DeleteIcon />
              <Typography>Delete Chat</Typography>
            </>
          )}
        </Stack>
      </Menu>
    </>
  );
};

export default DeleteChatMenu;
