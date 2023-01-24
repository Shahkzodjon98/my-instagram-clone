import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import HomePostCard from "../Components/HomePostCard";
import Loading from "../Components/Loading";
import NotFound from "../Components/NotFound";
import { firestore } from "../IIb/config";

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const postId = params.id;
  useEffect(() => {
    setLoading(true);
    const getPost = async () => {
      const res = await getDoc(doc(firestore, `posts/${postId}`));
      // console.log();
      if (res.data()) {
        setPost({ id: res.id, ...res.data() });
        setLoading(false);
      } else {
        setLoading(false);
        setPost(null);
      }
    };
    getPost();
  }, [postId]);
  return (
    <div>
   <Header />
      <div className="mt-14 mx-auto h-screen max-w-2xl p-5">
        {loading ? (
          <Loading />
        ) : (
          <>{post ? <HomePostCard post={post} /> : <NotFound />}</>
        )}
      </div>
    </div>
  );
};


export default Post;
