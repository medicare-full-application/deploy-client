import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userType: null,
    loginId: null,
    currentUser: [],
    otherUsers: null,
    adminUsers: null,
    doctorUsers: [],
    pharmacistUsers: [],
    isFetching: false,
    authorities: [],
    token: null,
    error: false,
    monthlyIncome: null,
    totalIncome: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.userData;
      state.token = action.payload.accessToken;
      state.userType = action.payload.login.userType;
      state.loginId = action.payload.login._id;
      //please set permissions
      // state.authorities = action.payload.authorities;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      state.otherUsers = [];
      state.token = null;
      state.authorities = [];
      state.adminUsers = null;
      state.userType = null;
      state.loginId = null;
      state.monthlyIncome = null;
      state.totalIncome = null;
      state.doctorUsers = [];
      state.pharmacistUsers = [];
    },
    userGetPatientSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      //please set permissions
      // state.authorities = action.payload.authorities;
    },
    removeAdminUsers: (state) => {
      state.adminUsers = null;
    },
    removeOtherUsers: (state) => {
      state.otherUsers = null;
    },
    removeDoctorUsers: (state) => {
      state.doctorUsers = null;
    },
    removePharmacistUsers: (state) => {
      state.pharmacistUsers = null;
    },
    currentUserSet: (state, action) => {
      state.currentUser = action.payload;
    },

    //GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers = action.payload;
    },
    getAdminUserSuccess: (state, action) => {
      state.isFetching = false;
      state.adminUsers = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers.splice(
        state.otherUsers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser[
        state.currentUser.findIndex(
          (item) => item._id === action.payload._id
        )
      ] = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addDoctorUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addDoctorUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.doctorUsers = action.payload;
    },
    addDoctorUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addPharmacistUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPharmacistUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.pharmacistUsers = action.payload;
    },
    addPharmacistUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addMonthlyIncomeSuccess: (state, action) => {
      state.monthlyIncome = action.payload;
    },
    addTotalIncomeSuccess: (state, action) => {
      state.totalIncome = action.payload;
    },
    updateCurrentUserRequestSuccess: (state, action) => {
      state.currentUser.requests[
        state.currentUser.requests.findIndex(
          (item) => item.patientId === action.payload._id
        )
      ] = action.payload;
    },
    updateOtherUserSuccess: (state, action) => {
      state.otherUsers[
        state.otherUsers.findIndex(
          (item) => item._id === action.payload._id
        )
      ] = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUserStart,
  getUserSuccess,
  getAdminUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  removeAdminUsers,
  removeOtherUsers,
  currentUserSet,
  addMonthlyIncomeSuccess,
  addTotalIncomeSuccess,
  updateOtherUserSuccess,
  removeDoctorUsers,
  addDoctorUsersStart,
  addDoctorUsersSuccess,
  addDoctorUsersFailure,
  addPharmacistUsersStart,
  addPharmacistUsersSuccess,
  addPharmacistUsersFailure,
  removePharmacistUsers,
  userGetPatientSuccess
} = userSlice.actions;
export default userSlice.reducer;
