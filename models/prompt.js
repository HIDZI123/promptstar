import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },

  prompt: {
    type: String,
    required: [true, "The prompt field is required"],
  },
  tag: {
    type: String,
    required: [true, "The tag field is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
