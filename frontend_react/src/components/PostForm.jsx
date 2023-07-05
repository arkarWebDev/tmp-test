import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import uuid from "react-uuid";
import { json, redirect } from "react-router-dom";
import { getToken } from "../util/auth";

const PostForm = ({ header, btnText, oldPostData, method }) => {
  const data = useActionData();

  const navigate = useNavigation();

  const isSubmitting = navigate.state === "submitting";

  return (
    <section className="form-section">
      <div className="detail-header">
        <Link to={"/"}>
          <ArrowLeftIcon className="Icon" />
        </Link>
        <p>{header}</p>
      </div>
      <hr />
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <Form method={method}>
        <div>
          <label htmlFor="form-title" className="text-white">
            Title
          </label>
          <input
            type="text"
            id="form-title"
            name="title"
            defaultValue={oldPostData ? oldPostData.title : ""}
          />
        </div>
        <div>
          <label htmlFor="form-image" className="text-white">
            Image URL
          </label>
          <input
            type="url"
            id="form-image"
            name="image"
            defaultValue={oldPostData ? oldPostData.image : ""}
          />
        </div>
        <div>
          <label htmlFor="form-date" className="text-white">
            Date
          </label>
          <input
            type="date"
            id="form-date"
            name="date"
            defaultValue={oldPostData ? oldPostData.date : ""}
          />
        </div>
        <div>
          <label htmlFor="form-description" className="text-white">
            Description
          </label>
          <textarea
            name="description"
            id="form-description"
            cols="38"
            rows="5"
            placeholder="Enter your thoughts!"
            defaultValue={oldPostData ? oldPostData.description : ""}
          ></textarea>
        </div>
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : <p>{btnText}</p>}
        </button>
      </Form>
    </section>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  // console.log(data);

  const method = request.method;
  // receive token from local storage
  const token = getToken();

  const postData = {
    id: uuid(),
    title: data.get("title"),
    description: data.get("description"),
    image: data.get("image"),
    date: data.get("date"),
  };

  let url = `${process.env.REACT_APP_DOMAIN}/posts`;

  if (method === "PATCH") {
    const id = params.id;
    url = `${process.env.REACT_APP_DOMAIN}/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "The Post is not Available" }, { status: 500 });
  } else {
    return redirect("/");
  }
};
