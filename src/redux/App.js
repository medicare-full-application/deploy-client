import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AdvertisementList } from "./pages/advertisement/AdvertisementList";
import { UserList } from "./pages/user/UserList";
import { UserCreate } from "./pages/user/UserCreate";
import { UserUpdate } from "./pages/user/UserUpdate";
import { Profile } from "./pages/user/Profile";
import { UserAdminList } from "./pages/user/UserAdminList";
import { UserAdminUpdate } from "./pages/user/UserAdminUpdate";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MedicalRecordUpdate } from "./pages/medicalRecord/MedicalRecordUpdate";
import { MedicalRecordCreate } from "./pages/medicalRecord/MedicalRecordCreate";
import { AdvertisementUpdate } from "./pages/advertisement/AdvertisementUpdate";
import { AdvertisementCreate } from "./pages/advertisement/AdvertisementCreate";
import { UserManagement } from "./pages/userManagement/UserManagement";
import { ProfileUpdate } from "./pages/user/ProfileUpdate";
import { MedicalRecordList } from "./pages/medicalRecord/MedicalRecordList";
import SignUp from "./pages/SignUp";
import { DoctorDashboard } from "./pages/userDashboards.js/doctor/DoctorDashboard";
import { PatientDashboard } from "./pages/userDashboards.js/patient/PatientDashboard";
import { PharmacistDashboard } from "./pages/userDashboards.js/pharmacist/PharmacistDashboard";
import { PatientList } from "./pages/userDashboards.js/patient/patientList/PatientList";
import { DoctorDashboardImpl } from "./pages/userDashboards.js/doctor/DoctorDashboardImpl";
import { DoctorProfile } from "./pages/userDashboards.js/doctor/profile/DoctorProfile";
import { PharmacistProfile } from "./pages/userDashboards.js/pharmacist/profile/PharmacistProfile";
import { AddChild } from "./pages/userDashboards.js/patient/addChild/AddChild";
import { DoctorList } from "./pages/userDashboards.js/doctor/doctorList/DoctorList";
import { ChildList } from "./pages/userDashboards.js/patient/childList/ChildList";
import { NewsList } from "./pages/news/NewsList";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patientDashboard" element={<PatientDashboard />} />
          <Route path="/pharmacistDashboard" element={<PharmacistDashboard />} />
          {/* user */}
          <Route path="/patient" element={<PatientList />} />
          <Route path="/patient/child/:id" element={<ChildList />} />
          <Route path="/addChild" element={<AddChild />} />
          <Route path="/createUser" element={<UserCreate />} />
          <Route path="/updateUser/:id" element={<UserUpdate />} />
          <Route path="/updateAdminUser/:id" element={<UserAdminUpdate />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/doctor" element={<DoctorList />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/patientProfile" element={<DoctorProfile />} />
          <Route path="/pharmacistProfile" element={<PharmacistProfile />} />
          <Route path="/adminProfile" element={<DoctorProfile />} />

          <Route path="/profileUpdate" element={<ProfileUpdate />} />
          <Route path="/userAdmin" element={<UserAdminList />} />
          {/* Advertisement */}
          <Route path="/advertisement" element={<AdvertisementList />} />
          <Route path="/updateAdvertisement/:id" element={<AdvertisementUpdate />} />
          <Route path="/createAdvertisement" element={<AdvertisementCreate />} />
          {/* MedicalRecord */}
          <Route path="/medicalRecord" element={<MedicalRecordList />} />
          <Route path="/updateMedicalRecord/:id" element={<MedicalRecordUpdate />} />
          <Route path="/createMedicalRecord/:id" element={<MedicalRecordCreate />} />

          {/* News */}
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<MedicalRecordUpdate />} />
          <Route path="/news/create" element={<MedicalRecordCreate />} />

          {/* user management */}
          <Route path="/userManagement/:id" element={<UserManagement />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
