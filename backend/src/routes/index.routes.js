import express from 'express'
import asyncHandler from "express-async-handler" 
import createHttpError from 'http-errors'
import { allAgents, allTickets, createAgent, createTicket, findAgentWithEmail, resolvedTicket } from '../services/index.js'
const router = express.Router()

/**
 *
 * @route GET /api/support-tickets
 * @description Get all tickets for support-ticket
 */
router.get('/support-tickets', asyncHandler(async(req,res,next)=>{
    const  query = req.query
    const data = await allTickets(query)
    res.status(200).json(data)
}) )

/**
 *
 * @route GET /api/support-tickets
 * @description Get all tickets for support-ticket
 */
router.get('/support-agents', asyncHandler(async(req,res,next)=>{
    const agents = await allAgents()
    res.status(200).json(agents)
}) )

/**
 * @body name, phone , description, email
 * @route POST /api/support-agents
 * @description create support agent
 */
router.post('/support-agents', asyncHandler(async(req,res, next)=>{
    const {name,phone,email,description} = req.body;
    if(!name){
        return next(createHttpError(400,"Name is required"))
    }

    if(!phone){
        return next(createHttpError(400,"Phone is required"))
    }

    if(!email){
        return next(createHttpError(400,"Email is required"))
    }
    
    
    //check if agent with given email exists or not
    const existAgent = await findAgentWithEmail(email);
    if(existAgent){
        return next(createHttpError(409,'This Email already exists'))
    }

    //if no agent found create new agent
    const newAgent = await createAgent(req.body)
    res.status(201).json(newAgent)
    
}))


/**
 * @body topic description severity resolvedOn assignedTo type
 * @route POST /api/support-tickets
 * @description create new ticket for agent support-ticket
 */
router.post('/support-tickets',asyncHandler(async(req, res, next)=>{
    const {topic,description,severity,assignedTo, type}=req.body;
    if(!topic){
        return next(createHttpError(400,"Please provide ticket topic"))
    }

    if(!description){
        return next(createHttpError(400,"Please provide ticket description"))
    }

    if(!severity){
        return next(createHttpError(400,"Please provide ticket severity"))
    }

    if(!assignedTo){
        return next(createHttpError(400,"Please provide ticket agent to be assigned"))
    }

    if(!type){
        return next(createHttpError(400,"Please provide ticket type"))
    }

    const newTicket = await createTicket(req.body)
    res.status(201).json(newTicket)

}) )



/**
 * @body topic description severity resolvedOn assignedTo type
 * @route PUT /api/support-tickets
 * @description edit new ticket for agent support-ticket
 */
router.put('/support-tickets',asyncHandler(async(req, res, next)=>{
    const newTicket = await resolvedTicket(req.body)
    res.status(201).json(newTicket)

}) )


export default router