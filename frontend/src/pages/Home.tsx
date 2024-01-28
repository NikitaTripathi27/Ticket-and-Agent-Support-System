/* eslint-disable @typescript-eslint/no-explicit-any */
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CreateTicketModal from "../components/modals/CreateTicketModal";
import useCreateTicketModal from "../hooks/useCreateTicketModal";
import { fetchTickets } from "../api";
import Tickets from "../components/Tickets";
import { useAgents } from "../hooks/useAgents";
import { TAgent,  } from "../types";

import { useState } from "react";
import { severityOptions, statusOptions, typeOptions } from "../utils";
import ReactSelect from "react-select";
import Pagination from "../components/Pagination";
import { IoMdAdd } from "react-icons/io";
const Home = () => {
  const createTicketModal = useCreateTicketModal();
  const { data: agents } = useAgents();
  const [status, setStatus] = useState("");
  const [assignedTo, setassignedTo] = useState("");
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] =useState(1)
  const [limit, ] = useState(10)
  
  const { data } = useQuery({
    queryKey: ["tickets", status, assignedTo,severity,type,page,limit ],
    queryFn: async () => await fetchTickets({
      status,
      assignedTo,
      severity,
      type,
      page,
      limit
    }),
    placeholderData:keepPreviousData,staleTime:20000
  });
  

  const assignedOptions = agents?.map((agent: TAgent) => ({
    value: agent.name,
    label: agent.name,
  }));

  const handlePageChange = (value:any)=>{
    if(value == '&laquo;' || value === '... ' ){
      setPage(1)
    }
    else if(value == '&lsaquo;'){
      if(page!== 1){
        setPage(page-1)
      }
      
    }
    else if(value == '&rsaquo;'){
      if(page!== data?.totalPages){
        setPage(page+1)
      }
    }
    else if(value == '&raquo;' || value === " ..."){
      setPage(data.totalPages)
    }
    else{
      setPage(value)
    }
  }
  return (
    <>
      <button
        onClick={createTicketModal.onOpen}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-3 font-medium cursor-pointer rounded-lg text-lg flex items-center justify-center gap-2"
      >
        Add Ticket
        <IoMdAdd size={22} />
      </button>
      
      <div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 flex-wrap">
          <ReactSelect
            className="w-full"
            options={statusOptions}
            placeholder="Status"
            onChange={(selectedOption: any) => setStatus(selectedOption.value)}
          />
          <ReactSelect
            className="w-full"
            options={assignedOptions}
            placeholder="Assigned To"
            onChange={(selectedOption: any) =>
              setassignedTo(selectedOption.value)
            }
          />
          <ReactSelect
            className="w-full"
            options={severityOptions}
            placeholder="Severity"
            onChange={(selectedOption: any) =>
              setSeverity(selectedOption.value)
            }
          />

          <ReactSelect
            className="w-full"
            options={typeOptions}
            placeholder="Type"
            onChange={(selectedOption: any) => setType(selectedOption.value)}
          />
        </div>
        <Tickets tickets={data?.tickets} page={page} limit={limit} />
      </div>

      <CreateTicketModal />
      <Pagination totalPages={data?.totalPages} limit={limit} page={page} siblings={1} onPageChange={handlePageChange}/>
    </>
  );
};

export default Home;
