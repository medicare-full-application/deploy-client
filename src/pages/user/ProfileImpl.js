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
import { updateUser } from "../../redux/userApiCalls";

export const ProfileImpl = () => {
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const userType = useSelector((state) => state.user.userType);

  const updateProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const formNewData = {
    //   firstName: formData.get("first_name")
    //     ? formData.get("first_name")
    //     : currentUser.first_name,
    //   lastName: formData.get("last_name")
    //     ? formData.get("last_name")
    //     : currentUser.last_name,
    //   contactNo: formData.get("contact")
    //     ? formData.get("contact")
    //     : currentUser.contact,
    //   email: formData.get("email") ? formData.get("email") : currentUser.email,
    // };

    // console.log(formNewData);

    // const result = await updateUser(
    //   currentUser._id,
    //   userType,
    //   formNewData,
    //   dispatch,
    //   token
    // );
    // console.log(result);
    // if (result) {
    //   // setTriggerAdmin(triggerAdmin + "yk");
    //   console.log("Success");
    //   Swal.fire({
    //     icon: "success",
    //     title: "Successfully Updated!",
    //   });
    // } else {
    //   console.log("Unsuccess");
    //   Swal.fire({
    //     icon: "error",
    //     title: "Update Unsuccess!",
    //   });
    // }
  };

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
            href="/dashboard"
            style={{ marginRight: 10 }}
            color="warning"
            // endIcon={<AddIcon />}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" href="/profileUpdate">
            Update
          </Button>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt="User Image"
          src={user.imageUrl}
          sx={{ width: 220, height: 220 }}
        />
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
        <Box component="form" noValidate className="productForm" sx={{ m: 5 }}>
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
                  autoFocus
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  defaultValue={
                    user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "No Value"
                  }
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Birthday"
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
                      autoFocus
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      defaultValue={
                        user.experienceYears ? user.experienceYears : "No Value"
                      }
                      variant="standard"
                      margin="normal"
                      fullWidth
                      label="Experience Years"
                      autoFocus
                    />
                  </Grid>
                  <Grid item md={6}>
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
                  </Grid>
                  <Grid item md={6}>
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
                  </Grid>
                </>
              )}

              <Grid item md={6}>
                <TextField
                  defaultValue={user.hourRate ? user.hourRate : "No Value"}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Hour Rate"
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
                  autoFocus
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
    </Box>
  );
};
