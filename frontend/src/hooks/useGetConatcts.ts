import { selectUser } from '@/libs/redux/selectors/auth-selector'
import { ContactItem, GetContacts } from '@/types'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useGetConatcts = () => {
	const userData = useSelector(selectUser)
	const accessToken = userData?.accessToken
	const userId = userData?.user_id
	const [contacts, setContacts] = useState<ContactItem[]>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<AxiosError>()
	const fetchContacts = async () => {
		setLoading(true)
		try {
			const res: GetContacts = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_USER_MS}/contact/list-contact/${userId}`,
				{
					headers: {
						"Authorization": `Bearer ${accessToken}`,
                        "Cache-Control": "no-cache"
					}
				}
			)

			setContacts(res.data.res)
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error)
				setError(error)
			}
		}
		setLoading(false)
	}
	useEffect(() => {
		fetchContacts()
	}, [])

	return { contacts, loading, error }
}

export default useGetConatcts
