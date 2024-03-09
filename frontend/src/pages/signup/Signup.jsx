import React from 'react'
import GenderCheckBox from './GenderCheckBox.jsx'

const Signup = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-grey-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>
                    Sign Up <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form action="">
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Full Name</span>
                        </label>
                        <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='johndoe' className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' />
                    </div>

                    <GenderCheckBox />

                    <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                        Already have an account?
                    </a>
                    <div>
                        <button className='btn btn-block btn-sm bg-blue-600 text-white mt-5'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup