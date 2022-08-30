import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Link,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import Context from "../../context/ContextProvider";
import { useRef, useContext, useState } from "react";
import { updateProfile, updateCurrPassword } from "../../actions/user";
import moment from "moment";

const Profile = () => {
  const { state, dispatch } = useContext(Context);
  const { currentUser, profile } = state;
  const nameRef = useRef();
  const currentPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthdaydRef = useRef();
  const phoneNumberRef = useRef();
  const [newPassword, setNewPassword] = useState(false);

  const handleClose = () => {
    dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, open: false } });
    setNewPassword(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...profile, file, photoUrl },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("photo", profile.file);
    form.append("name", nameRef.current.value);
    form.append("birthday", new Date(birthdaydRef.current.value));
    form.append("phoneNumber", phoneNumberRef.current.value);
    if (newPassword) {
      const currentPassword = currentPasswordRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      updateCurrPassword(
        currentUser,
        { currentPassword, password, confirmPassword },
        dispatch
      );
    }
    updateProfile(currentUser, form, dispatch, newPassword);
  };

  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={currentUser?.name}
          />
          <TextField
            autoFocus
            margin="normal"
            id="birthday"
            label="Birthday"
            type="date"
            fullWidth
            inputRef={birthdaydRef}
            defaultValue={moment(currentUser?.birthday).format("YYYY-MM-DD")}
          />
          <TextField
            autoFocus
            margin="normal"
            id="Phone number"
            label="phoneNumber"
            type="string"
            fullWidth
            inputRef={phoneNumberRef}
            defaultValue={currentUser?.phoneNumber}
          />
          <label
            htmlFor="profilePhoto"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              margin: "10px 0",
            }}
          >
            <Avatar
              src={profile.photoUrl ? profile.photoUrl : currentUser?.photo}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </label>
          <Link onClick={() => setNewPassword(!newPassword)}>
            Update Password
          </Link>
          {newPassword && (
            <>
              <TextField
                label="Current Password"
                type="password"
                margin="normal"
                inputRef={currentPasswordRef}
                fullWidth
                inputProps={{ minLength: 8 }}
                required
              />
              <TextField
                label="Password"
                type="password"
                margin="normal"
                inputRef={passwordRef}
                fullWidth
                inputProps={{ minLength: 8 }}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                margin="normal"
                inputRef={confirmPasswordRef}
                fullWidth
                inputProps={{ minLength: 8 }}
                required
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Profile;
