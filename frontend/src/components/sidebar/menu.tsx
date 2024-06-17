import Link from 'next/link'
import React from 'react'
import { IoChatbubblesOutline, IoArchiveOutline, IoSettingsOutline } from 'react-icons/io5'

const Menu = () => {
	return (
		<>
			<nav className='h-[100vh] w-[44px] text-[2rem] flex flex-col justify-between'>
				<div className='flex flex-col items-center gap-y-3 mt-2'>
					{/* main option */}
                    
					<Link href={'/chat'}>
						<IoChatbubblesOutline />
					</Link>
					{/* sub option */}
					<Link href={'/archived'}>
						<IoArchiveOutline />
					</Link>
				</div>

				<div className='flex items-center justify-center mb-2'>
					{/* settings */}
					<Link href={'/settings'}>
						<IoSettingsOutline />
					</Link>
				</div>
			</nav>
		</>
	)
}

export default Menu
