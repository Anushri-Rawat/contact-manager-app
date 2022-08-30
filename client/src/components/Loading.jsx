import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useContext } from "react";
import Context from "../context/ContextProvider";

const Loading = () => {
  const {
    state: { loading },
    dispatch,
  } = useContext(Context);
  return (
    <Backdrop open={loading} sx={{ zindex: 1000 }}>
      <CircularProgress sx={{ color: "white" }} />
    </Backdrop>
  );
};

export default Loading;
