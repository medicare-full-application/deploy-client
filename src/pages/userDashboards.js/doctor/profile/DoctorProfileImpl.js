import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { updateUser } from "../../../../redux/userApiCalls";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../../firebase";
import { useNavigate } from "react-router";

export const DoctorProfileImpl = () => {
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const user = useSelector((state) => state.user.currentUser);
  const userType = useSelector((state) => state.user.userType);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      firstName: formData.get("firstName")
        ? formData.get("firstName")
        : user.firstName,
      lastName: formData.get("lastName")
        ? formData.get("lastName")
        : user.lastName,
      NIC: formData.get("NIC") ? formData.get("NIC") : user.NIC,
      description: formData.get("description")
        ? formData.get("description")
        : user.description,
      address: formData.get("address") ? formData.get("address") : user.address,
      dateOfBirth: formData.get("dateOfBirth")
        ? formData.get("dateOfBirth")
        : user.dateOfBirth,
      contactNo: formData.get("contactNo")
        ? formData.get("contactNo")
        : user.contactNo,

      email: formData.get("email") ? formData.get("email") : user.email,
      experienceYears: formData.get("experienceYears")
        ? formData.get("experienceYears")
        : user.experienceYears,
      medicalRegNo: formData.get("medicalRegNo")
        ? formData.get("medicalRegNo")
        : user.medicalRegNo,
    };
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prevProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + prevProgress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image added unsuccess!",
          });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            let userData = {
              ...formNewData,
              imageUrl: downloadURL ? downloadURL : user.imageUrl,
            };

            const status = await updateUser(
              user._id,
              userType,
              userData,
              dispatch,
              token
            );

            if (status) {
              Swal.fire({
                title: "Success!",
                text: "Doctor profile update success!",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#378cbb",
                // showConfirmButton: false,
                // timer: 2000,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Doctor profile update unsuccess!",
              });
            }
          });
        }
      );
    } else {
      const status = await updateUser(
        user._id,
        userType,
        formNewData,
        dispatch,
        token
      );

      if (status) {
        Swal.fire({
          title: "Success!",
          text: "Doctor profile update success!",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#378cbb",
          // showConfirmButton: false,
          // timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Doctor profile update unsuccess!",
        });
      }
    }
  };

  const clickBackButton = () => {
    if (userType == "Doctor") {
      navigate("/doctorDashboard");
    } else if (userType == "Patient") {
      navigate("/patientDashboard");
    } else if (userType == "Pharmacist") {
      navigate("/pharmacistDashboard");
    } else if (userType == "Admin") {
      navigate("/dashboard");
    }
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={updateProductSubmit}
      // className="productForm"
      // sx={{ m: 5 }}
    >
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h3">User Profile</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              style={{ marginRight: 10 }}
              color="third"
              onClick={clickBackButton}
              // endIcon={<AddIcon />}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={1}>
            {/* <Button variant="contained" href="/profileUpdate"> */}
            {/* <Button variant="contained" type="submit">
              Update
            </Button> */}
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title="Upload your profile picture">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                id="file"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <Avatar
                alt="User Image"
                src={user.imageUrl}
                sx={{ width: 220, height: 220 }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
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
            className="productForm"
            sx={{ m: 5 }}
          >
            {/* <div className="productFormLeft"> */}
            <Grid container spacing={4}>
              {/* <Grid item md={10}> */}
              <Grid container spacing={4}>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.firstName ? user.firstName : "No Value"}
                    variant="standard"
                    // disabled
                    margin="normal"
                    fullWidth
                    label="First Name"
                    name="firstName"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.lastName ? user.lastName : "No Value"}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.NIC ? user.NIC : "No Value"}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="NIC"
                    name="NIC"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.address ? user.address : "No Value"}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Address"
                    name="address"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.contact ? user.contact : "No Value"}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Contact"
                    name="contactNo"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={user.email ? user.email : "No Value"}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    autoFocus
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    defaultValue={
                      user.dateOfBirth
                        ? user.dateOfBirth.substring(0, 10)
                        : "No Value"
                    }
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Birthday"
                    name="dateOfBirth"
                    autoFocus
                  />
                </Grid>

                {userType === "Doctor" && (
                  <>
                    <Grid item md={6}>
                      <TextField
                        defaultValue={
                          user.description ? user.description : "No Value"
                        }
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Description"
                        name="description"
                        autoFocus
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        defaultValue={
                          user.experienceYears
                            ? user.experienceYears
                            : "No Value"
                        }
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Experience Years"
                        name="experienceYears"
                        autoFocus
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        defaultValue={
                          user.medicalRegNo ? user.medicalRegNo : "No Value"
                        }
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Medical Reg No"
                        name="medicalRegNo"
                        autoFocus
                      />
                    </Grid>
                    {/* <Grid item md={6}>
                    <TextField
                      defaultValue={
                        user.noOfOngoingPatients
                          ? user.noOfOngoingPatients
                          : "No Value"
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                      label="No of Ongoing Patients"
                      autoFocus
                    />
                  </Grid> */}
                    {/* <Grid item md={6}>
                    <TextField
                      defaultValue={
                        user.totalPatients ? user.totalPatients : "No Value"
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                      label="Total Patients"
                      autoFocus
                    />
                  </Grid> */}
                  </>
                )}

                {/* <Grid item md={6}>
                <TextField
                  defaultValue={user.hourRate ? user.hourRate : "No Value"}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Hour Rate"
                  autoFocus
                />
              </Grid> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
