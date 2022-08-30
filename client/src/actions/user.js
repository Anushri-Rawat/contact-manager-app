import axios from "axios";
import fetchData from "./utils/fetchData";
const url = `http://localhost:8000/api/v1/users`;
export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    { url: `${url}/signup`, body: user },
    dispatch
  );
  if (result.user) {
    dispatch({
      type: "UPDATE_USER",
      payload: { token: result.token, ...result.user },
    });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Your account has been created successfully",
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: `${url}/login`, body: user }, dispatch);
  if (result.user) {
    dispatch({
      type: "UPDATE_USER",
      payload: { ...result.user, token: result.token },
    });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "User successfully logged in",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const logout = async (currentUser, dispatch) => {
  await fetchData(
    { url: `${url}/logout`, method: "GET", token: currentUser.token },
    dispatch
  );
  dispatch({ type: "UPDATE_USER", payload: null });
};

export const updateProfile = async (
  currentUser,
  profile,
  dispatch,
  newPassword
) => {
  try {
    const data = await axios.patch(
      "http://localhost:8000/api/v1/users/updateMe",
      profile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    if (data.status == "error" || data.status == "fail") {
      throw new Error(data.message);
    }

    if (data && !newPassword) {
      dispatch({
        type: "UPDATE_USER",
        payload: { ...data.data.data, token: currentUser.token },
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "User has been updated successfully",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: { open: true, severity: "error", message: error.message },
    });
    console.log(error);
    return null;
  }
};

export const getAllUsers = async (currentUser, dispatch) => {
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users`,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result.results > 0) {
    dispatch({ type: "UPDATE_ALL_USERS", payload: result.data.users });
  }
};

export const deleteUser = async (currentUser, dispatch, id) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users/${id}`,
      method: "DELETE",
      token: currentUser.token,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The user has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_USER_BY_ADMIN", payload: result.data });
  }

  dispatch({ type: "END_LOADING" });
};

export const updateUser = async (currentUser, dispatch, user) => {
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users/${user["_id"]}`,
      method: "PATCH",
      token: currentUser.token,
      body: user,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The user has been updated successfully",
      },
    });
    dispatch({ type: "UPDATE_USERINFO_BY_ADMIN", payload: result.data.user });
  }
};

export const updateCurrPassword = async (currentUser, body, dispatch) => {
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users/updatePassword`,
      method: "PATCH",
      token: currentUser.token,
      body,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "User has been updated successfully",
      },
    });
  }
};

export const forgotPassword = async (currentUser, body, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users/forgotPassword`,
      method: "POST",
      token: currentUser.token,
      body,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: result.status,
        message: result.message,
      },
    });
  }
};

export const resetPassword = async (currentUser, body, id, dispatch) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/users/resetPassword/${id}`,
      method: "POST",
      body,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Password changed",
      },
    });
  }
};

export const updateEvents = async (currentUser, body, dispatch) => {
  try {
    const data = await axios.patch(
      "http://localhost:8000/api/v1/users/updateMe",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    console.log(data);
    if (data.status == "error" || data.status == "fail") {
      throw new Error(data.message);
    }

    if (data) {
      dispatch({
        type: "ADD_EVENTS",
        payload: { eventsList: data.data.data.eventsList },
      });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Events has been added successfully",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: { open: true, severity: "error", message: error.message },
    });
    console.log(error);
    return null;
  }
};
