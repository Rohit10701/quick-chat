import Link from 'next/link'
import React from 'react'
import { IoChatbubblesOutline, IoArchiveOutline, IoSettingsOutline } from 'react-icons/io5'

const Menu = () => {
	return (
		<>
			<nav className='h-[100vh] w-[44px] text-[2rem] flex flex-col justify-between dark:bg-charcoal'>
				<div className='flex flex-col items-center gap-y-3 mt-2'>
					{/* main option */}
                    
					<Link href={'/chat'} className='hover:bg-ebony rounded-md p-1 text-[1.6rem]'>
						<IoChatbubblesOutline />
					</Link>
					{/* sub option */}
					<Link href={'/archived'} className='hover:bg-ebony rounded-md p-1 text-[1.6rem]'>
						<IoArchiveOutline />
					</Link>
				</div>

				<div className='flex items-center justify-center mb-2'>
					{/* settings */}
					<Link href={'/settings'} className='hover:bg-ebony rounded-md p-1 text-[1.6rem]'>
						<IoSettingsOutline />
					</Link>
				</div>
			</nav>
		</>
	)
}

export default Menu
