import * as z from "zod";

export const CreateAgentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .max(12, { message: "Limit exceeded" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  description: z.string(),
});


export const CreateTicketSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  severity: z.string(),
  description: z.string(),
  type:z.string().min(1, { message: "Type is required" }),
  assignedTo: z.string().min(1,{message:"Assignedto is required"}),

});

export const EditTicketSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  severity: z.string(),
  description: z.string(),
  type:z.string().min(1, { message: "Type is required" }),
  assignedTo: z.string().min(1,{message:"Assignedto is required"}),
  status:z.string(),
});
