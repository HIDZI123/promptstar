"use client";
import React, { useState } from "react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const [submitForm, setSubmitform] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitform(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if(response.ok){
        router.push('/');
      }
      else{
        console.log("Error Occured");
      }
    } catch (error) {
      console.error("Error occured while posting prompt: ", error);
    } finally {
      setSubmitform(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      handleSubmit={handleSubmit}
      submitForm={submitForm}
    />
  );
};

export default CreatePost;
