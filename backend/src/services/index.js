import Agent from "../models/agent.models.js";
import Ticket from "../models/ticket.models.js";

export const findAgentWithEmail = async (email) => {
  return await Agent.findOne({ email });
};

export const createAgent = async (data) => {
  return await Agent.create(data);
};

export const createTicket = async (data) => {
  return await Ticket.create(data);
};

export const resolvedTicket = async(data)=>{
  const {id, status} = data
  if(status == 'Resolved'){
    const updatedata = {
      ...data, resolvedOn:new Date()
    }

    return await Ticket.findByIdAndUpdate(id,updatedata,{new:true})
  }
  else{
    return await Ticket.findByIdAndUpdate(id,data,{new:true})
  }
}

export const allTickets = async (query) => {
  const { status, assignedTo, type, severity } = query;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  let filterObj = {};

  if (status) {
    filterObj["status"] = status;
  }

  if (assignedTo) {
    filterObj["assignedTo"] = assignedTo;
  }

  if (type) {
    filterObj["type"] = type;
  }

  if (severity) {
    filterObj["severity"] = severity;
  }

  const totalCount = await Ticket.countDocuments(filterObj);
  const totalPages = Math.ceil(totalCount / limit);

  const tickets = await Ticket.find(filterObj)
    .sort({
      dateCreated: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalPages,
    totalCount,
    tickets,
    currentPage: page,
    pageSize: limit,
  };
};

export const allAgents = async () => {
  return await Agent.find().sort({
    dateCreated: -1,
  });
};
