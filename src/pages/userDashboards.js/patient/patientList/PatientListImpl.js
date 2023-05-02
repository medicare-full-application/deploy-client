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
import { removeOtherUsers } from "../../../../redux/userRedux";
import { removeMedicalRecords } from "../../../../redux/medicalRecordRedux";
import {
  getMedicalRecord,
  updateMedicalRecord,
} from "../../../../redux/medicalRecordApiCalls";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

export const PatientListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [loadingRecord, setLoadingRecord] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [requestTrigger, setRequestTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser._id);
  const childOrNot = useSelector((state) => state.user.currentUser.childOrNot);
  const userType = useSelector((state) => state.user.userType);
  // const otherUsers = useSelector((state) =>
  //   state.user.otherUsers.filter((x) => x.childOrNot == false)
  // );
  // console.log(otherUsers);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );
  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [open, setOpen] = React.useState(false);

  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [rows, setRows] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeOtherUsers());
      const result = await getUsers("Patient", dispatch, token);
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
      dispatch(removeMedicalRecords());
      const result = await getMedicalRecord(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoadingRecord(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loadingRecord, requestTrigger]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      let flag = false;
      let doctorIDData = null;
      let isRequest = "None";

      let prescription = null;
      let pharmacyNote = null;
      let medicalRecordId = null;
      otherUsers.map(async (item) => {
        if (item.childOrNot == false) {
          const isoDateString = item.dateOfBirth;
          const dateOnlyString = isoDateString.substring(0, 10);

          if (userType == "Doctor") {
            item.requests.map((request) => {
              if (request.doctorId === userId) {
                flag = true;
                doctorIDData = request.doctorId;
                isRequest = request.isRequest;
              }
            });
          }

          if (userType == "Pharmacist") {
            medicalRecords.map((medicalRecordData) => {
              if (item._id == medicalRecordData.recordFor) {
                prescription = medicalRecordData.prescription;
                pharmacyNote = medicalRecordData.pharmacyNote;
                medicalRecordId = medicalRecordData._id;
                console.log(prescription);
                console.log(typeof prescription);
                console.log(typeof medicalRecordData.prescription);
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
            flag: item.flag,
            isRequest: isRequest,
            prescriptionNote: prescription,
            pharmacyNote: pharmacyNote,
            medicalRecordId: medicalRecordId,
          });

          prescription = null;
          pharmacyNote = null;
          medicalRecordId = null;
        }
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

  const sendRequestToPatientAdmin = (id, requestType) => {
    const data = {
      patientId: id,
      isRequest: requestType,
    };

    const patientData = {
      doctorId: userId,
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

  const handleOpen = (id, prescription) => {
    console.log(id);
    console.log(prescription);
    if (prescription != null) {
      const splittedArr = prescription.split(" ");

      let outputStr = "";
      for (let i = 0; i < splittedArr.length; i += 2) {
        outputStr += splittedArr[i] + " " + splittedArr[i + 1] + "\n";
      }
      console.log(outputStr);
      setOpen(true);
      setTitle("Prescription");
      setContent(outputStr);
    } else {
      Swal.fire("No Prescription!", "There is no prescription..", "warning");
    }
  };
  const handleClose = () => setOpen(false);

  const addNewNote = async (medicalRecordId, pharmacyNote) => {
    console.log(medicalRecordId);

    if (medicalRecordId != null) {
      const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Pharmacy Note",
        inputPlaceholder: "Type your message here......",
        inputValue: pharmacyNote,
        // inputValue: 'Type your message here...',
        inputValidator: (value) => {
          if (!value) {
            return "Add New Note!";
          }
        },
        // inputAttributes: {
        //   'aria-label': 'Type your message here'
        // },
        showCancelButton: true,
      });

      if (text) {
        const data = {
          pharmacyNote: text,
        };
        const result = await updateMedicalRecord(
          medicalRecordId,
          data,
          dispatch,
          token
        );
        if (result) {
          setRequestTrigger("Q");
          Swal.fire("Updated!", "Your note successfully added.", "success");
        } else {
          Swal.fire(
            "Update Unsuccess!",
            "Your note added unsuccessfully..",
            "warning"
          );
        }
        // Swal.fire(text);
      }
    } else {
      Swal.fire(
        "Request Can't Sent!",
        "This patient hasn't any medical record..",
        "warning"
      );
    }
  };

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

  const createMedicalRecord = (id) => {
    console.log(id);
    navigate(`/createMedicalRecord/${id}`);
  };

  const changeItem = (parentId) => {
    navigate(`/patient/child/${parentId}`);
  };

  const changeItemAdmin = (id, userStatus) => {
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
        const result = await updateUser(id, "Patient", data, dispatch, token);
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
      field: "col5",
      headerName: "Have Children",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.col5}
              {params.row.col5 ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => changeItem(params.row.id)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  // onClick={() => changeItem(params.row.id)}
                >
                  <ClearIcon />
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
      headerName: "Action",
      width: 350,
      renderCell: (params) => {
        return (
          <>
            {userType == "Admin" && (
              <Stack direction="row" alignItems="center" spacing={1}>
                {params.row.col9 ? (
                  <Tooltip title="User Activation">
                    <IconButton
                      aria-label="edit"
                      size="large"
                      color="success"
                      onClick={() => changeItemAdmin(params.row.id, false)}
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
                      onClick={() => changeItemAdmin(params.row.id, true)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            )}
            {userType == "Doctor" ? (
              params.row.isRequest == "None" ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    color="blue"
                    onClick={() => sendRequestToPatient(params.row.id)}
                    //   endIcon={<AddIcon />}
                    // onClick={() => createMedicalRecord(params.row.id)}
                  >
                    Request
                  </Button>
                </Stack>
              ) : params.row.isRequest == "Sent" ? (
                userType == "Admin" ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="third"
                      onClick={() =>
                        sendRequestToPatientAdmin(params.row.id, "Accept")
                      }
                    >
                      Request Accept
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="third"
                      onClick={() =>
                        sendRequestToPatientAdmin(params.row.id, "Decline")
                      }
                    >
                      Request Decline
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      variant="contained"
                      size="small"
                      color="third"
                      //   endIcon={<AddIcon />}
                    >
                      Request Sent
                    </Button>
                  </Stack>
                )
              ) : params.row.isRequest == "Accept" ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    //   endIcon={<AddIcon />}
                    onClick={() => createMedicalRecord(params.row.id)}
                  >
                    Add a record
                  </Button>
                </Stack>
              ) : params.row.isRequest == "Decline" ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    color="danger"
                    //   endIcon={<AddIcon />}
                    onClick={() => sendRequestToPatient(params.row.id)}
                  >
                    Request Decline
                  </Button>
                </Stack>
              ) : (
                <></>
              )
            ) : (
              userType != "Admin" && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="brown"
                    onClick={() =>
                      handleOpen(params.row.id, params.row.prescriptionNote)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="success"
                    onClick={() =>
                      addNewNote(
                        params.row.medicalRecordId,
                        params.row.pharmacyNote
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Stack>
              )
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
        {loading && loadingRecord ? (
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
                <h2>Patients</h2>
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
            <pre>{content}</pre>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
