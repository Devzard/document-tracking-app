"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { signUp } from "@/actions/auth.action"

const formSchema = z.object({
  email: z.string().min(2, { message: 'email must be at least 2 characters' }).max(50, { message: 'email must be less than 50 char' }),
  name: z.string().min(2, { message: 'name must be at least 2 characters' }).max(50, { message: 'name must be less than 50 char' }),
  password: z.string().min(4, { message: 'password must be at least 4 characters' }).max(30, { message: 'password must be less than 30 char' }),
  confirmPassword: z.string().min(4, { message: 'password must be at least 4 characters' }).max(30, { message: 'password must be less than 30 char' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
})

export default function Register() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values) {
    const res = await signUp(values)
    if (res.error) {
      toast({
        variant: 'destructive',
        description: res.error
      })
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully",
      })

      router.push("/")
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Register User</CardTitle>
        <CardDescription>create a new user</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Type your full name here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="confirm password" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Have an account? <Link href='/user/login' className="text-blue-500">Log In</Link></p>
      </CardFooter>
    </Card>
  )
}
