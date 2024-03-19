"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

import { useSession } from "@/providers/sessionProvider"

export default function UserLayout({ children }) {
    const router = useRouter()
    const { toast } = useToast()

    const { user } = useSession()
    useEffect(() => {
        if (user) {
            toast({
                description: "Already Logged In!"
            })
            router.push("/")
        }
    }, [])
    return (
        <>{children}</>
    )
}
