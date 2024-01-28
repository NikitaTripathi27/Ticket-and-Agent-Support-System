/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { returnPagination } from '../utils'
type TPaginationProps ={
  totalPages:number,
  page:number,
  limit:number,
  siblings:number,
  onPageChange: (value:any)=>void
}
const Pagination:React.FC<TPaginationProps> = ({totalPages,page,limit,siblings,onPageChange }) => {
  const array = returnPagination(totalPages,page,limit,siblings)

  return (
    <div className='flex items-center'>
        <button onClick={()=>onPageChange('&laquo;')} className='w-10 h-10 text-xl flex justify-center items-center border border-gray-300 rounded-l'>&laquo;</button>
        <button onClick={()=>onPageChange('&lsaquo;')} className='w-10 h-10 text-xl flex justify-center items-center border border-gray-300  border-l-0'>&lsaquo;</button>
        {array.map((value,index)=> <button key={index} onClick={()=>onPageChange(value)} className={`w-10 h-10 text-xl flex justify-center items-center border border-gray-300  border-l-0 ${value==page?'bg-blue-600 text-white':''}`}>{value}</button>)}
        <button onClick={()=>onPageChange('&rsaquo;')} className='w-10 h-10 text-xl flex justify-center items-center border border-gray-300 border-r-0 '>&rsaquo;</button>
        <button onClick={()=>onPageChange('&raquo;')} className='w-10 h-10 text-xl flex justify-center items-center border border-gray-300 rounded-r'>&raquo;</button>
       
    </div>
  )
}

export default Pagination