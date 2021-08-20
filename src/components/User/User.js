import React from "react";
import { useQuery } from "@apollo/client";

import DeleteUser from "../DeleteUser/DeleteUser";
import { QUERY_USERS } from "../../util/graphql";

import "./user.css";

export default function User({ setCurrentId, currentId }) {
  const { data, loading } = useQuery(QUERY_USERS);

  if (loading) return <p>Loading...</p>;

  return data.users?.map(({ id, firstName, lastName }) => (
    <div key={id} className="user-info-wrapper">
      <div className="user-id">User-{id}</div>
      <div className="username">
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div className="edit-button">
        <span>
          <button
            onClick={() => setCurrentId(id)}
            style={{ cursor: "pointer" }}
          >
            Edit User
          </button>
        </span>
      </div>
      <div className="delete-button">
        <span>
          <DeleteUser id={id} />
        </span>
      </div>
    </div>
  ));
}
