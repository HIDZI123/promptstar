"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import img1 from "@public/assets/icons/copy.svg";
import img2 from "@public/assets/icons/tick.svg";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex felx-between justify-start items-center gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            height={50}
            width={50}
            className="object-contain rounded-full"
            alt="Profile Image "
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <h2 className="font-satoshi  text-gray-900 font-semibold">
            {post.creator.username}
          </h2>
          <p className="font-inter text-gray-500 text-sm">
            {post.creator.email}
          </p>
        </div>

        <div className="copy_btn">
          <Image
            src={copied === post.prompt ? img2 : img1}
            alt="Copy Img"
            onClick={handleCopy}
            height={12}
            width={12}
          />
        </div>
      </div>

      <p className="my-5 text-gray-500 font-satoshi">{post.prompt}</p>

      <p
        className="text-sm font-inter cursor-pointer blue_gradient"
        onClick={() => handleTagClick}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-6 flex-end flex items-center gap-10">
          <button
            className="green_gradient font-inter text-sm cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="orange_gradient font-inter text-sm cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
