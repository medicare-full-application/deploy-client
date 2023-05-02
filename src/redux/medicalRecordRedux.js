import { createSlice } from "@reduxjs/toolkit";

const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState: {
    medicalRecords:null,
    otherMedicalRecords:null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getMedicalRecordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMedicalRecordSuccess: (state, action) => {
      state.isFetching = false;
      state.medicalRecords = action.payload;
    },
    getMedicalRecordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removeMedicalRecords: (state) => {
      state.medicalRecords = null;
    },
    //DELETE
    deleteMedicalRecordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteMedicalRecordSuccess: (state, action) => {
      state.isFetching = false;
      state.medicalRecords.splice(
        state.medicalRecords.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteMedicalRecordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateMedicalRecordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateMedicalRecordSuccess: (state, action) => {
      state.isFetching = false;
      state.otherMedicalRecords[
        state.medicalRecords.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.medicalRecords;
    },
    updateMedicalRecordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addMedicalRecordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addMedicalRecordSuccess: (state, action) => {
      state.isFetching = false;
      state.medicalRecords.push(action.payload);
    },
    addMedicalRecordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getMedicalRecordStart,
  getMedicalRecordSuccess,
  getMedicalRecordFailure,
  deleteMedicalRecordStart,
  deleteMedicalRecordSuccess,
  deleteMedicalRecordFailure,
  updateMedicalRecordStart,
  updateMedicalRecordSuccess,
  updateMedicalRecordFailure,
  addMedicalRecordStart,
  addMedicalRecordSuccess,
  addMedicalRecordFailure,
  removeMedicalRecords
} = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;
