import React from "react";
import {
  CalendarDaysIcon,
  ArrowLeftIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const PostDetails = ({ post }) => {
  const isToken = useRouteLoaderData("root");

  const { description, image, title, date } = post;

  const submit = useSubmit();

  const postDeleteHandler = () => {
    const confirmStatus = window.confirm(
      "Are You Sure want to delete this post?"
    );

    if (confirmStatus) {
      submit(null, { method: "DELETE" });
    } else {
      console.log(confirmStatus);
      console.log("Will not deleted");
    }
  };

  return (
    <section className="details">
      <h1 className="detail-title">{title}</h1>
      <div className="detail-header">
        <Link to={"/"}>
          <ArrowLeftIcon className="Icon" />
        </Link>
        <p className="date">
          Posted at -<CalendarDaysIcon className="Icon-calender" />
          <span>{date}</span>
        </p>
      </div>
      <img src={image} alt={title} />
      <p className="desc">{description}</p>
      {isToken && (
        <div className="detail-header">
          <div className="edit-delete">
            <PencilSquareIcon className="Icon" />
            <Link to={`edit-post`}>
              <p>Edit</p>
            </Link>
          </div>
          <div className="edit-delete">
            <TrashIcon className="Icon trash" />
            <p onClick={postDeleteHandler}> Delete</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetails;
