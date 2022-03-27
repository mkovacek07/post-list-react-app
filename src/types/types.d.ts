export interface PostContextInterface {
  logWelcomeMessage: (helloMessage: string, componentName: string) => void;
}

export interface PostProps {
  componentName: string;
  propMessage: string;
}

export interface PostsData {
  body: string;
  id: number;
  title: string;
  userId: any;
}

export interface CommentData {
  commentId: number;
  comment: string;
}

export interface PostData {
  post: string;
  postBody?: string;
  userFullName: string;
  comments: Array<CommentData>;
}

export interface PaginationProps extends PostProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
}

export interface FilterProps extends PostProps {
  filter: string;
  setNewPostList: (number: string) => void;
}
