import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/layout/AdminLayout";
import RenderAttachment from "../../Components/shared/RenderAttachment";
import Table from "../../Components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hooks";
import { fileFormat, transformImage } from "../../lib/Features";

const columns = [
  {
    field: "id",
    headerName: "Id",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachment",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{ color: "black" }}
                >
                  <RenderAttachment file={file} url={url} />
                </a>
              </Box>
            );
          })
        : "No attachment";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"2rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },

  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 200,
  },
];

const MsgManagment = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/api/admin/messages`,
    "user-messages"
  );

  useErrors([{ isError: error, error: error }]);

  useEffect(() => {
    if (data) {
      setRows(
        data?.message.map((msg) => ({
          ...msg,
          id: msg._id,
          sender: {
            name: msg.sender.name,
            avatar: transformImage(msg.sender.avatar, 50),
          },
          createdAt: moment(msg.createdAt).format("MMM Do YYYY, h:mm:ss s"),
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Table
          heading={"All Messages"}
          columns={columns}
          rows={rows}
          rowHeight={150}
        />
      )}
    </AdminLayout>
  );
};

export default MsgManagment;
