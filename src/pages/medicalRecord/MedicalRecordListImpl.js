import React, { useState } from "react";

import { Box, Button, Chip, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { TableComponent } from "../../components/TableComponent";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import {
  deleteMedicalRecord,
  getMedicalRecord,
  updateMedicalRecord,
} from "../../redux/medicalRecordApiCalls";
import LinearProgress from "@mui/material/LinearProgress";
import { removeMedicalRecords } from "../../redux/medicalRecordRedux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getDoctorUsers, getUsers } from "../../redux/userApiCalls";
import { removeDoctorUsers, removeOtherUsers } from "../../redux/userRedux";
import NoteIcon from "@mui/icons-material/Note";
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

export const MedicalRecordListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const userType = useSelector((state) => state.user.userType);
  const userId = useSelector((state) => state.user.currentUser._id);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const doctorUsers = useSelector((state) => state.user.doctorUsers);
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const [pharmacyNote, setPharmacyNote] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeMedicalRecords());
      const result = await getMedicalRecord(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading, deleteTrigger]);

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
  }, [loading1, deleteTrigger]);

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeDoctorUsers());
      const result = await getDoctorUsers(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading2(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading2, deleteTrigger]);

  React.useEffect(() => {
    const getNormalUserData = async () => {
      let rowData = [];
      if (userType == "Patient") {
        const filteredMedicalRecords = medicalRecords.filter(
          (record) => record.recordFor == userId
        );

        console.log(filteredMedicalRecords);

        filteredMedicalRecords.map(
          (item) => {
            const isoDateString = item.date;
            const dateOnlyString = isoDateString.substring(0, 10);

            let doctorId = null;
            let doctorFirstName = null;
            let doctorLastName = null;
            let doctorImage = null;
            let doctorNIC = null;

            doctorUsers.map((doctor) => {
              if (doctor._id == item.recordBy) {
                doctorId = doctor._id;
                doctorFirstName = doctor.firstName;
                doctorLastName = doctor.lastName;
                doctorImage = doctor.imageUrl;
                doctorNIC = doctor.NIC;
              }
            });

            rowData.push({
              id: item._id,
              col1: item.medicalCondition,
              col2: dateOnlyString,
              col3: item.reportAdded,
              col4: item.medicalReport,
              col5: item.prescription,
              pharmacyNote: item.pharmacyNote,
              doctorId: doctorId,
              doctorFirstName: doctorFirstName,
              doctorLastName: doctorLastName,
              doctorImage: doctorImage,
              doctorNIC: doctorNIC,
            });
          }
          // }
        );
      } else {
        medicalRecords.map(
          (item) => {
            const isoDateString = item.date;
            const dateOnlyString = isoDateString.substring(0, 10);

            let patientId = null;
            let patientFirstName = null;
            let patientLastName = null;
            let patientImage = null;
            let patientNIC = null;

            otherUsers.map((patientData) => {
              if (item.recordFor == patientData._id) {
                patientId = patientData._id;
                patientFirstName = patientData.firstName;
                patientLastName = patientData.lastName;
                patientImage = patientData.imageUrl;
                patientNIC = patientData.NIC;
              }
            });

            rowData.push({
              id: item._id,
              col1: item.medicalCondition,
              col2: dateOnlyString,
              col3: item.reportAdded,
              col4: item.medicalReport,
              col5: item.prescription,
              pharmacyNote: item.pharmacyNote,
              patientId: patientId,
              patientFirstName: patientFirstName,
              patientLastName: patientLastName,
              patientImage: patientImage,
              patientNIC: patientNIC,
            });
          }
          // }
        );
      }

      setRows(rowData);
    };
    getNormalUserData();
  }, [trigger, dispatch, deleteTrigger]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#378cbb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // alert(id);
        const status = await deleteMedicalRecord(id, dispatch, token);
        if (status) {
          setDeleteTrigger(deleteTrigger + "z");
          Swal.fire(
            "Deleted!",
            "Your MedicalRecord has been deleted.",
            "success"
          );
        } else {
          Swal.fire(
            "Can't Delete!",
            "Your MedicalRecord has not been deleted.",
            "error"
          );
        }
      }
    });
  };

  const handleOpen = (id, prescription) => {
    const splittedArr = prescription.split(" ");

    let outputStr = "";
    for (let i = 0; i < splittedArr.length; i += 2) {
      outputStr += splittedArr[i] + " " + splittedArr[i + 1] + "\n";
    }
    console.log(outputStr);
    setOpen(true);
    setTitle("Prescription");
    setContent(outputStr);
    console.log(id);
  };
  const handleClose = () => setOpen(false);
  const handleOpen1 = (id, pharmacyNote) => {
    setPharmacyNote(pharmacyNote);
    setOpen1(true);
  };
  const handleClose1 = () => setOpen1(false);

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
          setDeleteTrigger("Q");
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

  const viewReport = (id, url) => {
    console.log(url);
    window.open(url, "_blank");
  };

  const columns = [
    {
      field: "id",
      headerName: userType == "Patient" ? "Doctor Name" : "Patient Name",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {userType == "Patient" ? (
              <>
                <img
                  className="productListImg"
                  src={params.row.doctorImage}
                  alt="Doctor Profile Picture"
                />
                {params.row.doctorFirstName + " " + params.row.doctorLastName}
              </>
            ) : (
              <>
                <img
                  className="productListImg"
                  src={params.row.patientImage}
                  alt="Patient Profile Picture"
                />
                {params.row.patientFirstName + " " + params.row.patientLastName}
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "col1",
      headerName: "Medical Condition",
      hideable: true,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.col10} alt="" /> */}
            {params.row.col1}
          </div>
        );
      },
    },
    { field: "col2", headerName: "Date", width: 180 },
    {
      field: "col5",
      headerName: "View Prescription",
      width: 150,
      className: "center-align-cell",
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="edit"
              size="large"
              color="brown"
              onClick={() => handleOpen(params.row.id, params.row.col5)}
            >
              <VisibilityIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "col3",
      headerName:
        userType == "Doctor"
          ? "View Report"
          : userType == "Patient"
          ? "View Report and Note"
          : "Add Note",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            {userType == "Doctor" || userType == "Patient" ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                {params.row.col3 ? (
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="success"
                    onClick={() => viewReport(params.row.id, params.row.col4)}
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
            ) : (
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() =>
                    addNewNote(params.row.id, params.row.pharmacyNote)
                  }
                >
                  <EditIcon />
                </IconButton>
              </Stack>
            )}
            {userType == "Patient" || userType == "Doctor" && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title="Pharmacy Note">
                  <IconButton
                    aria-label="edit"
                    size="large"
                    color="blue"
                    onClick={() =>
                      handleOpen1(params.row.id, params.row.pharmacyNote)
                    }
                  >
                    <NoteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </>
        );
      },
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Stack direction="row" alignItems="center" spacing={1}>
    //           <IconButton
    //             aria-label="edit"
    //             size="large"
    //             color="success"
    //             onClick={() => updateItem(params.row.id)}
    //           >
    //             <EditIcon />
    //           </IconButton>

    //           <IconButton
    //             aria-label="delete"
    //             size="large"
    //             color="error"
    //             onClick={() => deleteItem(params.row.id)}
    //           >
    //             <DeleteIcon />
    //           </IconButton>

    //           <Button
    //             variant="contained"
    //             color="secondary"
    //             size="small"
    //             endIcon={<AddIcon />}
    //             onClick={() => createMedicalRecord(params.row.id)}
    //           >
    //             Create
    //           </Button>
    //         </Stack>
    //       </>
    //     );
    //   },
    // },
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
        {loading && loading1 && loading2 ? (
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
                <h2>
                  {userType == "Patient"
                    ? "My Medical Records"
                    : "Medical Records"}
                </h2>
              </div>
              {/* <div>
                <Button
                  variant="contained"
                  href="/createEvent"
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

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pharmacy Note Added by Pharmacy
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <pre>
              {pharmacyNote ? pharmacyNote : "The pharmacy did not add a note."}
            </pre>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
