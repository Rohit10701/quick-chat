'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'
import { Session } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/libs/redux/selectors/auth-selector'

export default function Home() {
	const { systemTheme, theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	const session = useSelector(selectIsLoggedIn)
	console.log(session)
	useEffect(() => {
		setMounted(true)
	}, [])

	const currentTheme = theme === 'system' ? systemTheme : theme

	if (!mounted) return null

	if (!session) {
		return <>Not logged in!</>
	}
		return (
			<div className='flex'>
				<div>
					<h1 className='text-7xl font-bold text-center'>
						{currentTheme === 'dark' ? 'Dark' : 'Light'}{' '}
						<span className='text-purple-600'>Mode</span>
					</h1>
					<p className='dark:text-purple-600 my-8 text-center'>
						Click the button below to switch mode
					</p>
					<div className='flex justify-center'>
						{currentTheme === 'dark' ? (
							<button
								className='bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4'
								onClick={() => setTheme('light')}>
								{' '}
								Light
							</button>
						) : (
							<button
								className='bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300'
								onClick={() => setTheme('dark')}>
								Dark
							</button>
						)}
					</div>
				</div>
				<button>Signout</button>
			</div>
		)
}
