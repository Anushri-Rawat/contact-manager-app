import { Delete, SaveAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useContext } from "react";
import { deleteUser, updateUser } from "../../../actions/user";
import Context from "../../../context/ContextProvider";

const UserActions = ({ user }) => {
  const {
    state: { currentUser, users },
    dispatch,
  } = useContext(Context);
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => updateUser(currentUser, dispatch, user)}
      >
        <SaveAlt />
      </IconButton>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => deleteUser(currentUser, dispatch, user["_id"])}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default UserActions;
