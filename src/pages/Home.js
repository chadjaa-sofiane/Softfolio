import { useQuery } from "@apollo/client";
import React from "react";
import PostCard from "../components/home/postCard";
import CreatePost from "../components/home/createPost";
import { GET_POSTS } from "../graphql/querys";
import { useLogged } from "../util/hooks";
import Skeleton from "@material-ui/lab/Skeleton";
import { LinearProgress,Grid } from "@material-ui/core";

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const isLoggedIn = useLogged();
  if (loading)
    return (
      <Grid item lg={8} md={10} xs={12}>
        <LinearProgress/>
        <div style={{ width: "100%" }}>
          <Skeleton variant="circle" animation="wave" width={70} height={70} />
          <Skeleton variant="rect" animation="wave" width="100%" height={150} />
        </div>
        <div style={{ width: "100%" }}>
          <Skeleton variant="circle" animation="wave" width={70} height={70} />
          <Skeleton variant="rect" animation="wave" width="100%" height={150} />
        </div>
        <div style={{ width: "100%" }}>
          <Skeleton variant="circle" animation="wave" width={70} height={70} />
          <Skeleton variant="rect" animation="wave" width="100%" height={150} />
        </div>
      </Grid>
    );
  if (error) {
    return <p>'ERROR !'</p>;
  }
  return (
    <>
      <Grid item lg={8} sm={6} xs={10}>
        {isLoggedIn && <CreatePost />}
        {data.getPosts.map((el) => (
          <PostCard key={el._id} postData={el} />
        ))}
      </Grid>
    </>
  );
}
