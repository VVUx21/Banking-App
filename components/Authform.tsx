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
import {authFormSchema} from '@/lib/utils'
import { signin, signup } from '@/lib/server/users.actions'
import { useRouter } from 'next/navigation'
import PlaidLink from './PlaidLink'
import { Loader2 } from 'lucide-react'

const Authform = ({type}:{type:string}) => {
    const [user,setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = authFormSchema(type);
    const router=useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ''
      },
    })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //console.log(values);
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        const userdata={
          firstName: values.firstName!,
          lastName: values.lastName!,
          address1: values.address1!,
          city: values.city!,
          state: values.state!,
          postalCode: values.postalCode!,
          dateOfBirth: values.dateofBirth!,
          ssn: values.ssn!,
          email: values.email,
          password: values.password
        }
        //console.log(userdata);
        const newUser= await signup(userdata);
        setUser(newUser);
      }
      if (type === 'sign-in') {
        //console.log(values);
        const users= await signin(
          {
            email: values.email,
            password: values.password
          }
        );
        //console.log(response);
        if (users) router.push('/')
      } 
    } catch (error) {
      console.error('Error', error);
    } finally {
      setIsLoading(false);
    }
  }
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
        {
          user ? (
            <div className="flex flex-col gap-4">
              <PlaidLink user={user} variant="primary" />
            </div>
          ):(
            <>
            <Form {...form}>
        <form  onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(e);}}
        className="space-y-8 flex flex-col w-full">
        {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <Inputform control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <Inputform control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' />
                  </div>
                  <Inputform control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <Inputform control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <Inputform control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <Inputform control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <Inputform control={form.control} name='dateofBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <Inputform control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}

            <Inputform control={form.control} name="email" label="Email" placeholder="Enter your email" />
            <Inputform control={form.control} name="password" label="Password" placeholder="Enter your password"/>

            <div className="flex flex-col gap-4">
                <Button type='submit' disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        </form>
        </Form>
        <footer className='flex-center gap-1'>
        <p className='text-16'>
        { type === 'sign-in' ? ' Dont have an  account?' : 'Already have an account?'}
            <Link href={type === 'sign-in' ? '/Sign-Up' : '/Sign-In'} className='form-link'>
            { type === 'sign-in' ? ' Sign-Up ' : ' Sign-In'}
            </Link>
        </p>
      </footer>
      </>
          )}
  </section>
  )
}

export default Authform
