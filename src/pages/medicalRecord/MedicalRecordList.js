import React from "react";
import { Grid } from "@mui/material";
import MainHeader from "../../components/MainHeader";
import { MedicalRecordListImpl } from "./MedicalRecordListImpl";
import { useDispatch, useSelector } from "react-redux";
import { MedicalRecordListImplPharmacy } from "./MedicalRecordListImplPharmacy";

export const MedicalRecordList = () => {
  const userType = useSelector((state) => state.user.userType);
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          {userType == "Pharmacist" ? (
            <MedicalRecordListImplPharmacy />
          ) : (
            <MedicalRecordListImpl />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
