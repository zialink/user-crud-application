import React, { useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import User from "./components/User/User";
import CreateEditUser from "./components/CreateEditUser/CreateEditUser";

import "./app.css";

const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function App() {
  const [currentId, setCurrentId] = useState(null);
  return (
    <ApolloProvider client={client}>
      <div className="app-wrapper">
        <div className="nav-wrapper">
          <div className="navbar">
            <h2>
              User App{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </h2>
          </div>
        </div>
        <div className="main">
          <CreateEditUser currentId={currentId} setCurrentId={setCurrentId} />
          <User setCurrentId={setCurrentId} />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
