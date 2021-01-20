import { CircularProgress, Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import React from "react";
import PostCard from "../components/home/postCard";
import CreatePost from "../components/home/createPost";
import { GET_POSTS } from "../graphql/querys";
import { useLogged } from "../util/hooks";

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);
  const isLoggedIn = useLogged();
  if (loading) return <CircularProgress color="secondary" />;
  if (error) {
    console.log(error);
    return <p>'ERROR !'</p>;
  }
  return (
    <>
      <Grid item lg={8} md={10} xs={12}>
        {isLoggedIn && <CreatePost />}
        {data.getPosts.map((el) => (
          <PostCard key={el._id} postData={el} />
        ))}
      </Grid>
    </>
  );
}
