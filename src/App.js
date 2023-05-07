import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { UserCreate } from "./pages/user/UserCreate";
import { UserUpdate } from "./pages/user/UserUpdate";
import { Profile } from "./pages/user/Profile";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MedicalRecordUpdate } from "./pages/medicalRecord/MedicalRecordUpdate";
import { MedicalRecordCreate } from "./pages/medicalRecord/MedicalRecordCreate";
import { ProfileUpdate } from "./pages/user/ProfileUpdate";
import { MedicalRecordList } from "./pages/medicalRecord/MedicalRecordList";
import SignUp from "./pages/SignUp";
import { DoctorDashboard } from "./pages/userDashboards.js/doctor/DoctorDashboard";
import { PatientDashboard } from "./pages/userDashboards.js/patient/PatientDashboard";
import { PharmacistDashboard } from "./pages/userDashboards.js/pharmacist/PharmacistDashboard";
import { PatientList } from "./pages/userDashboards.js/patient/patientList/PatientList";
import { DoctorProfile } from "./pages/userDashboards.js/doctor/profile/DoctorProfile";
import { PharmacistProfile } from "./pages/userDashboards.js/pharmacist/profile/PharmacistProfile";
import { AddChild } from "./pages/userDashboards.js/patient/addChild/AddChild";
import { NewsList } from "./pages/news/NewsList";
import { NewsCreate } from "./pages/news/NewsCreate";
import { NewsUpdate } from "./pages/news/NewsUpdate";
import { DoctorList } from "./pages/userDashboards.js/doctor/doctorList/DoctorList";
import { PharmacistList } from "./pages/userDashboards.js/pharmacist/pharmacistList/PharmacistList";
import { ChildList } from "./pages/userDashboards.js/patient/childList/ChildList";
import ForgetPassword from "./pages/forgetPassword.js/ForgetPassword";
import ValidationPage from "./pages/forgetPassword.js/ValidationPage";
import UpdatePassword from "./pages/forgetPassword.js/UpdatePassword";
import { MedicalRecordListDoctor } from "./pages/medicalRecord/medicalRecordDoctor/MedicalRecordListDoctor";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1bac6d",
      },
      secondary: {
        main: "#8ed4b4"
      },
      third: {
        main: "#dadf74"
      },
      brown: {
        main: "#947c74"
      },
      danger: {
        main: "#c62828"
      },
      red: {
        main: "#d33"
      },
      blue: {
        main: "#1e88e5",
        fontWeight: "bold",
        color:"white"
      }
    },
    typography: {
      // fontFamily: "Poppins",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h3 : {
        fontSize: '1.3rem',
        fontWeight: "bold",
        '@media (min-width:600px)': {
          fontSize: '1.7rem',
          fontWeight: "bold",
        },
      }
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/updatePassword/:id" element={<UpdatePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patientDashboard" element={<PatientDashboard />} />
          <Route path="/pharmacistDashboard" element={<PharmacistDashboard />} />
          {/* user */}
          <Route path="/patient" element={<PatientList />} />
          <Route path="/patient/recordList/:id" element={<MedicalRecordListDoctor />} />
          <Route path="/addChild" element={<AddChild />} />
          <Route path="/patient/child/:id" element={<ChildList />} />
          <Route path="/createUser" element={<UserCreate />} />
          <Route path="/updateUser/:id" element={<UserUpdate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctor" element={<DoctorList />} />
          <Route path="/pharmacist" element={<PharmacistList />} />

          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/patientProfile" element={<DoctorProfile />} />
          <Route path="/pharmacistProfile" element={<PharmacistProfile />} />
          <Route path="/adminProfile" element={<DoctorProfile />} />

          <Route path="/profileUpdate" element={<ProfileUpdate />} />

          {/* MedicalRecord */}
          <Route path="/medicalRecord" element={<MedicalRecordList />} />
          <Route path="/updateMedicalRecord/:id" element={<MedicalRecordUpdate />} />
          <Route path="/createMedicalRecord/:id" element={<MedicalRecordCreate />} />

          {/* News */}
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsUpdate />} />
          <Route path="/news/create" element={<NewsCreate />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
