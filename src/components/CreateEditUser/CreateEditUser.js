import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

import { QUERY_USER, UPDATE_USER, CREATE_USER } from "../../util/graphql";

export default function CreateEditUser({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
  });

  const onChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const { data: user } = useQuery(QUERY_USER, {
    variables: { userId: currentId },
  });

  useEffect(() => {
    if (user) {
      setPostData({
        firstName: user?.user.firstName,
        lastName: user?.user.lastName,
      });
    }
  }, [user]);

  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        firstName: postData.firstName,
        lastName: postData.lastName,
      },
    });

    setPostData({
      firstName: "",
      lastName: "",
    });
    setCurrentId(null);
  };

  const mutation = currentId ? UPDATE_USER : CREATE_USER;

  const [createUser] = useMutation(mutation, {
    variables: { id: currentId },
    update(cache, { data: { createUser } }) {
      if (!currentId) {
        cache.modify({
          fields: {
            users(existingUsers = []) {
              const newUserRef = cache.writeFragment({
                data: createUser.user,
                fragment: gql`
                  fragment NewUser on UserType {
                    id
                    firstName
                    lastName
                  }
                `,
              });
              return [...existingUsers, newUserRef];
            },
          },
        });
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={handleCreateUser}
        style={{ marginTop: "2em", marginBottom: "2em" }}
      >
        <label>First Name:</label>
        <input
          name="firstName"
          value={postData.firstName}
          onChange={onChange}
          style={{ marginRight: "1em" }}
        />

        <label>Last Name:</label>
        <input
          name="lastName"
          value={postData.lastName}
          onChange={onChange}
          style={{ marginRight: "1em" }}
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          {currentId ? "Edit User" : "Add a User"}
        </button>
      </form>
    </div>
  );
}
