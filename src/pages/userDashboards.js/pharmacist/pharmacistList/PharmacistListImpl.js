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
  getPharmacistUsers,
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
  removeOtherUsers,
  removePharmacistUsers,
} from "../../../../redux/userRedux";
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

export const PharmacistListImpl = () => {
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
  const pharmacistUsers = useSelector((state) => state.user.pharmacistUsers);
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
      dispatch(removePharmacistUsers());
      const result = await getPharmacistUsers(dispatch, token);
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
    const getNormalUserData = async () => {
      let rowData = [];
      let flag = false;
      let doctorIDData = null;
      let isRequest = "None";

      let prescription = null;
      let pharmacyNote = null;
      let medicalRecordId = null;
      pharmacistUsers.map(async (item) => {
        //   const isoDateString = item.dateOfBirth;
        //   const dateOnlyString = isoDateString.substring(0, 10);

        //   if (userType == "Doctor") {
        //     item.requests.map((request) => {
        //       if (request.doctorId === userId) {
        //         flag = true;
        //         doctorIDData = request.doctorId;
        //         isRequest = request.isRequest;
        //       }
        //     });
        //   }

        //   if (userType == "Pharmacist") {
        //     medicalRecords.map((medicalRecordData) => {
        //       if (item._id == medicalRecordData.recordFor) {
        //         prescription = medicalRecordData.prescription;
        //         pharmacyNote = medicalRecordData.pharmacyNote;
        //         medicalRecordId = medicalRecordData._id;
        //         console.log(prescription);
        //         console.log(typeof prescription);
        //         console.log(typeof medicalRecordData.prescription);
        //       }
        //     });
        //   }

        await rowData.push({
          id: item._id,
          pharmacyName: item.pharmacyName,
          email: item.email,
          address: item.address,
          pharmacyRegNo: item.pharmacyRegNo,
          contactNo: item.contactNo,
          userStatus: item.userStatus,
        });

        //   prescription = null;
        //   pharmacyNote = null;
        //   medicalRecordId = null;
      });
      setRows(rowData);
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
        const result = await updateUser(
          id,
          "Pharmacist",
          data,
          dispatch,
          token
        );
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
    { field: "pharmacyRegNo", headerName: "Pharmacy Reg No", width: 180 },
    { field: "pharmacyName", headerName: "Pharmacy Name", width: 180 },
    // {
    //   field: "col1",
    //   headerName: "Full Name",
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <div className="productListItem">
    //         <img className="productListImg" src={params.row.col4} alt="" />
    //         {params.row.col1 + " " + params.row.col2}
    //       </div>
    //     );
    //   },
    // },

    { field: "email", headerName: "Email", width: 220 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "contactNo", headerName: "Contact", width: 120 },

    {
      field: "action",
      headerName: "User Activation",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {userType == "Admin" && (
              <Stack direction="row" alignItems="center" spacing={1}>
                {params.row.userStatus ? (
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
                <h2>Pharmacy Details</h2>
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
