"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const handleTagClick = () => {};
  const handleChange = (e) => {};

  const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}      
        />
      ))}
    </div>
  );

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      setData(data);
    };
    fetchPostData();
  }, []);

  return (
    <section className="feed">
      <form className="w-full">
        <input
          type="text"
          className="search_input"
          placeholder="Search Prompts here"
          value={searchText}
          onChange={handleChange}
        />
      </form>

      <PromptCardList data={data} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
