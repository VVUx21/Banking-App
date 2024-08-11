'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

const Mobilenavbar = ({user}:MobileNavProps) => {
    const pathname = usePathname();
  return (
    <div>
       <Sheet>
            <SheetTrigger>
                <Image src="/icons/hamburger.svg" alt="logo" width={30} height={30}/>
            </SheetTrigger>
            <SheetContent side={'left'} className=' bg-white '>
            <Link href="/" className='flex items-center gap-2'>
                <Image src="/icons/logo.svg" alt='logo' width={34} height={34}/>
                <h1 className='text-24 text-black-1 font-bold'>Paytrack</h1>
            </Link>
            <div className="mobilenav-sheets">
                <SheetClose asChild>
                    <nav className='flex flex-col pt-16 gap-6 h-full text-white'>
                        {/* Very Important Concepts used here......!!! */}
            {
                sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return(
                        <SheetClose asChild key={item.route}>
                            <Link href={item.route} className={cn('mobilenav-sheet_close w-full',{'bg-bank-gradient':isActive})} key={item.label}>
                                <Image src={item.imgURL} alt='logo' width={20} height={20} className={cn({'brightness-[3] invert-0':isActive})} />
                                <h1 className={cn('text-16 font-semibold text-black-2',{'text-white':isActive})}>{item.label}</h1>
                            </Link>
                        </SheetClose>
                    )
                })
            }
                    </nav>
                </SheetClose>
                </div>
                <Footer user={user} type={'mobile'}/>                
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default Mobilenavbar
