import * as React from "react";
import { PostContextInterface } from "../types/types";

export const DataServiceBaseUrl = "https://jsonplaceholder.typicode.com/";
export const BaseEntityType = "posts";
export const PostContext =
  React.createContext<PostContextInterface | null>(null);

const PostProvider: React.FC<React.ReactNode> = ({ children }) => {
  const logWelcomeMessage = (
    helloMessage: string,
    componentName: string
  ): void => {
    console.log(`${helloMessage}${componentName}`);
  };

  return (
    <PostContext.Provider
      value={{
        logWelcomeMessage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
