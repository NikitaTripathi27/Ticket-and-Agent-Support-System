/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import Input from "../Input";
import TextArea from "../TextArea";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {  updateTicket } from "../../api";
import {EditTicketSchema } from "../../schema";
import Select from "react-select";
import { useAgents } from "../../hooks/useAgents";
import { TAgent, TTicket } from "../../types";
import { severityOptions, statusOptions, typeOptions } from "../../utils";
import useEditTicketModal from "../../hooks/useEditTicketModal";

type Schema = z.infer<typeof EditTicketSchema>;


const EditTicketModal = ({ticket}:{ticket:TTicket | null}) => {

  const { data: agents } = useAgents();
  const editTicketModal = useEditTicketModal();
  const queryClient = useQueryClient();
  const { mutateAsync: updateTicketMutation } = useMutation({
    mutationFn: updateTicket,
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      toast.success(`Ticket updated successfully`);
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(EditTicketSchema),
  });
  const onSubmit = async (data: Schema) => {
    await updateTicketMutation({...data, id:ticket?._id});

    editTicketModal.onClose();
   
  };

  useEffect(()=>{
    if(ticket){
      setValue("topic", ticket.topic);
      setValue("description", ticket.description);
      setValue("severity", ticket.severity);
      setValue("type", ticket.type);
      setValue("assignedTo", ticket.assignedTo);
      setValue("status",ticket.status)
    }
  },[ticket,setValue])

  useEffect(() => {
    
    if (!editTicketModal.isOpen) {
      setValue("topic", "");
      setValue("description", "");
      setValue("severity", "");
      setValue("type", "");
      setValue("assignedTo", "");
      setValue("status","")
    }

  }, [editTicketModal.isOpen, setValue]);

  const assignedOptions = agents?.map((agent: TAgent) => ({
    value: agent.name,
    label: agent.name,
  }));

  const body = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="topic"
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              name="topic"
              id="topic"
              label="Topic"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.topic?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              name="description"
              id="description"
              label="Description"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col flex-1">
            <Controller
              name="assignedTo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  className="w-full"
                  options={assignedOptions}
                  placeholder="Assigned To"
                  value={assignedOptions.find((option:any) => option.value === field.value)} 
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption.value)
                  }
                />
              )}
            />
            {errors.assignedTo && (
              <small className="text-red-600">
                {errors.assignedTo.message}
              </small>
            )}
          </div>

          <div className="flex flex-1 flex-col ">
            <Controller
              name="severity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  className="w-full"
                  options={severityOptions}
                  placeholder="Severity"
                  value={severityOptions.find((option:any) => option.value === field.value)} 
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption.value)
                  }
                />
              )}
            />
            {errors.severity && (
              <small className="text-red-600">{errors.severity.message}</small>
            )}
          </div>

          <div className="flex flex-1 flex-col ">
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  className="w-full"
                  options={typeOptions}
                  placeholder="Type"
                  value={typeOptions.find((option:any) => option.value === field.value)} 
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption.value)
                  }
                />
              )}
            />
         
          </div>
          <div className="flex flex-1 flex-col ">
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  className="w-full"
                  options={statusOptions}
                  placeholder="Status"
                  value={statusOptions.find((option:any) => option.value === field.value)} 
                  onChange={(selectedOption: any) =>
                    field.onChange(selectedOption.value)
                  }
                />
              )}
            />
            {errors.type && (
              <small className="text-red-600">{errors.type.message}</small>
            )}
          </div>
        </div>
        <button className="w-full py-3 rounded-lg bg-blue-700 text-white mt-2 hover:bg-blue-600 font-medium text-lg transition duration-300 cursor-pointer">
          Submit
        </button>
      </form>
    </>
  );
  return (
    <Modal
      isOpen={editTicketModal.isOpen}
      onClose={editTicketModal.onClose}
      body={body}
      title="Create Ticket"
    />
  );
};

export default EditTicketModal;
