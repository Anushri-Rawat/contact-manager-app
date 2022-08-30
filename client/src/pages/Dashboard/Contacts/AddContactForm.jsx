import {
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Avatar,
} from "@mui/material";
import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import { createContact } from "../../../actions/contacts";
import Context from "../../../context/ContextProvider";
import { Country, State, City } from "country-state-city";

const AddContactForm = () => {
  const {
    state: { currentUser, contacts },
    dispatch,
  } = useContext(Context);
  const [imgFiles, setImgFiles] = useState(null);

  // const [countryCode, setCountryCode] = useState("IN");
  // const [stateCode, setStateCode] = useState("DL");

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const categoryRef = useRef();
  const birthdayRef = useRef();

  const handleChange = (e) => {
    const files = e.target.files[0];
    if (files) setImgFiles(files);
    console.log(imgFiles);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      "contact_name",
      `${firstnameRef.current.value} ${lastnameRef.current.value}`.trim(" ")
    );
    form.append("email", emailRef.current.value);
    form.append("phone_number", phoneNumberRef.current.value);
    form.append("address", addressRef.current.value);
    form.append("city", cityRef.current.value);
    form.append("state", stateRef.current.value);
    form.append("country", countryRef.current.value);
    form.append("category", categoryRef.current.value);
    form.append("birthday", birthdayRef.current.value);
    form.append("photo", imgFiles);
    createContact(currentUser, dispatch, form);
  };
  return (
    <Box sx={{ padding: { sm: "0", md: "0 20px" } }}>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
        Basic Contact form
      </Typography>
      <form onSubmit={formSubmitHandler} encType="multipart/form-data">
        <Grid container rowSpacing={0} columnSpacing={{ sm: 2, md: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="FirstName"
              type="text"
              margin="normal"
              inputRef={firstnameRef}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LastName"
              type="text"
              margin="normal"
              inputRef={lastnameRef}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              type="email"
              placeholder="Enter email"
              margin="normal"
              inputRef={emailRef}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Birthday"
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              margin="normal"
              inputRef={birthdayRef}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone number"
              type="number"
              placeholder="Enter Phone number"
              margin="normal"
              inputRef={phoneNumberRef}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              type="email"
              placeholder="Enter email"
              margin="normal"
              inputRef={categoryRef}
              select
              required
              fullWidth
            >
              {["Family", "Friends", "Buisness", "Others"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              type="text"
              placeholder="Enter country"
              margin="normal"
              inputRef={countryRef}
              select
              fullWidth
            >
              {Country.getAllCountries().map((country) => (
                <MenuItem key={country.countryCode} value={country.name}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="State"
              type="text"
              placeholder="Enter state"
              margin="normal"
              inputRef={stateRef}
              select
              fullWidth
            >
              {State.getStatesOfCountry("IN").map((state) => (
                <MenuItem key={state.isoCode} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="City"
              type="text"
              placeholder="Enter city"
              margin="normal"
              inputRef={cityRef}
              select
              fullWidth
            >
              {City.getCitiesOfState("IN", "DL").map((city) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              type="text"
              placeholder="Enter Address"
              margin="normal"
              inputRef={addressRef}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: "2px dashed rgb(118, 118, 118)",
                textAlign: "center",
                p: 2,
                margin: "18px 0",
              }}
            >
              <Typography variant="h6">Add Photo here</Typography>
              <p>Drop files or click here to upload</p>
              <label htmlFor="photo">
                {/* <Button variant="contained" size="small">
                  Choose image
                </Button> */}
                <input
                  accept="image/*"
                  id="photo"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  // style={{ display: "none" }}
                />
              </label>
            </Box>
          </Grid>
        </Grid>
        <IconButton>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </IconButton>
      </form>
    </Box>
  );
};

export default AddContactForm;
