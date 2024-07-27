'use client'
import React, { FormEvent, Fragment, useState } from 'react'
import { BiMessageRoundedEdit } from 'react-icons/bi'
import { CgSearchLoading } from 'react-icons/cg'
import ContactCard from './contact-card'
import AdvanceModal from '@/components/base/modal'
import { IoMdChatboxes } from 'react-icons/io'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectUser } from '@/libs/redux/selectors/auth-selector'
import useGetConatcts from '@/hooks/useGetConatcts'
import { ContactItem } from '@/types'

interface ContactsProps {
	pageName: string
}
const Contacts = ({ pageName }: ContactsProps) => {

	const userData = useSelector(selectUser)
	const { contacts, loading, error } = useGetConatcts()

 	const accessToken = userData?.accessToken
	const [query, setQuery] = useState<string>('')
	const [openModal, setOpenModal] = useState<boolean>(false)
	
	const handleModalClose = () => {
		setOpenModal(false)
	}

	const [contactEmail, setContactEmail] = useState("")

	const handleAddContact = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = {
				"user_email": userData?.email,
				"contact_email": contactEmail,
				"last_message": null,
				"message": null,
				"message_type": null			  
		}
		try {
			const res = axios.post(`${process.env.NEXT_PUBLIC_BACKEND_USER_MS}/contact/create-contact`, formData, {headers : {
				"Authorization" : `Bearer ${accessToken}`
			}})

		} catch (error) {
			console.log(error)
		}
	}

	console.log(contacts)
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
						{/* {Array.from({ length: 20 }, (_, index) => (
							<Fragment key={index}>
								<ContactCard uid={index.toString()} />
							</Fragment>
						))} */}

						{contacts?.map((contact : ContactItem) => (
							<Fragment key={contact._id}>
							<ContactCard uid={contact.contact.user_id} name={contact.contact.username} time={contact.last_message} />
						</Fragment>
						))}
					</div>

				}
			</div>

			<AdvanceModal isOpen={openModal} onClose={handleModalClose} label='Add Contacts' className='w-[600px] h-[400px] bg-baseBlack rounded-lg flex justify-center items-center'>
				<form className='flex flex-col' onSubmit={handleAddContact}> 
				<input  value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}/>
				<button>submit</button>
				</form>
			</AdvanceModal>
		</>
	)
}

export default Contacts
