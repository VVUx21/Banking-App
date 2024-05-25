import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage, FormItem } from './ui/form'
import { Input } from "@/components/ui/input"
const Inputform2 = ({form,name,label,placeholder}) => {
  return (
    <>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  {label}
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />
    </>
  )
}

export default Inputform2
