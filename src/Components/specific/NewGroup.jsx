import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";
import {
  useAvailableFriendQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducer/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const dispatch = useDispatch();

  const { isError, error, isLoading, data } = useAvailableFriendQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const groupName = useInputValidation("");

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((curElem) => curElem !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  const submitHandler = () => {
    // Creating a group
    newGroup("Creating New Group", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{xs: "1rem", sm: "2rem" }}
        spacing={"1rem"}
        sx={{ width: { xs: "18rem", md: "25rem" } }}
      >
        <DialogTitle variant="h4" textAlign={"center"}>
          New Group
        </DialogTitle>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          <List>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.friends?.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))
            )}
          </List>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            onClick={closeHandler}
            size="large"
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={submitHandler}
            disabled={isLoadingNewGroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
