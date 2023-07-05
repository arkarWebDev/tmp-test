import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import PostForm from "../components/PostForm";

const EditPost = () => {
  const post = useRouteLoaderData("post-details");
  return (
    <div>
      <PostForm
        header={"Edit Your Post Now!"}
        btnText={"Update"}
        oldPostData={post}
        method={"PATCH"}
      />
    </div>
  );
};

export default EditPost;
