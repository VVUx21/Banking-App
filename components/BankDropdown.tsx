"use client";

import Image from "next/image";

import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
  } from "@/components/ui/select";

const BankDropdown = ({
    // accounts = [],
    // setValue,
    otherStyles
  }: BankDropdownProps) => {
  return (
    <>
    <Select>
      <SelectTrigger className={`flex flex-row gap-2 bg-white md:w-[300px] ${otherStyles}`}>
      <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p className="text-16 w-full text-left">Select Account</p>
      </SelectTrigger>
      <SelectContent className={`w-full bg-white md:w-[300px] ${otherStyles}`}
        align="end"
      >
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
                Select a bank to display
          </SelectLabel>
          <SelectItem value="Bank of America" className="cursor-pointer border-t" >
          <div className="flex flex-col ">
                <p className="text-16 font-medium">Bank of America</p>
                <p className="text-14 font-medium text-blue-600">
                    &#36;2,840.80
                </p>
              </div>
          </SelectItem>
          <SelectItem value="Chase Growth Savings Account" className="cursor-pointer border-t" >
          <div className="flex flex-col ">
                <p className="text-16 font-medium">Chase Growth Savings Account</p>
                <p className="text-14 font-medium text-blue-600">
                    &#36;2,840.80
                </p>
              </div>
          </SelectItem>
          <SelectItem value="First Platypus Bank" className="cursor-pointer border-t" >
          <div className="flex flex-col ">
                <p className="text-16 font-medium">First Platypus Bank</p>
                <p className="text-14 font-medium text-blue-600">
                    &#36;2,840.80
                </p>
              </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </>
  )
}

export default BankDropdown
