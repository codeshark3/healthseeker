"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import {
  Form
} from "~/components/ui/form"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormSchema } from "~/lib/zodSchema"
 

export enum FormFieldType { 
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER='datepicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
  }
 
const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit({name,email,phone}: z.infer<typeof UserFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    try {
        // const userData= {name,email,phone}
        // const user = await createUser(userData)
        // if(user) router.push(`/patients/${user.id}/register`)
        
    } catch(error) {
      console.log(error)
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi 👋</h1>
        <p className="text-dark-700">Schedule your first appointment</p>
      </section>
      <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="name" label="Full Name" placeholder="Kwame Baah" iconSrc="/assets/icons/user.svg" iconAlt="user"/>
      <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="user@email.com" iconSrc="/assets/icons/email.svg" iconAlt="email"/>
      <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Phone Number" placeholder="024-000-0000"/>
      
   
     <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm