import React from "react";
import Link from "next/link";

const Form = ({ post, setPost, submitForm, handleSubmit, type }) => {
  return (
    <section className="w-full h-full min-h-full max-w-full flex-col flex-start gap-5">
      <h1 className="head_text text-left ">
        <span className="blue_gradient">{type} Prompts</span>
      </h1>

      <p className="text-left max-w-md desc">
        {type} and share amazing prompts with the world, let your imagination
        run wild on any AI-platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col text-left w-full max-w-2xl gap-5 glassmorphism mt-7"
      >
        <label>
          <span className="text-base font-satoshi font-semibold text-gray-700">
            {type} Your Prompt
          </span>
          <textarea
            value={post.prompt}
            className="form_textarea"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            placeholder="Write any prompt you like here..."
            aria-label="Prompt"
          />
        </label>

        <label>
          <span className="text-base font-satoshi font-semibold text-gray-700">
            {type} Your Tags
          </span>
          <input
            value={post.tag}
            className="form_input"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            placeholder="Eg: #tag1 #tag2"
            aria-label="Tags"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4 mt-5 ">
          <Link href="/" className="text-gray-900 text-sm font-semibold">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitForm}
            className="px-4 py-1 bg-primary-orange rounded-full text-white"
          >
            {submitForm ? `${type}ing...` : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;