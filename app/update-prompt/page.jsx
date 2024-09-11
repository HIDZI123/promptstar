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
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchPosts = async () => {
        try {
          const response = await fetch(`/api/prompt/${id}`);
          const data = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (error) {
          console.error("Error fetching prompt data:", error);
        }
      };

      fetchPosts();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitform(true);

    try {
      const response = await fetch(`/api/prompt/${id}`, {
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
        console.log("Error Occurred");
      }
    } catch (error) {
      console.error("Error occurred while posting prompt: ", error);
    } finally {
      setSubmitform(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {id ? (
        <Form
          type="Update"
          post={post}
          setPost={setPost}
          handleSubmit={handleSubmit}
          submitForm={submitForm}
        />
      ) : (
        <div>Invalid prompt ID</div>
      )}
    </Suspense>
  );
};

export default UpdatePrompt;