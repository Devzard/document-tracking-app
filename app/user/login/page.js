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

import { signIn } from "@/actions/auth.action"

const formSchema = z.object({
  email: z.string().min(2, { message: 'email must be at least 2 characters' }).max(50, { message: 'email must be less than 50 char' }),
  password: z.string().min(4, { message: 'password must be at least 4 characters' }).max(30, { message: 'password must be less than 30 char' }),
})

export default function Login() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values) {
    const res = await signIn(values)

    if (res.error) {
      toast({
        variant: 'destructive',
        description: res.error
      })
    } else if (res.success) {
      toast({
        variant:'default',
        description: 'Logged In Successfully'
      })
    }

    router.push("/")
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>log into your account</CardDescription>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>Don't have an account? <Link href='/user/register' className="text-blue-500">Register</Link></p>
      </CardFooter>
    </Card>



  )
}
