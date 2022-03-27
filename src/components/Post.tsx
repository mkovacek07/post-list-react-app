import React, { useContext, useState, useEffect } from "react";
import {
  PostContext,
  DataServiceBaseUrl,
  BaseEntityType,
} from "../context/PostContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Accordion, Form, ListGroup, Row } from "react-bootstrap";
import {
  PostProps,
  CommentData,
  PostData,
  PostContextInterface,
} from "../types/types";

export default function Post(props: PostProps) {
  const { logWelcomeMessage } = useContext(PostContext) as PostContextInterface;
  const [postData, setPostData] = useState<PostData | null>(null);
  const params = useParams();
  const postId = params.postId;
  const userId = localStorage.getItem("userId") || null;

  useEffect(() => {
    //Get and set single Post data
    fetchPostData(postId, userId).then(
      axios.spread((user: any, post: any, comments: any) => {
        const commentArr: Array<CommentData> = comments?.data.map(
          (item: { id: number; name: string }) => ({
            commentId: item.id,
            comment: item.name,
          })
        );
        const data: PostData = {
          post: post.data.title,
          postBody: post.data.body,
          userFullName: user.data.name,
          comments: commentArr,
        };
        setPostData(data);
      })
    );

    //console log welcome message
    logWelcomeMessage(props.propMessage, props.componentName);
  }, []);
  return (
    <>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold">
            User:
          </Form.Label>
          <Form.Label column sm="10">
            {postData?.userFullName && postData.userFullName}
          </Form.Label>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold">
            Post Title:
          </Form.Label>
          <Form.Label column sm="10">
            {postData?.post && postData.post}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2" className="fw-bold">
            Post:
          </Form.Label>
          <Form.Label column sm="10">
            {postData?.postBody && postData.postBody}
          </Form.Label>
        </Form.Group>
      </Form>
      <div className="mt-4">
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Comments</Accordion.Header>
            <Accordion.Body>
              <ListGroup as="ul">
                {postData?.comments &&
                  postData.comments.map((comm: CommentData) => {
                    return (
                      <ListGroup.Item key={comm.commentId} as="li">
                        {comm.comment}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

const fetchPostData = async (postId: any, userId: any): Promise<any> => {
  const urls = [
    `${DataServiceBaseUrl}users/${userId}`,
    `${DataServiceBaseUrl}${BaseEntityType}/${postId}`,
    `${DataServiceBaseUrl}comments?postId=${postId}`,
  ];
  return axios.all(urls.map((url) => axios.get(url))).catch((err) => {
    console.log(err);
  });
};
