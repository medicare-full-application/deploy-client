import React from 'react'
import { Grid } from "@mui/material";
import { PatientListImpl } from './PatientListImpl';
import MainHeader from '../../../../components/MainHeader';

export const PatientList = () => {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <PatientListImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

