import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import {
  useAddGroupMemberMutation,
  useAvailableFriendQuery,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducer/misc";

const AddMemberDialog = ({ chatId }) => {
  const [selectedMember, setSelectedMember] = useState([]);
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, isError, error, data } = useAvailableFriendQuery(chatId);
  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id)
        ? prev.filter((curElem) => curElem !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addMember("Adding member", { chatId, members: selectedMember });
    closeHandler();
  };
  useErrors([{ isError, error }]);

  return (
    <>
      <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"1rem"} width={"20rem"} spacing={"1rem"}>
          <DialogTitle textAlign={"center"}> Add Member</DialogTitle>

          <Stack spacing={"1rem"}>
            {isLoading ? (
              <Skeleton />
            ) : data?.friends.length > 0 ? (
              data?.friends.map((user) => {
                return (
                  <UserItem
                    key={user._id}
                    user={user}
                    handler={selectMemberHandler}
                    isAdded={selectedMember.includes(user._id)}
                  />
                );
              })
            ) : (
              <Typography textAlign={"center"}>No Friends</Typography>
            )}
          </Stack>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            spacing={"1rem"}
          >
            <Button onClick={closeHandler} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={addMemberSubmitHandler}
              variant="contained"
              disabled={isLoadingAddMember}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default AddMemberDialog;
