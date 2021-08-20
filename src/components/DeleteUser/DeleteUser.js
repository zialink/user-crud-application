import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_USER, QUERY_USERS } from "../../util/graphql";

export default function DeleteUser({ id }) {
  const [deleteUser] = useMutation(DELETE_USER, {
    variables: { id },
    update(cache) {
      const data = cache.readQuery({
        query: QUERY_USERS,
      });
      cache.writeQuery({
        query: QUERY_USERS,
        data: {
          users: data.users.filter((p) => p.id !== id),
        },
      });
    },
  });

  return (
    <button onClick={deleteUser} style={{ cursor: "pointer" }}>
      Delete User
    </button>
  );
}
