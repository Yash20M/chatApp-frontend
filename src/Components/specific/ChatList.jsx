import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUser = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <>
      <Stack
        width={w}
        direction={"column"}
        sx={{ overflowY: "auto", height: "100%" }}
      >
        {chats?.map((data, key) => {
          const { avatar, name, _id, members, groupChat } = data;

          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) =>
            onlineUser.includes(member)
          );

          return (
            <ChatItem
              index={key}
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={name}
              _id={_id}
              key={key}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handelDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default ChatList;
