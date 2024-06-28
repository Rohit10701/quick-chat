'use client'
import React, { Fragment, useState } from 'react'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import { CgSearchLoading } from 'react-icons/cg'
import ContactCard from './contact-card'
import AdvanceModal from '@/components/base/modal'
import { IoMdChatboxes } from 'react-icons/io'

interface ContactsProps {
	pageName: string
}
const Contacts = ({ pageName }: ContactsProps) => {
	const [query, setQuery] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	
	const handleModalClose = () => {
		setOpenModal(false)
	}
	return (
		<>
			<div className='min-w-[360px] flex flex-col '>
				<div className='dark:white black flex flex-col max-h-[60px] p-3'>
					{/* menu */}
					<div className='flex justify-between '>
						<span className='font-bold '>{pageName}</span>

						<div>
							<button
								className='text-[1.5rem]'
								type='button'
								onClick={() => setOpenModal(true)}>
								<IoMdChatboxes />
							</button>
						</div>
					</div>
					{/* search */}
					<div className='relative mt-1'>
						<div className='absolute top-[5px] left-1 text-[1.5rem]'>
							<CgSearchLoading />
						</div>
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className='w-full h-8 pl-7 pr-1 py-1 flex dark:bg-baseBlack rounded-md dark:text-white dark:placeholder-whisperWhite dark:border-smoke border-graphite border-[1px] text-[0.8rem]'
							placeholder='search unread chats...'
						/>
					</div>
				</div>
				{/* list of contacts */}
				{
					<div className='mt-6 overflow-auto h-auto max-h-[calc(100vh-60px px-3'>
						{Array.from({ length: 20 }, (_, index) => (
							<Fragment key={index}>
								<ContactCard uid={index.toString()} />
							</Fragment>
						))}
					</div>
				}
			</div>

			<AdvanceModal isOpen={openModal} onClose={handleModalClose} label='Add Contacts' className='w-[600px] h-[400px] bg-baseBlack rounded-lg flex justify-center items-center'>
				<form className='flex flex-col'> 
				<input />
				<button>submit</button>
				</form>
			</AdvanceModal>
		</>
	)
}

export default Contacts
