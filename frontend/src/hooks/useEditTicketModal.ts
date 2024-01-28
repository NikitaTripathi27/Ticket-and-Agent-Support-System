import { create } from 'zustand'
interface ICreateTicketModal {
    isOpen: boolean;
    onOpen:()=> void
    onClose:()=> void
}
const useEditTicketModal = create<ICreateTicketModal>((set) => ({
   isOpen: false,
   onOpen:()=> set({isOpen:true}),
   onClose:()=>set({isOpen:false})
  }))

export default useEditTicketModal
