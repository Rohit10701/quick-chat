'use client'
import React, { Fragment, useState } from 'react'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import { CgSearchLoading } from 'react-icons/cg'
import ContactCard from './contact-card'

interface ContactsProps {
	pageName: string
}
const Contacts = ({ pageName }: ContactsProps) => {
	const [query, setQuery] = useState<string>('')
	return (
		<>
			<div className='min-w-[360px] flex flex-col '>
				<div className='dark:white black flex flex-col max-h-[60px] p-3'>
					{/* menu */}
					<div className='flex justify-between '>
						<span className='font-bold '>{pageName}</span>

						<div>
							<div className='text-[1.5rem]'>
								<BiMessageRoundedEdit />
							</div>
						</div>
					</div>
					{/* search */}
					<div className='relative mt-1'>
						<div className='absolute top-1 left-1 text-[1.5rem]'>
							<CgSearchLoading />
						</div>
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className='w-full pl-7 pr-1 py-1 flex rounded-md dark:border-smoke border-graphite border-[1px]'
							placeholder='search...'
						/>
					</div>
				</div>
				{/* list of contacts */}
				{
					<div className='mt-6 overflow-auto h-auto max-h-[calc(100vh-60px px-3'>
						{Array.from({ length: 20 }, (_, index) => (
							<Fragment key={index}>
								<ContactCard uid={index.toString()}/>
							</Fragment>
						))}
					</div>
				}
			</div>
		</>
	)
}

export default Contacts
