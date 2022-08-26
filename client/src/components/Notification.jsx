import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import Context from "../context/ContextProvider";

const Notification = () => {
  const {
    state: { alert },
    dispatch,
  } = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch({
      type: "UPDATE_ALERT",
      payload: { ...alert, open: false },
    });
  };
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={alert.severity}
        sx={{ width: "100%" }}
        variant="filled"
        elevation={6}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
