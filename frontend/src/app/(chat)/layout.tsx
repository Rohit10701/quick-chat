"use client"
import React, { ReactNode } from 'react'
import { LayoutProps } from '../../../.next/types/app/layout'
import Contacts from '@/components/sidebar/contact/contacts'
import { usePathname } from 'next/navigation'

const Layout = ({children} : LayoutProps) => {
    const pathName = usePathname()
    console.log(pathName)
  return (
    <div className='flex'>
        <Contacts pageName={pathName === "/chat" ? "Chats" : "Archived"} />
        {children}
    </div>
  )
}

export default Layout