export type TAgent={
    _id:string,
    name: string;
    phone:string;
    email:string
    dateCreated:string
    active: boolean
}

export type TOptions ={
    value:string,
    label:string,

}

export type TTicket = {
    _id:string;
    topic:string,
    description:string,
    status:string,
    severity:string,
    type:string;
    assignedTo:string;
    dateCreated:string;
}

