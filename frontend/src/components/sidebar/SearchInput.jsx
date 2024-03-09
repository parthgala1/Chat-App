import React from 'react'
import { RiSearchEyeFill } from "react-icons/ri";

const SearchInput = () => {
    return (
        <form className='flex items-center gap-2'>
            <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <RiSearchEyeFill className='w-6 h-6' />
            </button>
        </form>
    )
}

export default SearchInput