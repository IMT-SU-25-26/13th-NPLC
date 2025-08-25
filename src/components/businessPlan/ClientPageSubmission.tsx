'use client'
import React from 'react'

const ClientPageSubmission = () => {
    return (
        <>
            <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-start p-8 px-13 text-center">
            <h1 className="text-white text-[2.8em] font-ropasans-regular">Business Plan</h1>
            <div className='flex flex-col items-center gap-5 md:gap-6 w-full'>
                <div>
                <p className='font-space-mono'><b>Opened:</b> Sunday, 28 September 2025</p>
                <p className='font-space-mono'><b>Due:</b> Monday, 29 September 2025</p>
                </div>
                <input type="text" className='cursor-target w-full border-1 border-[#FCF551] text-[1.5em] text-[#75E8F0] text-shadow-[0_0_5px_#75E8F0] overflow-auto bg-[#180B26] px-5 py-3' />
                <button 
                className="cursor-target inline w-[15rem] bg-[url('/button-bg.svg')] hover:bg-[url('/button-hover-bg.svg')] text-[1.5em] text-[#FCF551] hover:text-[#09D6FF] hover:text-shadow-[-1.5px_0_0_#CE81D5] duration-200 bg-cover bg-center px-4 py-2 font-rubik-glitch"
                >
                Submit_
                </button>
            </div>
            </div>
        </>
    )
}

export default ClientPageSubmission