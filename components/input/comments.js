import { useEffect, useState, useContext } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import NotificationContext from "../../context/notification-context";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);

  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const NotificationCtx = useContext(NotificationContext);

  
  useEffect(() => {
    setIsFetchingComments(true);

    fetch(`/api/comments/${eventId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        setComments(data.comments);
        setIsFetchingComments(false);
      });
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const data = { ...commentData, eventId };


    //Pending state flash message
    NotificationCtx.showNotification({
      title: "Pending...",
      message: "Adding comment to post....",
      status: "pending",
    });

    //Add Comment
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
       .then((data) => {
        NotificationCtx.showNotification({
          title:'Success!.',
          message:'Comment was addded succesfully.',
          status:'success'
        })
      })
      .catch((error) => {
        NotificationCtx.showNotification({
          title:'Error!',
          message:error.message || 'Something went wrong!',
          status:'error'
        })
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments  && !isFetchingComments && <CommentList comments={comments} />}
      {showComments  && isFetchingComments && <p>Loading...</p>}
      
    </section>
  );
}

export default Comments;
