import React from "react";
import { useMutation } from "@apollo/client";

import { DELETE_USER, QUERY_USERS } from "../../util/graphql";

export default function DeleteUser({ id, first, skip }) {
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache) {
      const data = cache.readQuery({
        query: QUERY_USERS,
        variables: { first, skip },
      });
      cache.writeQuery({
        query: QUERY_USERS,
        variables: { first, skip },
        data: {
          users: data.users.filter((p) => p.id !== id),
        },
      });
    },
    variables: { id },
  });

  return (
    <button onClick={deleteUser} style={{ cursor: "pointer" }}>
      Delete User
    </button>
  );
}
