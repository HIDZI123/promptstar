import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Get (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response(JSON.stringify("Prompt Doesn't Exist"), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error Searching Prompts"), {
      status: 500,
    });
  }
};

//Patch (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompts = await Prompt.findById(params.id);

    if (!existingPrompts) {
      return new Response("Prompt doesn't Exist", { status: 404 });
    }

    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();

    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("Error While Updating prompts", { status: 500 });
  }
};

//Delete (delete)

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Prompt Deletion failed", { status: 500 });
  }
};
