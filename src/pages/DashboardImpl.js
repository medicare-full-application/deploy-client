import { useEffect, useMemo, useState } from "react";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import Charts from "../components/charts/Charts";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { removeMedicalRecords } from "../redux/medicalRecordRedux";
import { getMedicalRecord } from "../redux/medicalRecordApiCalls";
import MainFeaturedPost from "./userDashboards.js/patient/patientList/MainFeaturedPost";
import { getNews } from "../redux/newsApiCalls";
import { removeNews } from "../redux/newsRedux";
import { removeDoctorUsers, removePharmacistUsers } from "../redux/userRedux";
import { getDoctorUsers, getPharmacistUsers } from "../redux/userApiCalls";

export const DashboardImpl = () => {
  const [userStats, setUserStats] = useState([]);
  const [other, setOther] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [event, setEvent] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [loading5, setLoading5] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  // const otherUsers = useSelector((state) => state.user.otherUsers);
  // const adminUsers = useSelector((state) => state.user.adminUsers);
  // const events = useSelector((state) => state.event.events);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeMedicalRecords());
      const result = await getMedicalRecord(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setLoading1(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading1]);

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeNews());
      const result = await getNews(dispatch, token);
      if (result) {
        console.log("Get user data success");
        // setTrigger(trigger + "s");
        setLoading2(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading2]);

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeDoctorUsers());
      const result = await getDoctorUsers(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setLoading3(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading3]);

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removePharmacistUsers());
      const result = await getPharmacistUsers(dispatch, token);
      if (result) {
        setLoading4(false);
        console.log("Get user data success");
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading4]);

  useEffect(() => {
    let data = [
      { name: MONTHS[0], User: 15, Admin: 12 },
      { name: MONTHS[1], User: 20, Admin: 25 },
      { name: MONTHS[2], User: 65, Admin: 78 },
      { name: MONTHS[3], User: 45, Admin: 30 },
      { name: MONTHS[4], User: 100, Admin: 80 },
      { name: MONTHS[5], User: 74, Admin: 90 },
    ];
    setUserStats(data);

    // setFeaturedData(featureData);
  }, []);

  const mainFeaturedPost = {
    title: "Hiii...Admin!",
    description:
      " Keep accurate and up-to-date records of all patient information, including medical histories, medications, and treatment plans.",
    image:
      "https://res.cloudinary.com/midefulness/image/upload/v1682925280/medicare/5138237_cxwnoe.jpg",
    imageText: "main image description",
    // linkText: "Continue reading…",
  };

  return (
    <div>
      {loading1 && loading2 && loading3 ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Charts
            data={userStats}
            title="Users Analytics"
            grid
            dataKey1="User"
            dataKey2="Admin"
          />
        </>
      )}
    </div>
  );
};
