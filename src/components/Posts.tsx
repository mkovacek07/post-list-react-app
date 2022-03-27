import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  PostContext,
  DataServiceBaseUrl,
  BaseEntityType,
} from "../context/PostContext";
import { PostProps, PostsData, PostContextInterface } from "../types/types";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";

export default function Posts(props: PostProps) {
  const { logWelcomeMessage } = useContext(PostContext) as PostContextInterface;
  const [postList, setPostList] = useState<PostsData[]>([]);
  const [orgPostList, SetOrgPostList] = useState<PostsData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //Get and set Posts data
    fetchPostsData().then((resp) => {
      setPostList(resp.data);
      SetOrgPostList(resp.data);
      setLoading(false);
    });

    //console log welcome message
    logWelcomeMessage(props.propMessage, props.componentName);
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  //set filtered list and set current page
  const setNewPostList = (searchValue: string): void => {
    const newPostList = orgPostList.filter(
      (item: PostsData) =>
        item.title.includes(searchValue) ||
        item.body.includes(searchValue) ||
        searchValue === ""
    );
    setPostList(newPostList);
    setFilter(searchValue);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchFilter
        filter={filter}
        setNewPostList={setNewPostList}
        propMessage={props.propMessage}
        componentName="SearchFilter"
      ></SearchFilter>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {currentPosts.length > 0 &&
          currentPosts
            .filter(
              (f) =>
                f.title.includes(filter) ||
                f.body.includes(filter) ||
                filter === ""
            )
            .map((post: PostsData) => (
              <div key={post.id} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <Link
                    className="card-link"
                    target="_blank"
                    to={`/post/${post.id}`}
                    onClick={() => localStorage.setItem("userId", post.userId)}
                  >
                    <h5 className="card-title">{post.title}</h5>
                  </Link>
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            ))}
      </div>
      <div>{currentPosts.length === 0 && "No data found..."}</div>
      <div className="mt-4">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postList.length}
          paginate={paginate}
          propMessage={props.propMessage}
          componentName="SearchFilter"
        />
      </div>
      <div>{loading && "Loading..."}</div>
    </>
  );
}

const fetchPostsData = (): Promise<any> => {
  return axios
    .get(`${DataServiceBaseUrl}${BaseEntityType}`)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      console.error(err);
    });
};
