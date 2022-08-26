import {
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
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

  // const [countryCode, setCountryCode] = useState("IN");
  // const [stateCode, setStateCode] = useState("DL");

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();
  const categoryRef = useRef();
  //   useEffect(() => {
  //     fetchCountry();
  //   }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const category = categoryRef.current.value;
    const contact = {
      contact_name: name,
      email,
      phone_number: phoneNumber,
      address,
      city,
      state,
      country,
      category,
    };
    createContact(currentUser, dispatch, contact, contacts);
  };
  return (
    <Box sx={{ padding: { sm: "0", md: "0 20px" } }}>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
        Basic Contact form
      </Typography>
      <form onSubmit={formSubmitHandler}>
        <Grid container rowSpacing={0} columnSpacing={{ sm: 3, md: 6 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              type="text"
              margin="normal"
              inputRef={nameRef}
              fullWidth
              required
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
          <Grid item xs={12}>
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
