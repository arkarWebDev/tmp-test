import React from "react";
import PostForm from "../components/PostForm";


const Create = () => {
  return (
    <div>
      <PostForm header={"Create Your Post Now!"} btnText={"Create"} method="POST" />
    </div>
  );
};

export default Create;


