import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { FilterProps, PostContextInterface } from "../types/types";

export default function SearchFilter(props: FilterProps) {
  const { logWelcomeMessage } = useContext(PostContext) as PostContextInterface;

  useEffect(() => {
    logWelcomeMessage(props.propMessage, props.componentName);
  }, []);

  return (
    <div>
      <p>
        Type to filter the list:&nbsp;
        <input
          id="filter"
          name="filter"
          type="text"
          value={props.filter}
          onChange={(event) => props.setNewPostList(event.target.value)}
        />
      </p>
    </div>
  );
}
