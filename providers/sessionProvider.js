"use client"

import { createContext, useContext } from "react"

const SessionContext = createContext()

export const SessionProvider = ({ children, value }) => {
    return (
        <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
    )
}

export const useSession = () => {
    const sessionContext = useContext(SessionContext)

    if (!sessionContext) {
        throw new Error("useSession must be used within a SessionProvider")
    }

    return sessionContext
}