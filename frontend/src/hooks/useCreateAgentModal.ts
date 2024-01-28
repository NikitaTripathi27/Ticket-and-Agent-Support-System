import { create } from 'zustand'
interface ICreateAgentModal {
    isOpen: boolean;
    onOpen:()=> void
    onClose:()=> void
}
const useCreateAgentModal = create<ICreateAgentModal>((set) => ({
   isOpen: false,
   onOpen:()=> set({isOpen:true}),
   onClose:()=>set({isOpen:false})
  }))

export default useCreateAgentModal