import {
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
} from "./medicalRecordRedux";
import { publicRequest } from "../requestMethods";

export const getMedicalRecord = async (dispatch, token) => {
  dispatch(getMedicalRecordStart());
  try {
    const res = await publicRequest.get("/medicalRecord/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getMedicalRecordSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getMedicalRecordFailure());
    return 0;
  }
};

export const getMedicalRecordDummy = async (dispatch, token) => {
  dispatch(getMedicalRecordStart());
  try {
    const res = await publicRequest.get("/medicalRecord", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    dispatch(getMedicalRecordFailure());
    return 0;
  }
};

export const deleteMedicalRecord = async (id, dispatch,token) => {
  dispatch(deleteMedicalRecordStart());
  try {
    const res = await publicRequest.delete(`/medicalRecord/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(deleteMedicalRecordSuccess(id));
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(deleteMedicalRecordFailure());
    return 0;
  }
};

export const updateMedicalRecord = async (id, MedicalRecord, dispatch, token) => {
  dispatch(updateMedicalRecordStart());
  try {
    // update
    const res = await publicRequest.put(`/medicalRecord/${id}`, MedicalRecord, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(updateMedicalRecordSuccess({ id, MedicalRecord }));
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(updateMedicalRecordFailure());
    return 0;
  }
};
export const addMedicalRecord = async (MedicalRecord, token) => {
  // dispatch(addMedicalRecordStart());
  try {
    const res = await publicRequest.post(`/medicalRecord/`, MedicalRecord, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(addMedicalRecordSuccess(res.data));
    return 1;
  } catch (err) {
    // dispatch(addMedicalRecordFailure());
    return 0;
  }
};
