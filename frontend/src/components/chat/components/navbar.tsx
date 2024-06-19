import Image from 'next/image';
import React from 'react'
import { CgSearchLoading } from 'react-icons/cg'


interface NavbarProps {
	image : string;
}
const Navbar = ({image} : NavbarProps) => {
	return (
		<div className='mx-2 flex justify-between items-center'>
			<div>
				<div className='flex h-12 w-12 py-1'>
					<Image
						src={image || '/next.svg'}
						alt='dp'
						width={80}
						height={80}
						className='rounded-full'
					/>
				</div>
				<span>{'+91 83404 53292'}</span>
			</div>
			<div>
				<CgSearchLoading />
			</div>
		</div>
	)
}

export default Navbar
