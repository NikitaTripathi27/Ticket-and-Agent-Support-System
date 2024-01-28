import { Schema, model } from "mongoose";

const agentSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  description: String,
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: { type: Date, default: Date.now() },
});

const Agent = model('Agent', agentSchema)

export default Agent