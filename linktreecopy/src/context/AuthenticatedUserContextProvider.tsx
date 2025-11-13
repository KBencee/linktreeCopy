import React, { createContext, useEffect, useState } from "react"
import { getUserData } from "../services/protectedApi"

type AuthUserType = {
    id: number,
    avatar: string,
    background_color: string,
    bio: string,
    display_name: string,
    text_color: string,
    username: string
}

export const AuthUserContext = createContext<{authUser: AuthUserType} | undefined>(undefined)

const AuthenticatedUserContextProvider = (props: {children: React.ReactNode}) => {
    const [authUser, setAuthuser] = useState<AuthUserType>()

    useEffect(() => {
        getUserData().then(data => setAuthuser(data))
    }, [])

  return (
    <AuthUserContext.Provider value={authUser ? {authUser} : undefined}>
        {props.children}
    </AuthUserContext.Provider>
  )
}

export default AuthenticatedUserContextProvider