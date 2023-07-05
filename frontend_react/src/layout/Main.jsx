import React from "react";
import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { getExpDuration } from "../util/auth";

const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  const { state } = useNavigation();

  // console.log(process.env.REACT_APP_DOMAIN);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "TOKEN EXPIRED!") {
      submit(null, { action: "/logout", method: "POST" });
    }

    const duration = getExpDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, [duration]);
    // console.log(duration);
  }, [token, submit]);

  return (
    <section className="main">
      <Navbar />
      {state === "loading" ? <Loader /> : <Outlet />}
    </section>
  );
};

export default Main;

export const loader = () => {};
