import React from "react";
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export const action = async ({ request }) => {
  // get mode value
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  // check mode value
  if (mode !== "login" && mode !== "signup") {
    throw new Error("");
  }

  // get form data from request
  const data = await request.formData();
  // store user unput data
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`${process.env.REACT_APP_DOMAIN}/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  // check user input exist
  if (response.status === 422 || response.status === 401) {
    // console.log(response);
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Something went wrong! Please Try Again" },
      { status: 500 }
    );
  }
  const resData = await response.json();
  const authToken = resData.token;

  localStorage.setItem("token", authToken);
  // console.log(authToken);
  const expDate = new Date();
  expDate.setHours(expDate.getHours() + 1);
  localStorage.setItem("exp", expDate.toISOString());
  return redirect("/");
};
