import { useEffect, useMemo, useState, useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import Context from "../../../context/ContextProvider";
import { getAllUsers } from "../../../actions/user";
import moment from "moment";
import UserActions from "./UserActions";

const UserInfo = () => {
  const [pageSize, setPageSize] = useState(5);
  const {
    state: { users, currentUser },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (users.length === 0) getAllUsers(currentUser, dispatch);
  }, [users]);

  const columns = useMemo(
    () => [
      {
        field: "photo",
        headerName: "Avatar",
        width: 80,
        renderCell: (params) => <Avatar src={params.row.photo} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: "Name",
        width: 150,
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
        field: "phoneNumber",
        headerName: "Phone Number",
        width: 150,
        editable: true,
      },
      {
        field: "role",
        headerName: "Role",
        width: 100,
        type: "singleSelect",
        valueOptions: ["user", "admin"],
        editable: true,
      },
      {
        field: "active",
        headerName: "Active",
        width: 100,
        type: "boolean",
        editable: "true",
      },
      {
        field: "created_at",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.created_at).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => <UserActions user={params.row} />,
        width: 200,
      },
    ],
    []
  );
  return (
    <Box sx={{ height: 415, width: "100%", margin: "0 auto" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mt: 2, mb: 2, fontWeight: 600 }}
      >
        Manage Users
      </Typography>
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
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

export default UserInfo;
