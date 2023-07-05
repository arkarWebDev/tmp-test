import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import { getToken } from "../util/auth";

const Details = () => {
  const post = useRouteLoaderData("post-details");

  return (
    <section>
      <PostDetails post={post} />
    </section>
  );
};

export default Details;

export const loader = async ({ request, params }) => {
  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`
  );

  if (!response.ok) {
    throw json({ message: "The Post is not Available" }, { status: 500 });
  } else {
    const data = await response.json();

    return data.post;
  }
};

export const action = async ({ request, params }) => {
  const token = getToken();
  const response = await fetch(
    `${process.env.REACT_APP_DOMAIN}/posts/${params.id}`,
    {
      method: request.method,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "The Post is not Available" }, { status: 500 });
  }
  return redirect("/");
};
