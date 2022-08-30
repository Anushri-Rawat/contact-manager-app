import { useEffect, useMemo, useState, useContext } from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Context from "../../../context/ContextProvider";
import { getAllContacts } from "../../../actions/contacts";
import ContactActions from "./ContactsActions";
import { Routes, Route, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import moment from "moment";

const ContactsInfo = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(5);
  const {
    state: { contacts, currentUser },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    if (contacts.length === 0) getAllContacts(currentUser, dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "photo",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.photo} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "contact_name",
        headerName: "Name",
        width: 150,
        type: "string",
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
      },
      {
        field: "birthday",
        headerName: "Birthday",
        width: 150,
        renderCell: (params) =>
          moment(params.row.birthday).format("YYYY-MM-DD"),
        editable: true,
      },
      {
        field: "phone_number",
        headerName: "Phone No.",
        width: 150,
        type: "string",
        editable: true,
      },
      {
        field: "category",
        headerName: "Category",
        width: 100,
        type: "singleSelect",
        valueOptions: ["Friends", "Family", "Buisness", "Others"],
        editable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 200,
        type: "string",
        editable: true,
      },
      {
        field: "city",
        headerName: "City",
        width: 100,
        type: "string",
        editable: true,
      },
      {
        field: "state",
        headerName: "State",
        width: 100,
        type: "string",
        editable: true,
      },
      {
        field: "country",
        headerName: "Country",
        width: 100,
        type: "string",
        editable: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 200,
      },
      {
        field: "Actions",
        headerName: "Actions",
        width: 200,
        type: "actions",
        renderCell: (params) => <ContactActions contact={params.row} />,
      },
    ],
    []
  );
  return (
    <Box sx={{ height: 430, width: "100%" }}>
      <Box
        sx={{
          display: { sm: "flex", md: "grid" },
          gridTemplateColumns: "1fr 5fr",
          mt: 3,
          mb: 3,
          flexdirection: "column",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("createForm");
          }}
        >
          Add Contact
        </Button>
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          Manage Your Contacts
        </Typography>
      </Box>
      <DataGrid
        columns={columns}
        rows={contacts}
        getRowId={(row) => row._id}
        pageSize={pageSize}
        onPageSizeChange={(size) => setPageSize(size)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default ContactsInfo;
