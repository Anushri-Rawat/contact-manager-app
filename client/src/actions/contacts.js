import fetchData from "./utils/fetchData";
import axios from "axios";

const url = `http://localhost:8000/api/v1/contacts`;
export const getAllContacts = async (currentUser, dispatch) => {
  const result = await fetchData(
    {
      url,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result.results > 0) {
    dispatch({ type: "UPDATE_ALL_CONTACTS", payload: result.data });
  }
};
export const getContactsCategory = async (currentUser, dispatch) => {
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/contacts/contact-category`,
      method: "GET",
      token: currentUser.token,
    },
    dispatch
  );
  if (result.category.length > 0) {
    dispatch({ type: "UPDATE_CONTACTS_CATEGORY", payload: result.category });
  }
};

export const deleteContact = async (currentUser, dispatch, id) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/contacts/${id}`,
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
        message: "The contact has been deleted successfully",
      },
    });

    dispatch({ type: "DELETE_CONTACT_BY_ADMIN", payload: result.data });
  }

  dispatch({ type: "END_LOADING" });
};

export const createContact = async (currentUser, dispatch, body) => {
  try {
    const data = await axios.post(
      `http://localhost:8000/api/v1/contacts`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "The contact has been updated successfully",
        },
      });
      dispatch({
        type: "ADDED_A_NEW_CONTACT",
        payload: data.data.data,
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

export const updateContact = async (currentUser, dispatch, contact) => {
  console.log(contact);
  const result = await fetchData(
    {
      url: `http://localhost:8000/api/v1/contacts/${contact["_id"]}`,
      method: "PATCH",
      token: currentUser.token,
      body: contact,
    },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "The contact has been updated successfully",
      },
    });
    dispatch({ type: "UPDATE_CONTACTINFO_BY_ADMIN", payload: result.data });
  }
};
