import {
  Box,
  Collapse,
  createTheme,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlideBarListItems } from "./SlideBarListItems";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const drawerWidth = 340;

const theme = createTheme({
  palette: {
    primary: {
      main: "#007A31",
    },
  },
  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
function SlideBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItems = SlideBarListItems();
  console.log(listItems);

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Medicare
      </Typography>
      <Divider />
      <List>
        {listItems.map((listItem) => (
          <div key={listItem.id}>
            {!listItem.hasExpand ? (
              <ListItemButton
                key={listItem.id}
                onClick={() => navigate(listItem.link)}
              >
                <ListItemIcon>{listItem.icon}</ListItemIcon>
                <ListItemText primary={listItem.listName} />
              </ListItemButton>
            ) : (
              <React.Fragment>
                <ListItemButton key={listItem.id} onClick={handleClick}>
                  <ListItemIcon>{listItem.icon}</ListItemIcon>
                  <ListItemText primary={listItem.listName} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {listItem.expand.map((expandItem) => (
                      <ListItemButton
                        key={expandItem.id}
                        onClick={() => navigate(expandItem.link)}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{expandItem.icon}</ListItemIcon>
                        <ListItemText primary={expandItem.listName} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
  return (
    <ThemeProvider theme={theme}>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={props.open}
          onClose={props.onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            //   display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

export default SlideBar;
