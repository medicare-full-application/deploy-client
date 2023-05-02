import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CellTowerIcon from "@mui/icons-material/CellTower";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { useSelector } from "react-redux";
export const SlideBarListItems = () => {
  const userType = useSelector((state) => state.user.userType);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.currentUser._id);

  let listItems = [];

  if (userType === "Doctor") {
    listItems = [
      {
        id: "leftbar-listItem-1",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/doctorDashboard",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-2",
        listName: "Patients",
        link: "/patient",
        // link: "/doctor/patient",
        icon: <BookmarksIcon />,
        hasExpand: false,
        name: "patients",
      },
      {
        id: "leftbar-listItem-3",
        listName: "All Medical Records",
        link: "/medicalRecord",
        icon: <BookmarksIcon />,
        hasExpand: false,
        name: "all_medical_records",
      },
      // {
      //   id: "leftbar-listItem-4",
      //   listName: "Manage Events",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/event",
      //   name: "view_events",
      // },
      // {
      //   id: "leftbar-listItem-5",
      //   listName: "Manage Advertisements",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/advertisement",
      //   name: "view_advertisement",
      // },
      // {
      //   id: "leftbar-listItem-6",
      //   listName: "Manage Posts",
      //   icon: <BookmarksIcon />,
      //   hasExpand: false,
      //   link: "/post",
      //   name: "view_posts",
      // },
    ];
  } else if (userType === "Patient") {
    if (!currentUser.childOrNot) {
      if (currentUser.haveChildren) {
        listItems = [
          {
            id: "leftbar-listItem-4",
            listName: "Dashboard",
            icon: <BookmarksIcon />,
            link: "/patientDashboard",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-5",
            listName: "Doctors",
            icon: <BookmarksIcon />,
            link: "/doctor",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-6",
            listName: "My Medical Records",
            icon: <BookmarksIcon />,
            link: "/medicalRecord",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-66",
            listName: "Add Child",
            icon: <BookmarksIcon />,
            link: "/addChild",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-66",
            listName: "Children List",
            icon: <BookmarksIcon />,
            link: `/patient/child/${userId}`,
            name: "dashboard",
          },
        ];
      } else {
        listItems = [
          {
            id: "leftbar-listItem-4",
            listName: "Dashboard",
            icon: <BookmarksIcon />,
            link: "/patientDashboard",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-5",
            listName: "Doctors",
            icon: <BookmarksIcon />,
            link: "/doctor",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-6",
            listName: "My Medical Records",
            icon: <BookmarksIcon />,
            link: "/medicalRecord",
            name: "dashboard",
          },
          {
            id: "leftbar-listItem-66",
            listName: "Add Child",
            icon: <BookmarksIcon />,
            link: "/addChild",
            name: "dashboard",
          },
        ];
      }
    } else {
      listItems = [
        {
          id: "leftbar-listItem-4",
          listName: "Dashboard",
          icon: <BookmarksIcon />,
          link: "/patientDashboard",
          name: "dashboard",
        },
        {
          id: "leftbar-listItem-5",
          listName: "Doctors",
          icon: <BookmarksIcon />,
          link: "/doctor",
          name: "dashboard",
        },
        {
          id: "leftbar-listItem-6",
          listName: "My Medical Records",
          icon: <BookmarksIcon />,
          link: "/medicalRecord",
          name: "dashboard",
        },
      ];
    }
  } else if (userType === "Pharmacist") {
    listItems = [
      {
        id: "leftbar-listItem-7",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/pharmacistDashboard",
        name: "dashboard",
      },
      // {
      //   id: "leftbar-listItem-7",
      //   listName: "Patients",
      //   icon: <BookmarksIcon />,
      //   link: "/patient",
      //   name: "dashboard",
      // },
      {
        id: "leftbar-listItem-8",
        listName: "Medical Records",
        icon: <BookmarksIcon />,
        link: "/medicalRecord",
        name: "dashboard",
      },
      // {
      //   id: "leftbar-listItem-8",
      //   listName: "Dashboard",
      //   icon: <BookmarksIcon />,
      //   link: "/pharmacistDashboard",
      //   name: "dashboard",
      // }
    ];
  } else if (userType === "Admin") {
    listItems = [
      {
        id: "leftbar-listItem-9",
        listName: "Dashboard",
        icon: <BookmarksIcon />,
        link: "/dashboard",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-10",
        listName: "All Doctors",
        icon: <BookmarksIcon />,
        link: "/doctor",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-10",
        listName: "All Patients",
        icon: <BookmarksIcon />,
        link: "/patient",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-10",
        listName: "All Pharmacist",
        icon: <BookmarksIcon />,
        link: "/pharmacist",
        name: "dashboard",
      },
      {
        id: "leftbar-listItem-10",
        listName: "All News",
        icon: <BookmarksIcon />,
        link: "/news",
        name: "dashboard",
      },
    ];
  }

  return listItems;
};
