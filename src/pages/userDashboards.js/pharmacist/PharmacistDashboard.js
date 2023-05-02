import React from "react";
import { Grid } from "@mui/material";
import "../../common.css";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../../components/MainHeader";
import { PharmacistDashboardImpl } from "./PharmacistDashboardImpl";

export const PharmacistDashboard = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  if (token === null) {
    // navigate("/");
    window.location.href = "/";
  }
  const userId = useSelector((state) => state.user.currentUser._id);

  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <PharmacistDashboardImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
