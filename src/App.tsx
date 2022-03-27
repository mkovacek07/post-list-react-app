import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";

function App() {
  const propMessage: string = "Hello from ";

  return (
    <div className="container mt-2">
      <nav>
        <Link to="/posts">
          <h3 className="mb-2">Post List</h3>
        </Link>
      </nav>
      <div className="ms-4 mt-4">
        <Routes>
          <Route
            path="/posts"
            element={<Posts componentName="Posts" propMessage={propMessage} />}
          ></Route>
          <Route
            path="/post/:postId"
            element={<Post componentName="Post" propMessage={propMessage} />}
          ></Route>
          {
            <Route
              path="*"
              element={
                <Posts componentName="Posts" propMessage={propMessage} />
              }
            ></Route>
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
