import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import FeaturedInfo from "../../../components/featuredInfo/FeaturedInfo";
import Charts from "../../../components/charts/Charts";
import {
  getMonthlyIncomeFromDoctor,
  getTotalIncomeFromDoctor,
  getUsers,
} from "../../../redux/userApiCalls";
import MainFeaturedPost from "../patient/patientList/MainFeaturedPost";
import { removeMedicalRecords } from "../../../redux/medicalRecordRedux";
import { getMedicalRecord } from "../../../redux/medicalRecordApiCalls";
import { removeOtherUsers } from "../../../redux/userRedux";

export const DoctorDashboardImpl = () => {
  const [userStats, setUserStats] = useState([]);
  const [other, setOther] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [event, setEvent] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.currentUser._id);
  const currentUser = useSelector((state) => state.user.currentUser);
  const medicalRegNo = useSelector(
    (state) => state.user.currentUser.medicalRegNo
  );
  const monthlyIncome = useSelector((state) => state.user.monthlyIncome);
  const totalIncome = useSelector((state) => state.user.totalIncome);
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

  const mainFeaturedPost = {
    title: "Hiii...Dr." + currentUser.firstName + " " + currentUser.lastName,
    description:
      "Good communication is key to building trust and rapport with your patients, and can help them better understand their health conditions and treatment options.",
    image:
      "https://res.cloudinary.com/midefulness/image/upload/v1682925281/medicare/5207289_wt4vcp.jpg",
    imageText: "main image description",
    // linkText: "Continue reading…",
  };

  useEffect(() => {
    const getCountInventoryData = async () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const result1 = await getMonthlyIncomeFromDoctor(
        userId,
        currentYear,
        currentMonth,
        dispatch,
        token
      );
      if (result1) {
        setOther(result1.length);
        console.log("Success");
        setLoading1(false);
      } else {
        console.log("Unsuccess");
      }
    };
    getCountInventoryData();
  }, []);

  useEffect(() => {
    const getCountInventoryData = async () => {
      const result2 = await getTotalIncomeFromDoctor(userId, dispatch, token);
      if (result2) {
        console.log(result2.length);
        console.log(admin);
        setAdmin(result2.length);
        console.log("Success");
        setLoading2(false);
      } else {
        console.log("Unsuccess");
      }
    };
    getCountInventoryData();
  }, []);

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeMedicalRecords());
      const result = await getMedicalRecord(dispatch, token);
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
      dispatch(removeOtherUsers());
      const result = await getUsers("Patient", dispatch, token);
      if (result) {
        console.log("Get user data success");
        setLoading1(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading1]);

  let featureData = [
    {
      index: 1,
      title: "Monthly Income",
      number: monthlyIncome ? "Rs." + monthlyIncome : "Rs." + 0,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
    {
      index: 2,
      title: "Medical Reg No",
      number: medicalRegNo,
      // percentage: +1.4,
      isDowngrade: true,
      // text: "Compared to last month",
    },
    {
      index: 3,
      title: "Today Income",
      number: totalIncome ? "Rs." + totalIncome : "Rs." + 0,
      // percentage: -1.4,
      isDowngrade: false,
      // text: "Compared to last month",
    },
  ];

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

  return (
    <div>
      {loading1 && loading3 ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <MainFeaturedPost post={mainFeaturedPost} />

          <FeaturedInfo data={featureData} />

          <Charts
            data={userStats}
            title="Patient Analytics"
            grid
            dataKey1="User"
            dataKey2="Admin"
          />
        </>
      )}
    </div>
  );
};
