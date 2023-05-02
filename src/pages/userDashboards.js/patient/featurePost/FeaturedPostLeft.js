import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import './FeaturedPost.css';

function FeaturedPostLeft(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.imgUrl}
            alt="image"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              color="text.secondary"
            >
              {post.date.substring(0, 10)}
            </Typography>
            <Typography variant="subtitle2" paragraph>
              {post.description}
            </Typography>
            <Typography variant="body2" className="textWrapper" paragraph>
              {post.content}
            </Typography>
            {/* <Link variant="subtitle1" color="primary" href="#">
              Continue reading...
            </Link> */}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPostLeft.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageLabel: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPostLeft;
