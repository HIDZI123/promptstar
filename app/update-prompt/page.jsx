"use client";
import React, { useState, useEffect, Suspense } from "react";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const UpdatePrompt = () => {
  const [submitForm, setSubmitform] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      console.log(data);

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) fetchPosts();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitform(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log("Error Occured");
      }
    } catch (error) {
      console.error("Error occured while posting prompt: ", error);
    } finally {
      setSubmitform(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        handleSubmit={handleSubmit}
        submitForm={submitForm}
      />
    </Suspense>
  );
};

export default UpdatePrompt;