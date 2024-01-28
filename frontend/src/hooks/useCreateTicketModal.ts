import { create } from 'zustand'
interface ICreateTicketModal {
    isOpen: boolean;
    onOpen:()=> void
    onClose:()=> void
}
const useCreateTicketModal = create<ICreateTicketModal>((set) => ({
   isOpen: false,
   onOpen:()=> set({isOpen:true}),
   onClose:()=>set({isOpen:false})
  }))

export default useCreateTicketModal
