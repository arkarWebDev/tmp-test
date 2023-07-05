import React from "react";
import { json, useLoaderData } from "react-router-dom";
import PostItem from "../components/PostItem";
// import { useRouteLoaderData } from "react-router-dom";

const Posts = () => {
  const posts = useLoaderData();

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <PostItem post={post} key={post.id} />)}
    </>
  );
};

export default Posts;
export const loader = async () => {
  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/posts`);

  if (!response.ok) {
    throw json({ message: "The Post is not Available" }, { status: 500 });
  } else {
    const data = await response.json();
    return data.posts;
  }
};
