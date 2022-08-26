import { Delete, SaveAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useContext } from "react";
import { deleteContact, updateContact } from "../../../actions/contacts";
import Context from "../../../context/ContextProvider";

const ContactActions = ({ contact }) => {
  const {
    state: { currentUser, contacts },
    dispatch,
  } = useContext(Context);

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => updateContact(currentUser, dispatch, contact)}
      >
        <SaveAlt />
      </IconButton>
      <IconButton
        sx={{ cursor: "pointer" }}
        onClick={() => deleteContact(currentUser, dispatch, contact["_id"])}
      >
        <Delete />
      </IconButton>
    </Box>
  );
};

export default ContactActions;
