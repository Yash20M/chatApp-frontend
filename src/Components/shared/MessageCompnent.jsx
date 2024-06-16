import React, { memo } from "react";
import { orange } from "../../constants/color";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../../lib/Features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";
const MessageCompnent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user._id;
  // console.log("sedner kon ahe", sameSender);

  const timeAgo = moment(createdAt).fromNow();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        whileInView={{ opacity: 1, x: "0" }}
        style={{
          alignSelf: sameSender ? "flex-end" : "flex-start",
          backgroundColor: sameSender ? orange : "#262626",
          color: "white",
          fontWeight: 500,
          borderRadius: "15px",
          padding: "0.5rem",
          width: "fit-content",
        }}
      >
        {!sameSender && (
          <Typography
            variant="caption"
            color={"#2694ab"}
            fontSize={"14px"}
            fontWeight={600}
          >
            {sender.name}
          </Typography>
        )}

        {content && <Typography>{content}</Typography>}

        {/* Show Attachment */}
        {attachments.length > 0 &&
          attachments.map((attachm, index) => {
            const url = attachm.url;
            const file = fileFormat(url);
            return (
              <Box key={attachm.public_id}>
                <a
                  href={url}
                  key={attachm.public_id}
                  target="_blank"
                  download
                  style={{ color: "black" }}
                >
                  {
                    <RenderAttachment
                      keyId={attachm.public_id}
                      file={file}
                      url={url}
                    />
                  }
                </a>
              </Box>
            );
          })}

        <Typography
          variant="caption"
          fontSize={"14px"}
          color={sameSender ? "text.secondary" : "#c9c3c3"}
        >
          {timeAgo}
        </Typography>
      </motion.div>
    </>
  );
};

export default memo(MessageCompnent);
