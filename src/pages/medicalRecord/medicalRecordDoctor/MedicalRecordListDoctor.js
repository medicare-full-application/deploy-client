import React from "react";
import { Grid } from "@mui/material";
import MainHeader from "../../../components/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { MedicalRecordListDoctorImpl } from "./MedicalRecordListDoctorImpl";

export const MedicalRecordListDoctor = () => {
  const userType = useSelector((state) => state.user.userType);
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <MedicalRecordListDoctorImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
