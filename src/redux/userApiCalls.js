import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getAdminUserSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  currentUserSet,
  addMonthlyIncomeSuccess,
  addTotalIncomeSuccess,
  updateOtherUserSuccess,
  addDoctorUsersStart,
  addDoctorUsersSuccess,
  addDoctorUsersFailure,
  addPharmacistUsersStart,
  addPharmacistUsersSuccess,
  addPharmacistUsersFailure
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import Swal from "sweetalert2";

export const normalUserRegister = async (User, token) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/user/createUser`, User, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const adminRegister = async (User, token) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/local_user/createUser`, User, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const userRegister = async (userType, User) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/auth/register/${userType}`, User);
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const userChildRegister = async (parentId, User) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/auth/register/child/${parentId}`, User);
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const login = async (dispatch, data) => {
  // const userData = JSON.stringify(data);
  console.log(data);
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", data);
    console.log(res);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(loginFailure());
    return 0;
  }
};

export const getUsers = async (userType, dispatch, token) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get(`/user/${userType}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch(getUserSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getUserFailure());
    return 0;
  }
};

export const getDoctorUsers = async (dispatch, token) => {
  dispatch(addDoctorUsersStart());
  try {
    const res = await publicRequest.get(`/user/Doctor`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addDoctorUsersSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addDoctorUsersFailure());
    return 0;
  }
};

export const getPharmacistUsers = async (dispatch, token) => {
  dispatch(addPharmacistUsersStart());
  try {
    const res = await publicRequest.get(`/user/Pharmacist`, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addPharmacistUsersSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addPharmacistUsersFailure());
    return 0;
  }
};

export const deleteUser = async (id, userType, dispatch, token) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}/${userType}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deleteUserFailure());
    return 0;
  }
};

export const updateUser = async (id, userType, User, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await publicRequest.put(`/user/${id}/${userType}`, User, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(updateUserSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const updateUserEmail = async (
  id,
  loginId,
  userType,
  User,
  dispatch,
  token
) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await publicRequest.put(
      `/user/email/${id}/${loginId}/${userType}`,
      User,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    dispatch(updateUserSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const checkUserEmail = async (User, dispatch) => {
  // dispatch(updateUserStart());
  try {
    const res = await publicRequest.post(`/user/email`, User, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(res.data);
    return res;
  } catch (err) {
    // dispatch(updateUserFailure());
    return 0;
  }
};

export const updateUserPassword = async (loginId, User, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.put(`/user/password/${loginId}`, User, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const logOutUser = async (dispatch) => {
  dispatch(logout());
};

export const getMonthlyIncomeFromDoctor = async (
  id,
  year,
  month,
  dispatch,
  token
) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.get(
      `/user/stats/income/${id}/${year}/${month}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    dispatch(addMonthlyIncomeSuccess(res.data[0].totalIncome));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

//day
export const getTotalIncomeFromDoctor = async (id, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.get(`/user/stats/income/month/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addTotalIncomeSuccess(res.data[0].totalIncome));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

// export const getTotalIncomeFromDoctor = async (id, dispatch, token) => {
//   dispatch(updateUserStart());
//   try {
//     const res = await publicRequest.get(`/user/stats/income/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         token: `Bearer ${token}`,
//       },
//     });
//     console.log(res);
//     dispatch(addTotalIncomeSuccess(res.data[0].result));
//     return 1;
//   } catch (err) {
//     dispatch(updateUserFailure());
//     return 0;
//   }
// };

export const doctorRequestToPatient = async (
  doctorId,
  user,
  dispatch,
  token
) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.put(
      `/user/doctor/requests/${doctorId}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    // dispatch(updateOtherUserSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const patientRequestToDoctor = async (
  patientId,
  user,
  dispatch,
  token
) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.put(
      `/user/patient/requests/${patientId}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    // dispatch(updateOtherUserSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

// export const addUserWithAuth = async (User, dispatch) => {
//   dispatch(addUserStart());
//   try {
//     const res = await userRequest.post(`/user/save`, User);
//     dispatch(addUserSuccess(res.data));
//   } catch (err) {
//     dispatch(addUserFailure());
//   }
// };
