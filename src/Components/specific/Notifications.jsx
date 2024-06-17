import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useErrors } from "../../hooks/hooks";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { setIsNotification } from "../../redux/reducer/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const freindReqHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));

    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.error || "Something went wrong");
      }
      // requestId, accept
    } catch (error) {
      toast.error(error);
    }
  };

  const onCloseHandler = () => {
    dispatch(setIsNotification(false));
  };

  useErrors([{ error, isError }]);
  return (
    <>
      <Dialog open={isNotification} onClose={onCloseHandler}>
        <Stack
          p={{ sx: "1rem", sm: "2rem" }}
          maxWidth={"25rem"}
          sx={{ width: { xs: "18rem", md: "25rem" } }}
        >
          <DialogTitle>Notitification</DialogTitle>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {data?.message?.length > 0 ? (
                data?.message?.map((notify, index) => (
                  <NotificationsItem
                    sender={notify.sender}
                    _id={notify._id}
                    handler={freindReqHandler}
                    key={notify._id}
                  />
                ))
              ) : (
                <Typography textAlign={"center"}>0 Notifications</Typography>
              )}
            </>
          )}
        </Stack>
      </Dialog>
    </>
  );
};

const NotificationsItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

        <Typography
          variant="body1"
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "--webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend Request`}
        </Typography>

        <Stack direction={{ xs: "column" }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
