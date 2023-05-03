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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../redux/userApiCalls";
import Swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://funforprogramming.com/">
        Medicare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

export default function SignUp() {
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputs, setInputs] = React.useState({});
  const [userType, setUserType] = React.useState("Doctor");

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

  const [pharmacyRegNoError, setPharmacyRegNoError] = React.useState(false);
  const [pharmacyNameError, setPharmacyNameError] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, newValue) => {
    console.log(event.target.name);
    setUserType(event.target.name);
    setValue(newValue);
    setInputs([]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(data.get("email"));

    if (userType === "Doctor") {
      if (!data.get("firstName")) {
        setFirstNameError(true);
      } else if (!data.get("lastName")) {
        setLastNameError(true);
      } else if (!data.get("email")) {
        setEmailError(true);
      } else if (!data.get("address")) {
        setAddressError(true);
      } else if (!data.get("contactNo")) {
        setContactError(true);
      } else if (!data.get("experienceYears")) {
        setNoOfExpError(true);
      } else if (!data.get("dateOfBirth")) {
        setDobError(true);
      } else if (!data.get("NIC")) {
        setNicError(true);
      } else if (!data.get("medicalRegNo")) {
        setMedicalRegNoError(true);
      } else if (!data.get("password")) {
        setPasswordError(true);
      } else {
        let doctor = inputs;
        const userData = {
          user: {
            email: data.get("email"),
            password: data.get("password"),
            userType: userType,
            userStatus: true,
          },
          doctor,
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
            const result = await userRegister("Doctor", userData);
            if (result) {
              console.log("User registration completed!");
              Swal.fire(
                "Doctor Registration!",
                "User registration completed!",
                "success"
              );
              navigate("/");
            } else {
              Swal.fire(
                "Doctor Registration!",
                "User registration uncompleted!",
                "warning"
              );
              console.log("Get user data unsuccess");
            }
          }
        });
      }
    } else if (userType === "Patient") {
      if (!data.get("firstName")) {
        setFirstNameError(true);
      } else if (!data.get("lastName")) {
        setLastNameError(true);
      } else if (!data.get("email")) {
        setEmailError(true);
      } else if (!data.get("address")) {
        setAddressError(true);
      } else if (!data.get("contactNo")) {
        setContactError(true);
      } else if (!data.get("dateOfBirth")) {
        setDobError(true);
      } else if (!data.get("NIC")) {
        setNicError(true);
      } else if (!data.get("password")) {
        setPasswordError(true);
      } else {
        let patient = inputs;
        const userData = {
          user: {
            email: data.get("email"),
            password: data.get("password"),
            userType: userType,
            userStatus: true,
          },
          patient,
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
            const result = await userRegister("Patient", userData);
            if (result) {
              console.log("User registration completed!");
              Swal.fire(
                "Patient Registration!",
                "User registration completed!",
                "success"
              );
              navigate("/");
            } else {
              Swal.fire(
                "Patient Registration!",
                "User registration uncompleted!",
                "warning"
              );
              console.log("Get user data unsuccess");
            }
          }
        });
      }
    } else if (userType === "Pharmacy") {
      if (!data.get("pharmacyName")) {
        setPharmacyNameError(true);
      } else if (!data.get("pharmacyRegNo")) {
        setPharmacyRegNoError(true);
      } else if (!data.get("email")) {
        setEmailError(true);
      } else if (!data.get("address")) {
        setAddressError(true);
      } else if (!data.get("contactNo")) {
        setContactError(true);
      } else if (!data.get("password")) {
        setPasswordError(true);
      } else {
        let pharmacist = inputs;
        const userData = {
          user: {
            email: data.get("email"),
            password: data.get("password"),
            userType: "Pharmacist",
            userStatus: true,
          },
          pharmacist,
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
            const result = await userRegister("Pharmacist", userData);
            if (result) {
              console.log("Pharmacy registration completed!");
              Swal.fire(
                "Pharmacy Registration!",
                "User registration completed!",
                "success"
              );
              navigate("/");
            } else {
              Swal.fire(
                "Pharmacy Registration!",
                "User registration uncompleted!",
                "warning"
              );
              console.log("Get user data unsuccess");
            }
          }
        });
      }
    }

    console.log(inputs);
  };

  const handleChangeData = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="Doctor"
                name="Doctor"
                {...a11yProps(0)}
                icon={<LocalHospitalIcon />}
                iconPosition="start"
              />
              <Tab
                label="Patient"
                name="Patient"
                {...a11yProps(1)}
                icon={<FaceIcon />}
                iconPosition="start"
              />
              <Tab
                label="Pharmacy"
                name="Pharmacy"
                {...a11yProps(2)}
                icon={<VaccinesIcon />}
                iconPosition="start"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
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
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    error={noOfExpError}
                    autoComplete="experienceYears"
                    name="experienceYears"
                    required
                    fullWidth
                    id="experienceYears"
                    label="No of Experience Years"
                    autoFocus
                    type="number"
                    onChange={(e) => {
                      setNoOfExpError(false);
                      handleChangeData(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={dobError}
                    // focused
                    autoFocus
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date of Birth"
                    name="dateOfBirth"
                    autoComplete="dateOfBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setDobError(false);
                      handleChangeData(e);
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={medicalRegNoError}
                    required
                    fullWidth
                    id="medicalRegNo"
                    label="Medical Reg No"
                    name="medicalRegNo"
                    autoComplete="medicalRegNo"
                    onChange={(e) => {
                      setMedicalRegNoError(false);
                      handleChangeData(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel
                      htmlFor="password"
                      name="password"
                      id="password"
                    >
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
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
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
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                </Grid>
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

                <Grid item xs={12} sm={6}>
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
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel
                      htmlFor="password"
                      name="password"
                      id="password"
                    >
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={pharmacyNameError}
                    required
                    fullWidth
                    id="pharmacyName"
                    label="Pharmacy Name"
                    name="pharmacyName"
                    autoComplete="pharmacyName"
                    onChange={(e) => {
                      setPharmacyNameError(false);
                      handleChangeData(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={pharmacyRegNoError}
                    required
                    fullWidth
                    id="pharmacyRegNo"
                    label="Medical Reg No"
                    name="pharmacyRegNo"
                    autoComplete="pharmacyRegNo"
                    onChange={(e) => {
                      setPharmacyRegNoError(false);
                      handleChangeData(e);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel
                      htmlFor="password"
                      name="password"
                      id="password"
                    >
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
