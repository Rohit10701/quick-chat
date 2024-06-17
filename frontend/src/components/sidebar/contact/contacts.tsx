"use client"
import React, { Fragment, useState } from 'react'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import { CgSearchLoading } from "react-icons/cg";
import ContactCard from './contact-card';

interface ContactsProps {
	pageName: string
}
const Contacts = ({ pageName }: ContactsProps) => {
	const [query, setQuery] = useState<string>('')
	return (
		<>
			<div className='min-w-[320px] flex flex-col p-2'>
				<div className='dark:white black flex flex-col'>
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
                    Array.from({length : 20} , (_, index) => (
                        <Fragment key={index}>
                            <ContactCard />
                        </Fragment>
                    ))
                }
			</div>
		</>
	)
}

export default Contacts
