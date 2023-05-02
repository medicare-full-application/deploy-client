import React from "react";
import "../user/UserUpdateImpl.css";
import { Link, useLocation } from "react-router-dom";
import Charts from "../../components/charts/Charts";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { getUsers, updateNormalUser } from "../../redux/userApiCalls";
import {
  getMedicalRecord,
  updateMedicalRecord,
} from "../../redux/medicalRecordApiCalls";
import { getNews, updateNews } from "../../redux/newsApiCalls";

export const NewsUpdateImpl = () => {
  const location = useLocation();
  // const productId = location.pathname.split("/")[3];
  const newsId = window.location.pathname.split("/")[2];
  // console.log(productId);
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [trigger, setTrigger] = useState("success");
  const [formSaveData, setFormSaveData] = useState([]);

  const [event_nameError, setevent_nameError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [event_dateError, setevent_dateError] = useState(false);
  const [event_timeError, setevent_timeError] = useState(false);
  const [event_locationError, setevent_locationError] = useState(false);

  const [event_nameMessageError, setevent_nameMessageError] = useState("");
  const [descriptionMessageError, setdescriptionMessageError] = useState("");
  const [priceMessageError, setpriceMessageError] = useState("");
  const [event_dateMessageError, setevent_dateMessageError] = useState("");
  const [event_timeMessageError, setevent_timeMessageError] = useState("");
  const [event_locationMessageError, setevent_locationMessageError] =
    useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser.user_id);

  const newsData = useSelector((state) =>
    state.news.newsData.find((item) => item.isActivate)
  );

  React.useEffect(() => {
    const getDataFromDB = async () => {
      const result = await getNews(dispatch, token);
      if (result) {
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [trigger]);
  // const otherUsers = useSelector((state) => state.user.otherUsers.data);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    let data = [
      { name: MONTHS[0], Sales: 15 },
      { name: MONTHS[1], Sales: 20 },
      { name: MONTHS[2], Sales: 65 },
      { name: MONTHS[3], Sales: 45 },
      { name: MONTHS[4], Sales: 20 },
      { name: MONTHS[5], Sales: 74 },
    ];
    setPStats(data);
  }, [MONTHS]);

  const updateProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      title: formData.get("title") ? formData.get("title") : newsData.title,
      description: formData.get("description")
        ? formData.get("description")
        : newsData.description,
      content: formData.get("content")
        ? formData.get("content")
        : newsData.content,

      // img: product.img,
    };

    console.log(formNewData);

    const result = await updateNews(newsId, formNewData, dispatch, token);

    setTrigger(trigger + "su");
    // console.log(result);
    if (result) {
      console.log("Success");
      Swal.fire({
        icon: "success",
        title: "Successfully Updated!",
      });
    } else {
      console.log("Unsuccess");
      Swal.fire({
        icon: "error",
        title: "Update Unsuccess!",
      });
    }
  };

  return (
    <div>
      <div className="productTitleContainer">
        <h1 className="addTitle">News Detail Edit</h1>
        <div>
          <Button
            variant="contained"
            href="/news"
            style={{ marginRight: 10 }}
            color="third"
            // endIcon={<AddIcon />}
          >
            Back
          </Button>
          {/* <Link to="/createUser"> */}
          {/* <button className="color-contained-button">Create</button> */}
          <Button
            variant="contained"
            href="/news/create"
            color="secondary"
            // endIcon={<AddIcon />}
          >
            Create
          </Button>
          {/* </Link> */}
        </div>
      </div>
      <div className="productTop">
        {/* <div className="productTopLeft">
          <Charts data={pStats} dataKey1="Sales" title="Event Registration" />
        </div> */}
        <div className="productTopRight">
          <div className="productInfoTop">
            {/* <img src={currentUser.user_img} alt="" className="productInfoImg" /> */}
            <span className="productName">News Details</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem" style={{paddingBottom:"10px"}}>
              <span className="productInfoKey">News ID:</span>
              <span className="productInfoValue">{newsData._id}</span>
            </div>
            <div className="productInfoItem" style={{paddingBottom:"10px"}}>
              <span className="productInfoKey">Title:</span>
              <span className="productInfoValue">{newsData.title}</span>
            </div>
            <div className="productInfoItem" style={{paddingBottom:"10px"}}>
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{newsData.description}</span>
            </div>
            <div className="productInfoItem" style={{paddingBottom:"10px"}}>
              <span className="productInfoKey">Date:</span>
              <span className="productInfoValue">{newsData.date.substring(0, 10)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h2 className="h3Title">Update News</h2>
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
          {/* <form className="productForm" onSubmit={updateProduct}> */}

          <Box
            component="form"
            noValidate
            onSubmit={updateProductSubmit}
            className="productForm"
            // sx={{ m: 5 }}
          >
            {/* <div className="productFormLeft"> */}
            <Grid container spacing={2}>
              {/* <Grid item md={12}> */}
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      error={event_nameError}
                      defaultValue={newsData.title}
                      variant="standard"
                      margin="normal"
                      multiline
                      // required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      autoComplete="title"
                      autoFocus
                      helperText={event_nameMessageError}
                      onChange={() => {
                        setevent_nameError(false);
                        setevent_nameMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={descriptionError}
                      defaultValue={newsData.description}
                      variant="standard"
                      margin="normal"
                      multiline
                      // required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      autoFocus
                      helperText={descriptionMessageError}
                      onChange={() => {
                        setdescriptionError(false);
                        setdescriptionMessageError("");
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      error={priceError}
                      defaultValue={newsData.content}
                      variant="standard"
                      margin="normal"
                      multiline
                      // required
                      fullWidth
                      id="content"
                      label="Content"
                      name="content"
                      autoComplete="content"
                      autoFocus
                      helperText={priceMessageError}
                      onChange={() => {
                        setpriceError(false);
                        setpriceMessageError("");
                      }}
                    />
                  </Grid>
                  {/* <Grid item md={4}>
                    <TextField
                      error={categoryError}
                      defaultValue={currentUser.category}
                      variant="standard"
                      margin="normal"
                      select
                      // required
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                      autoComplete="category"
                      autoFocus
                      helperText={categoryMessageError}
                      onChange={() => {
                        setCategoryError(false);
                        setCategoryMessageError("");
                      }}
                    >
                      {categoryData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  {/* <Grid item md={4}>
                    <TextField
                      error={messureError}
                      defaultValue={currentUser.contact}
                      variant="standard"
                      margin="normal"
                      select
                      // required
                      fullWidth
                      id="messure"
                      label="UOM"
                      name="messure"
                      autoComplete="messure"
                      autoFocus
                      helperText={messureMessageError}
                      onChange={() => {
                        setMessureError(false);
                        setMessureMessageError("");
                      }}
                    >
                      {uomData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  
                </Grid>
              </Grid>
              <Grid item md={2}>
                <div className="productFormRight">
                  {/* <div className="productUpload">
                    <img
                      src={currentUser.user_img}
                      alt=""
                      className="productUploadImg"
                    />
                    <label for="file">
                      <Publish />
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="img"
                      style={{ display: "none" }}
                    />
                  </div> */}
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    // endIcon={<AddIcon />}
                  >
                    Update
                  </Button>
                </div>
              </Grid>
            {/* </Grid> */}
            {/* </form> */}
          </Box>
        </Box>
      </div>
    </div>
  );
};
