import React, { useState } from 'react'
import { TTicket } from '../types'
import moment from 'moment'
import useEditTicketModal from '../hooks/useEditTicketModal'
import EditTicketModal from './modals/EditTicketModal'
type TicketProps = {
    tickets:TTicket[],
    page:number,
    limit:number
}
const Tickets:React.FC<TicketProps> = ({tickets,page,limit}) => {
  const [ticket,setTicket] = useState<TTicket | null >(null)
  const startIndex = (page -1 )*limit;
  const editTicketModal = useEditTicketModal()
  return (
    <>
    
    <div className="relative overflow-x-auto my-8">
    <table className="w-full rounded-lg ">
      <thead className="uppercase text-gray-700 bg-gray-100 h-12 rounded-t-lg text-nowrap text-center">
        <tr>
          <th scope="col" className="px-6 py-3">
            id
          </th>
          <th scope="col" className="px-6 py-3">
            Topic
          </th>
          <th scope="col" className="px-6 py-3">
            Assigned To
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Created On
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Severity
          </th>
          <th scope="col" className="px-6 py-3">
            Type
          </th>
        </tr>
      </thead>
      { tickets?.length > 0 ? (
        <tbody>
          {tickets.map((ticket: TTicket, index: number) => (
            <tr
              key={ticket._id}
              onClick={()=>{
                setTicket(ticket)
                
                  editTicketModal.onOpen()
              

              }}
              className="text-center border border-t-0 border-b-gray-300 cursor-pointer"
            >
              <td className="px-6 py-4">{startIndex+ index + 1}</td>
              <td className="px-6 py-4"><p className='line-clamp-2'>{ticket.topic}</p></td>
              <td className="px-6 py-4">{ticket.assignedTo}</td>
              <td className="px-6 py-4"><p className='line-clamp-2'>{ticket.description}</p></td>
              <td className="px-6 py-4">
                {moment(ticket.dateCreated).format("DD MMM, YYYY")}
              </td>
              <td className="px-6 py-4">{ticket.status}</td>
              <td className="px-6 py-4">{ticket.severity}</td>
              <td className="px-6 py-4">{ticket.type}</td>
           
             
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
        <tr>
            <td colSpan={8} className="px-6 py-4 text-center border border-t-0 border-b-gray-300">
                <div className="text-xl font-semibold text-gray-700">No Data</div>
            </td>
        </tr>
    </tbody>
      )}
    </table>
  </div>
 <EditTicketModal ticket={ticket}/>
  </>
  )
}

export default Tickets