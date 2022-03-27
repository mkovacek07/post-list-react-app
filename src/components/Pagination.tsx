import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { PaginationProps, PostContextInterface } from "../types/types";

export default function Pagination(props: PaginationProps) {
  const pageNumbers = [];
  const { logWelcomeMessage } = useContext(PostContext) as PostContextInterface;

  useEffect(() => {
    logWelcomeMessage(props.propMessage, props.componentName);
  }, []);

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number: number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => props.paginate(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
