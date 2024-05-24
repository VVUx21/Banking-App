'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
} from "@/components/ui/form"
import Inputform from './inputform'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{
        message: "Password must be at least 8 characters.",
      }),
  })  

const Authform = ({type}:{type:string}) => {
    const [user,setUser] = useState(null);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)}
  return (
   <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src="/icons/logo.svg" alt='logo' width={34} height={34}/>
                <h1 className='text-24 text-black-1 font-bold'>Paytrack</h1>
            </Link>
            <h2 className='text-24 text-black-1 font-bold lg:text-36'>
                {user ? 'Link Account':type === 'sign-in' ? 'Log in' : 'Sign up'} to Paytrack
                <p className='text-16 text-black-1 font-normal'>
                    { user ? 'Link your account to get started' : 'Please enter your details'}
                </p>
            </h2>
        </header>
        <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-full">

        {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <Inputform form={form} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <Inputform form={form } name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <Inputform form={form } name='address1' label="Address" placeholder='Enter your specific address' />
                  <Inputform form={form } name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <Inputform form={form } name='state' label="State" placeholder='Example: NY' />
                    <Inputform form={form } name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <Inputform form={form } name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <Inputform form={form } name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}

            <Inputform form={form} name="email" label="Email" placeholder="Enter your email" />
            <Inputform form={form} name="password" label="Password" placeholder="Enter your password"/>

        <Button type="submit" className='form-btn'>Submit</Button>
        <footer className='flex-center gap-1'>
        <p className='text-16'>
        { type === 'sign-in' ? ' Dont have an  account?' : 'Already have an account?'}
            <Link href={type === 'sign-in' ? '/Sign-Up' : '/Sign-In'} className='form-link'>
            { type === 'sign-in' ? ' Sign-Up ' : ' Sign-In'}
            </Link>
        </p>
        </footer>
        </form>
        </Form>
        </> 
   </section>
  )
}

export default Authform
