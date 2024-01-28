/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateAgentModal from "../../hooks/useCreateAgentModal";
import Modal from "./Modal";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { CreateAgentSchema } from "../../schema";
import Input from "../Input";
import TextArea from "../TextArea";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../config/Axios";
import toast from "react-hot-toast";

type Schema = z.infer<typeof CreateAgentSchema>;

const createAgentFn = async (data: Schema) => {
  const response = await axiosInstance.post("/support-agents", data);
  return response.data;
};
const CreateAgentModal = () => {
  const createAgentModal = useCreateAgentModal();
  const queryClient = useQueryClient();
  const { mutateAsync: addAgentMutation, } = useMutation({
    mutationFn: createAgentFn,
    onError: (err: any) => toast.error(err?.response?.data.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["agents"],
      });
      toast.success(`${data.name} added successfully`);
    },
  });

  const { handleSubmit, control, setValue } = useForm<Schema>({
    resolver: zodResolver(CreateAgentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
    },
  });
  const onSubmit = async (data: Schema) => {
    await addAgentMutation(data);
   
      createAgentModal.onClose();
      setValue("name", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("description", "");
 
  };

  useEffect(() => {
    if (!createAgentModal.isOpen) {
      setValue("name", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("description", "");
    }
  }, [createAgentModal.isOpen, setValue]);

  const body = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              name="name"
              id="name"
              label="Name"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              name="email"
              id="email"
              label="Email"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.email?.message}
              type="email"
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              name="phone"
              id="phone"
              label="Phone"
              value={field.value}
              onChange={field.onChange}
              errorMessage={errors.phone?.message}
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
        <button className="w-full py-3 rounded-lg bg-blue-700 text-white mt-2 hover:bg-blue-600 font-medium text-lg transition duration-300 cursor-pointer">
          Submit
        </button>
      </form>
    </>
  );
  return (
    <Modal
      isOpen={createAgentModal.isOpen}
      onClose={createAgentModal.onClose}
      body={body}
      title="Create Agent"
    />
  );
};

export default CreateAgentModal;
