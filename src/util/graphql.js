import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsers {
    users {
      id
      firstName
      lastName
    }
  }
`;

export const QUERY_USER = gql`
  query ($userId: ID!) {
    user(userId: $userId) {
      id
      firstName
      lastName
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!) {
    createUser(userData: { firstName: $firstName, lastName: $lastName }) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $firstName: String!, $lastName: String!) {
    updateUser(
      userData: { id: $id, firstName: $firstName, lastName: $lastName }
    ) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
