"use client"
import React, { ReactNode } from 'react'
import { LayoutProps } from '../../../.next/types/app/layout'
import Contacts from '@/components/sidebar/contact/contacts'
import { usePathname } from 'next/navigation'
import ChatBody from '@/components/chat/chat-body'
import { useSelector } from 'react-redux'
import { selectChatSessionUid } from '@/libs/redux/selectors/chat-session-selector'

const Layout = ({children} : LayoutProps) => {
    const pathName = usePathname()
    console.log(pathName)
    const activeChatSession = useSelector(selectChatSessionUid)
  return (
    <div className='flex w-full h-[100vh]'>
        <Contacts pageName={pathName === "/chat" ? "Chats" : "Archived"} />
        {activeChatSession ? <ChatBody /> : <div className='flex justify-center items-center w-full'> NO CHATS</div>} 
        {children}
    </div>
  )
}

export default Layout