import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import DeleteUser from "../DeleteUser/DeleteUser";
import { QUERY_USERS, QUERY_USERS_NO_PAGINATION } from "../../util/graphql";

import "./user.css";

export default function User({ setCurrentId, currentId }) {
  const dataLimit = 10;
  const [skipData, setSkipData] = useState(0);

  const { data: users } = useQuery(QUERY_USERS_NO_PAGINATION);
  const overallLastUserId = users && users.users[users.users.length - 1].id;
  //console.log(users);

  const { data, loading } = useQuery(QUERY_USERS, {
    variables: { first: dataLimit, skip: skipData },
  });

  //const paginatedLastUserId = data.users[data.users.length - 1].id;
  //console.log(data.users);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="user-info-container">
        {data.users?.map(({ id, firstName, lastName }) => (
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
                <DeleteUser id={id} first={dataLimit} skip={skipData} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => (skipData > 0 ? setSkipData(skipData - 10) : 0)}>
          Prev
        </button>
        <button
          onClick={() =>
            overallLastUserId !== data.users[data.users.length - 1].id
              ? setSkipData(skipData + 10)
              : skipData
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
