import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from "@/components/ui/input"

const Inputform = ({form,name,label,placeholder}) => {
  return (
    <>
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                   <FormLabel className='form-label'>{label}</FormLabel>
                   <div className='flex flex-col w-full'>
                   <FormControl>
                        <Input {...field} className='form-input' type={name === 'password' ? 'password' : 'text'} placeholder={placeholder} />
                   </FormControl>
                   <FormMessage className='form-message mt-2'/>
                   </div>
                </div>
            )}
            />
    </>    
  )
}

export default Inputform
