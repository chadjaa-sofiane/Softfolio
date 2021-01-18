import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const imageInfo = {
  path: { type: String, default: "" },
  background: Boolean,
  profile: Boolean,
  createdAt: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  filename: { type: String, required: true },
};

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  BorthDay: { type: Date, required: true },
  images: [imageInfo],
  gender: { type: String, required: true },
  description: { type: String, default: "" },
  updated: { type: Date, default: Date.now },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  salt: { type: Number, required: true },
  info: {
    adress_ip: { type: String, default: "0.0.0.0/32" },
    user_adress: { type: String },
    entry_times: { type: Number, default: 0 },
    last_entry: { type: Date },
  },
  subscribers: [
    {
      is_accecpt: { type: Boolean, default: true },
      Subscriber_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  blogs: [
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      likes: [
        {
          username: { type: String, required: true },
          isActive: { type: Boolean, default: false },
        },
      ],
    },
  ],
  modifings: [
    {
      body: String,
      updated_at: { type: Date, default: Date.now },
    },
  ],
});
userSchema.plugin(uniqueValidator);

export default model("User", userSchema);
