import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import FeaturedInfo from "../../../components/featuredInfo/FeaturedInfo";
import Charts from "../../../components/charts/Charts";
import MainFeaturedPost from "./patientList/MainFeaturedPost";
import FeaturedPostLeft from "./featurePost/FeaturedPostLeft";
import FeaturedPostRight from "./featurePost/FeaturedPostRight";
import { removeNews } from "../../../redux/newsRedux";
import { getNews } from "../../../redux/newsApiCalls";
import Footer from "./footer/Footer";
import { removeDoctorUsers } from "../../../redux/userRedux";
import { getDoctorUsers } from "../../../redux/userApiCalls"; 

export const PatientDashboardImpl = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const news = useSelector((state) => state.news.newsData);

  const [userStats, setUserStats] = useState([]);
  const [newsData, setNewsData] = useState(news);
  const [featuredFlag, setFeaturedFlag] = useState(true);
  const [trigger, setTrigger] = useState("s");
  const [deleteTrigger, setDeleteTrigger] = useState("s");

  const [other, setOther] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [event, setEvent] = useState(0);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [featuredData, setFeaturedData] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);;

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeNews());
      const result = await getNews(dispatch, token);
      if (result) {
        console.log("Get user data success");
        // setTrigger(trigger + "s");
        setLoading1(false);
        setNewsData(news);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading1, deleteTrigger]);

  useEffect(() => {
    const getDataFromDB = async () => {
      dispatch(removeDoctorUsers());
      const result = await getDoctorUsers(dispatch, token);
      if (result) {
        console.log("Get user data success");
        setTrigger(trigger + "s");
        setLoading2(false);
      } else {
        console.log("Get user data unsuccess");
      }
    };
    getDataFromDB();
  }, [loading2, deleteTrigger]);

  const mainFeaturedPost = {
    title: "Hiii..." + currentUser.firstName + " " + currentUser.lastName,
    description:
      "Practice stress management techniques, such as deep breathing, meditation, or yoga, to help reduce stress levels.",
    image:
      "https://res.cloudinary.com/midefulness/image/upload/v1681233608/medicare/3568984_rooxfm.jpg",
    imageText: "main image description",
    // linkText: "Continue reading…",
  };

  return (
    <div>
      {(!loading1 && !loading2) && (
        <>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {newsData != null && newsData.map((post) => (
              // featuredFlag ? (
              //   <FeaturedPostLeft key={post._id} post={post} />
              // ) : (
              //   <FeaturedPostRight key={post._id} post={post} />
              // )
              <FeaturedPostLeft key={post._id} post={post} />
            ))}
          </Grid>
          <Footer
            title="MediCare"
            description="Drink plenty of water throughout the day to help maintain proper hydration levels and support overall health!"
          />
        </>
      )}
    </div>
  );
};
