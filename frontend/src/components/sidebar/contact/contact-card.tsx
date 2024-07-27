import { activateSession } from '@/libs/redux/slices/chat-session-slice';
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux';

interface ContactCardProps {
    name? : string;
    message? : string;
    image? : string;
    time? : string;
    isMuted? : boolean;
	uid : string;

}
const ContactCard = ({name = "Rohit Kumar" , message = "Okay.", uid, image, time="9:41 AM", isMuted = true} : ContactCardProps) => {
	const dispatch = useDispatch()

	const handleChatSession = () => {
		dispatch(activateSession({name, uid, photo : image,  lastSeen : null}))
	}
	return (	
		<>
			<button type='button' className='w-full flex h-16 p-2 hover:dark:bg-smoke/20 hover:bg-graphite/20 hoveR:cursor-pointer rounded-lg' onClick={handleChatSession}>
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
					<span className='text-[0.9rem] flex justify-start dark:text-white text-black'> {name}</span>
					<span className='text-[0.8rem] flex justify-start font-medium dark:text-iron text-ebony'>{message}</span>
				</div>
				<div className='flex flex-col w-full items-end flex-1 min-w-16'>
					<span className='text-[0.8rem] font-medium dark:text-iron text-ebony'>{time}</span>
					<span>{isMuted ? "M" : "U"}</span>
				</div>
                </div>
			</button>
		</>
	)
}

export default ContactCard
