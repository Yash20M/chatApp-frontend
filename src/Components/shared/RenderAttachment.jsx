import React from "react";
import { transformImage } from "../../lib/Features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = ({ file, url, keyId }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;
      break;

    case "image":
      return (
        <img
          key={keyId}
          src={transformImage(url, 200)}
          alt="attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );
      break;

    case "audio":
      return <audio src={url} preload="none" controls />;
      break;

    default:
      return <FileOpen />;
  }

  return <></>;
};

export default RenderAttachment;
