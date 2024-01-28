import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  topic:String,
  description:String,
  dateCreated: { type: Date, default: Date.now() },
  severity: String,
  type:String,
  assignedTo: {
    type: String,
   
  },
  status: {
    type:String,
    enum:["New", "Assigned", "Resolved"],
    default:"New"
  },
  resolvedOn : Date
});

const Ticket = model('Ticket', ticketSchema)

export default Ticket