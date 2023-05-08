import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import FaceIcon from "@mui/icons-material/Face";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, userChildRegister, userRegister } from "../../../../redux/userApiCalls";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { removeOtherUsers } from "../../../../redux/userRedux";
import { v4 as uuidv4 } from 'uuid';

export default function AddChildImpl() {
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputs, setInputs] = React.useState({});
  // const [userType, setUserType] = React.useState("Doctor");

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [addressError, setAddressError] = React.useState(false);
  const [contactError, setContactError] = React.useState(false);
  const [noOfExpError, setNoOfExpError] = React.useState(false);
  const [dobError, setDobError] = React.useState(false);
  const [nicError, setNicError] = React.useState(false);
  const [medicalRegNoError, setMedicalRegNoError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [requestTrigger, setRequestTrigger] = React.useState("s");

  const childrenIds = useSelector(
    (state) => state.user.currentUser.childrenIds
  );

  const userId = useSelector((state) => state.user.currentUser._id);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userType = useSelector((state) => state.user.userType);
  const token = useSelector((state) => state.user.token);
  const uuid = uuidv4();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeOtherUsers());
      const result = await getUsers("Patient", dispatch, token);
      if (result) {
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [requestTrigger]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("firstName")) {
      setFirstNameError(true);
    } else if (!data.get("lastName")) {
      setLastNameError(true);
    } else if (!data.get("dateOfBirth")) {
      setDobError(true);
    } else {
      //     let childrenIdList = childrenIds.push(); //write new endpoint
      //   let patient = {inputs, "childrenId":[]};
      let patient = {...inputs, email: uuid+"@gmail.com", userStatus:false, address:currentUser.address, contactNo: currentUser.contactNo};
      const userData = {
        // user: {
        //   email: uuid+"@gmail.com",
        //   password: 123,
        //   userType: userType,
        //   userStatus: true,
        // },
        patient, //childrenId
      };
      console.log(userData);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#378cbb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Register!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await userChildRegister(userId, userData);
          if (result) {
            console.log("Patient child registration completed!");
            Swal.fire(
              "Patient Child Registration!",
              "Patient child registration completed!",
              "success"
            );
            setRequestTrigger(requestTrigger+"s");
            navigate("/addChild");
          } else {
            Swal.fire(
              "Patient child Registration!",
              "Patient child registration uncompleted!",
              "warning"
            );
            console.log("Get user data unsuccess");
          }
        }
      });
    }

    console.log(inputs);
  };

  const handleChangeData = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Grid container direction="column">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography variant="h3">Add Children</Typography>
        </Grid>
        {/* <Button
          variant="contained"
          color="third"
          href="/patient"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button> */}
      </Grid>
      <Box
        sx={{
          my: 1,
          mx: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className="productForm"
          sx={{ m: 5 }}
        >
          {/* <div className="productFormLeft"> */}
          <Grid container spacing={4}>
            {/* <Grid item md={10}> */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameError}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setFirstNameError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lastNameError}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastNameError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <TextField
                  error={emailError}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmailError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid> */}
              {/* <Grid item xs={6}>
                <TextField
                  error={addressError}
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onChange={(e) => {
                    setAddressError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={contactError}
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact Number"
                  name="contactNo"
                  autoComplete="mobileNo"
                  onChange={(e) => {
                    setContactError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  error={dobError}
                  focused
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateOfBirth"
                  autoComplete="dateOfBirth"
                  type="date"
                  onChange={(e) => {
                    setDobError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <TextField
                  error={nicError}
                  autoComplete="nic"
                  name="NIC"
                  required
                  fullWidth
                  id="NIC"
                  label="NIC"
                  // autoFocus
                  onChange={(e) => {
                    setNicError(false);
                    handleChangeData(e);
                  }}
                />
              </Grid> */}

              {/* <Grid item xs={6}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="password" name="password" id="password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={passwordError}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={(e) => {
                      setPasswordError(false);
                      handleChangeData(e);
                    }}
                  />
                </FormControl>
              </Grid> */}
            </Grid>
            <Grid
              item
              md={12}
              container
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                size="large"
                color="primary"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
