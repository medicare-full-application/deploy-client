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
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getNews, updateNews } from "../../redux/newsApiCalls";
import { removeNews } from "../../redux/newsRedux";

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

export const NewsListImpl = () => {
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");
  const token = useSelector((state) => state.user.token);
  const userType = useSelector((state) => state.user.userType);
  const userId = useSelector((state) => state.user.currentUser._id);
  const news = useSelector((state) => state.news.newsData);
  const medicalRecords = useSelector(
    (state) => state.medicalRecord.medicalRecords
  );

  const [open, setOpen] = React.useState(false);

  //   const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [title, setTitle] = React.useState(null);
  const [content, setContent] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeNews());
      const result = await getNews(dispatch, token);
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
    const getNormalUserData = async () => {
      let rowData = [];

      news.map((item) => {
        const isoDateString = item.date;
        const dateOnlyString = isoDateString.substring(0, 10);

        // let patientId = null;
        // let patientFirstName = null;
        // let patientLastName = null;
        // let patientImage = null;
        // let patientNIC = null;

        // news.map((patientData) => {
        //   if (item.recordFor == patientData._id) {
        //     patientId = patientData._id;
        //     patientFirstName = patientData.firstName;
        //     patientLastName = patientData.lastName;
        //     patientImage = patientData.imageUrl;
        //     patientNIC = patientData.NIC;
        //   }
        // });

        rowData.push({
          id: item._id,
          title: item.title,
          description: item.description,
          imgUrl: item.imgUrl,
          date: dateOnlyString,
          content: item.content,
          isActivate: item.isActivate,
        });
      });
      setRows(rowData);
    };
    getNormalUserData();
  }, [trigger, dispatch, deleteTrigger]);

  const updateItem = (id, isActivate) => {
    const news = {
      isActivate: isActivate,
    };
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
        // alert(id);
        const status = await updateNews(id, news, dispatch, token);
        if (status) {
          setDeleteTrigger(deleteTrigger + "z");
          Swal.fire("Updated!", "News status has been deleted.", "success");
        } else {
          Swal.fire(
            "Can't Update!",
            "News status has not been deleted.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    // { field: "id", headerName: "MedicalRecord Id", width: 300 },
    {
      field: "title",
      headerName: "Title",
      hideable: true,
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imgUrl}
              alt="image"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "description", headerName: "Description", width: 300 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "content", headerName: "Content", width: 300 },
    {
      field: "isActivate",
      headerName: "Activate or Not",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              {params.row.isActivate ? (
                <IconButton
                  aria-label="edit"
                  size="large"
                  color="success"
                  onClick={() => updateItem(params.row.id, false)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="delete"
                  size="large"
                  color="error"
                  onClick={() => updateItem(params.row.id, true)}
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
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                aria-label="edit"
                size="large"
                color="success"
                onClick={() => navigate(`/news/${params.row.id}`)}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </>
        );
      },
    },
  ];

  const goToBack = () => {
    navigate("/news/create");
  }

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          bgcolor: "#FFF",
        }}
      >
        {loading ? (
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
                <h2>News</h2>
              </div>

              <Button
                variant="contained"
                onClick={goToBack}
                color="secondary"
                endIcon={<AddIcon />}
              >
                Create
              </Button>

              {/* <Button variant="contained">Contained1</Button> */}
            </Grid>

            <div style={{ marginTop: "20px" }}>
              <TableComponent rows={rows} columns={columns} />
            </div>
          </div>
        )}
      </Box>
    </>
  );
};
