import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hooks";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducer/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const closeSearch = () => dispatch(setIsSearch(false));

  const [searchUser] = useLazySearchUserQuery("");
  const [sendFriendRequest, isLoadingSendFriendReq] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const [users, setUsers] = useState([]);

  const search = useInputValidation("");

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request", { userId: id });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.message))
        .catch((err) => console.log(err));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search.value]);

  return (
    <>
      <Dialog open={isSearch} onClose={closeSearch}>
        <Stack
          padding={"2rem"}
          direction={"column"}
          sx={{ width: { xs: "18rem", md: "25rem" } }}
        >
          <DialogTitle textAlign={"center"}>Find People</DialogTitle>
          <TextField
            label=""
            value={search.value}
            onChange={search.changeHandler}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <List>
            {users.map((user, index) => (
              <UserItem
                user={user}
                key={user._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendReq}
              />
            ))}
          </List>
        </Stack>
      </Dialog>
    </>
  );
};

export default Search;
