import Image from 'next/image'
import React from 'react'

interface ContactCardProps {
    name? : string;
    message? : string;
    image? : string;
    time? : string;
    isMuted? : boolean;

}
const ContactCard = ({name = "Rohit Kumar" , message = "Okay.", image, time="9:41 AM", isMuted = true} : ContactCardProps) => {
	return (
		<>
			<div className='flex h-16 p-2 hover:dark:bg-smoke/20 hover:bg-graphite/20 rounded-lg'>
                <div className='flex h-12 w-12 py-1'> 

				<Image
					src={image || '/next.svg'}
					alt='dp'
					width={80}
					height={80}
					className='rounded-full'
				/>
                </div>

                <div className='flex justify-between w-full ml-2 items-center'>

				<div className='flex flex-col w-full'>
					<span className='text-[0.9rem] dark:text-white text-black'> {name}</span>
					<span className='text-[0.8rem] font-medium dark:text-iron text-ebony'>{message}</span>
				</div>
				<div className='flex flex-col w-full items-end flex-1 min-w-16'>
					<span className='text-[0.8rem] font-medium dark:text-iron text-ebony'>{time}</span>
					<span>{isMuted ? "M" : "U"}</span>
				</div>
                </div>
			</div>
		</>
	)
}

export default ContactCard
