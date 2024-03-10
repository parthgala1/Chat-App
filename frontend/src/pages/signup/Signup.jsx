import { useState } from 'react'
import React from 'react'
import GenderCheckBox from './GenderCheckBox.jsx'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'

const Signup = () => {

    const [inputs, setIputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const handleCheckBoxChange = (gender) => {
        setIputs({ ...inputs, gender })
    }

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)

        await signup(inputs);
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-grey-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-white'>
                    Sign Up <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder='John Doe'
                            className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e) => setIputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setIputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setIputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base text-white label-text'>Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setIputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckBox onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

                    <Link to='/login' href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white'>
                        Already have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm bg-blue-600 text-white mt-5'
                            disabled={loading}>
                            {loading ? <span className='loading loading-spinner' ></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup