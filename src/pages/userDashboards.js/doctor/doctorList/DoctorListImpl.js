import React, { useState } from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  doctorRequestToPatient,
  getDoctorUsers,
  getUsers,
  patientRequestToDoctor,
  updateUser,
} from "../../../../redux/userApiCalls";
import { TableComponent } from "../../../../components/TableComponent";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LinearProgress from "@mui/material/LinearProgress";
import {
  removeDoctorUsers,
  removeOtherUsers,
} from "../../../../redux/userRedux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export const DoctorListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [requestTrigger, setRequestTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser._id);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userType = useSelector((state) => state.user.userType);
  const doctorUsers = useSelector((state) => state.user.doctorUsers);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [availableTime, setAvailableTime] = React.useState(null);
  const [timeFlag, setTimeFlag] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [inputs, setInputs] = React.useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeDoctorUsers());
      const result = await getDoctorUsers(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading, requestTrigger]);

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeOtherUsers());
      const result = await getUsers("Patient", dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading1(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading1, requestTrigger]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];

      doctorUsers.map(async (item) => {
        let isRequest = "None";
        let isRequestChild = "None";
        let childId = null;

        const isoDateString = item.dateOfBirth;
        const dateOnlyString = isoDateString.substring(0, 10);

        if (currentUser.haveChildren) {
          currentUser.childrenIds.map((childrenId) => {
            otherUsers.map((patient) => {
              if (patient._id == childrenId) {
                patient.requests.map((request) => {
                  if (request.doctorId == item._id) {
                    isRequestChild = request.isRequest;
                    childId = patient._id;
                  }
                });
              }
            });
          });
        }

        if (userType == "Patient") {
          item.requests.map((request) => {
            if (request.patientId === userId) {
              isRequest = request.isRequest;
            }
          });
        }

        await rowData.push({
          id: item._id,
          col1: item.firstName,
          col2: item.lastName,
          col3: item.NIC,
          col4: item.imageUrl,
          col5: item.haveChildren,
          col6: item.address,
          col7: item.contactNo,
          col8: item.email,
          col9: item.userStatus,
          col10: dateOnlyString,
          startTime: item.startTime,
          endTime: item.endTime,
          isRequest: isRequest,
          isRequestChild: isRequestChild,
          childId: childId,
        });

        isRequest = "None";
        isRequestChild = "None";
        childId = null;
      });
      setRows(rowData);
      console.log(rowData);
    };
    getNormalUserData();
  }, [trigger, requestTrigger]);

  const sendRequestToPatient = (id) => {
    const data = {
      patientId: id,
      isRequest: "Sent",
    };

    const patientData = {
      doctorId: userId,
      isRequest: "Sent",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const doctorRequestStatus = await doctorRequestToPatient(
          userId,
          data,
          dispatch,
          token
        );
        const patientRequestStatus = await patientRequestToDoctor(
          id,
          patientData,
          dispatch,
          token
        );
        if (doctorRequestStatus && patientRequestStatus) {
          setRequestTrigger(trigger + "s");
          Swal.fire("Request Sent!", "Request sent success.", "success");
        } else {
          Swal.fire(
            "Request Can't Sent!",
            "Request sent unsuccess.",
            "warning"
          );
        }
      }
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        alert(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const changeItem = (id, userStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          userStatus: userStatus,
        };
        const result = await updateUser(id, "Doctor", data, dispatch, token);
        if (result) {
          setRequestTrigger(requestTrigger + "Q");
          Swal.fire("Updated!", "Your note successfully added.", "success");
        } else {
          Swal.fire(
            "Update Unsuccess!",
            "Your note added unsuccessfully..",
            "warning"
          );
        }
      }
    });
  };

  const checkAvailableTime = (id) => {
    console.log(id);
  };

  const editDoctor = (id) => {
    console.log(id);
  };

  const changeStartTime = (id) => {
    handleOpen();
    setTitle("Set Start Time");
    setTime("Start Time");
    setTimeFlag(true);
    setId(id);
    console.log(inputs);
  };

  const changeEndTime = (id) => {
    handleOpen();
    setTitle("Set End Time");
    setTime("End Time");
    setTimeFlag(false);
    setId(id);
    console.log(inputs);
  };

  const handleChangeData = (e) => {
    setInputs((prev) => {
      return { [e.target.name]: e.target.value };
    });
  };

  const setTimeSubmit = async (e) => {
    // await updateUser();
    // console.log(e.target.value);
    handleClose();
    console.log(inputs);
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await updateUser(id, "Doctor", inputs, dispatch, token);
        if (result) {
          console.log("Patient child registration completed!");
          Swal.fire("Available Time!", "Available time set!", "success");
          setRequestTrigger(requestTrigger + "s");
          // navigate("/addChild");
        } else {
          Swal.fire(
            "Available Time!",
            "Available time set uncompleted!",
            "warning"
          );
        }
      } else {
        handleOpen();
      }
    });
  };

  const sendRequestToPatientAdmin = (id, requestType) => {
    const data = {
      patientId: userId,
      isRequest: requestType,
    };

    const patientData = {
      doctorId: id,
      isRequest: requestType,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${requestType} Request!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const doctorRequestStatus = await doctorRequestToPatient(
          id,
          data,
          dispatch,
          token
        );
        const patientRequestStatus = await patientRequestToDoctor(
          userId,
          patientData,
          dispatch,
          token
        );
        if (doctorRequestStatus && patientRequestStatus) {
          setRequestTrigger(trigger + "s");
          Swal.fire("Request Sent!", "Request sent success.", "success");
        } else {
          Swal.fire(
            "Request Can't Sent!",
            "Request sent unsuccess.",
            "warning"
          );
        }
      }
    });
  };

  const sendRequestToPatientChild = (id, childId, requestType) => {
    const data = {
      patientId: childId,
      isRequest: requestType,
    };

    const patientData = {
      doctorId: id,
      isRequest: requestType,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${requestType} Request!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const doctorRequestStatus = await doctorRequestToPatient(
          id,
          data,
          dispatch,
          token
        );
        const patientRequestStatus = await patientRequestToDoctor(
          childId,
          patientData,
          dispatch,
          token
        );
        if (doctorRequestStatus && patientRequestStatus) {
          setRequestTrigger(trigger + "s");
          Swal.fire("Request Sent!", "Request sent success.", "success");
        } else {
          Swal.fire(
            "Request Can't Sent!",
            "Request sent unsuccess.",
            "warning"
          );
        }
      }
    });
  };

  const columns = [
    // { field: "id", headerName: "User Id", width: 300 },
    { field: "col3", headerName: "NIC", width: 140 },
    {
      field: "col1",
      headerName: "Full Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.col4} alt="" />
            {params.row.col1 + " " + params.row.col2}
          </div>
        );
      },
    },

    { field: "col8", headerName: "Email", width: 220 },
    { field: "col6", headerName: "Address", width: 220 },
    { field: "col7", headerName: "Contact", width: 120 },
    {
      field: "startTime",
      headerName: "Available Start Time",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.startTime
                ? params.row.startTime
                : userType == "Admin"
                ? "Set Start Time"
                : "Not set yet!"}
              {userType == "Admin" && (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => changeStartTime(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "endTime",
      headerName: "Available End Time",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.endTime
                ? params.row.endTime
                : userType == "Admin"
                ? "Set Start Time"
                : "Not set yet!"}
              {userType == "Admin" && (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => changeEndTime(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "col10",
      headerName: "Birthday",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* params.row.isCancel */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.col10}
            </Stack>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: userType == "Admin" ? "User Activation" : "Action",
      width: 450,
      renderCell: (params) => {
        return (
          <>
            {userType == "Admin" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                {params.row.col9 ? (
                  <Tooltip title="User Deactivation">
                    <IconButton
                      aria-label="edit"
                      size="large"
                      color="success"
                      onClick={() => changeItem(params.row.id, false)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="User Activation">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="error"
                      onClick={() => changeItem(params.row.id, true)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {/* <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => editDoctor(params.row.id)}
                >
                  <EditIcon />
                </IconButton> */}
              </Stack>
            ) : (
              <>
                {/* <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="blue"
                    onClick={() => checkAvailableTime(params.row.id)}
                  >
                    <AccessTimeIcon />
                  </IconButton>
                </Stack> */}
                {params.row.isRequest == "None" ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button variant="contained" size="small" color="blue">
                      None
                    </Button>
                  </Stack>
                ) : params.row.isRequest == "Sent" ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="third"
                      onClick={() =>
                        sendRequestToPatientAdmin(params.row.id, "Accept")
                      }
                    >
                      Accept the Request
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="red"
                      onClick={() =>
                        sendRequestToPatientAdmin(params.row.id, "Decline")
                      }
                    >
                      Decline the Request
                    </Button>
                  </Stack>
                ) : params.row.isRequest == "Accept" ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      //   endIcon={<AddIcon />}
                      // onClick={() => createMedicalRecord(params.row.id)}
                    >
                      Already Accept
                    </Button>
                  </Stack>
                ) : params.row.isRequest == "Decline" ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="danger"
                      //   endIcon={<AddIcon />}
                      // onClick={() => sendRequestToPatient(params.row.id)}
                    >
                      Request Already Decline
                    </Button>
                  </Stack>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        );
      },
    },
    {
      field: "isRequestChild",
      headerName: "Child Request",
      width: 400,
      renderCell: (params) => {
        return (
          <>
            {currentUser.haveChildren && params.row.isRequestChild == "None" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button variant="contained" size="small" color="blue">
                  None
                </Button>
              </Stack>
            ) : params.row.isRequestChild == "Sent" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  color="third"
                  onClick={() =>
                    sendRequestToPatientChild(
                      params.row.id,
                      params.row.childId,
                      "Accept"
                    )
                  }
                >
                  Accept the Request
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color="red"
                  onClick={() =>
                    sendRequestToPatientChild(
                      params.row.id,
                      params.row.childId,
                      "Decline"
                    )
                  }
                >
                  Decline the Request
                </Button>
              </Stack>
            ) : params.row.isRequestChild == "Accept" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  //   endIcon={<AddIcon />}
                  // onClick={() => createMedicalRecord(params.row.id)}
                >
                  Already Accept
                </Button>
              </Stack>
            ) : params.row.isRequestChild == "Decline" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  color="danger"
                  //   endIcon={<AddIcon />}
                  // onClick={() => sendRequestToPatient(params.row.id)}
                >
                  Request Already Decline
                </Button>
              </Stack>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          bgcolor: "#FFF",
        }}
      >
        {loading && loading1 ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <h2>Doctors</h2>
              </div>
              {/* <div>
              <Button
                variant="contained"
                href="/createUser"
                // color="secondary"
                endIcon={<AddIcon />}
              >
                Create
              </Button>
            </div> */}

              {/* <Button variant="contained">Contained1</Button> */}
            </Grid>

            <div style={{ marginTop: "20px" }}>
              <TableComponent rows={rows} columns={columns} />
            </div>
          </div>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl
                variant="standard"
                sx={{ m: 1, mt: 3, width: "25ch" }}
              >
                <Input
                  id="standard-adornment-weight"
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    "aria-label": "time",
                  }}
                  onChange={(e) => {
                    handleChangeData(e);
                  }}
                  type="time"
                  name={timeFlag ? "startTime" : "endTime"}
                  // defaultValue={newsData.content}
                />
                <FormHelperText id="standard-weight-helper-text">
                  {time}
                </FormHelperText>
              </FormControl>
            </Box>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              size="small"
              color="primary"
              onClick={(e) => {
                setTimeSubmit(e);
              }}
            >
              Add
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
