import { createContext, useEffect, useState } from "react"

export type Slug = {
    username: string
}

export const SlugContext = createContext<{slugs: Slug[]}>({slugs: []})

const SlugContextProvider = (props: {children:React.ReactNode}) => {
    const[userSlugs, setUserSlugs] = useState<Slug[]>([])

    useEffect(() => {
        fetch("https://pns0tn0c-8000.euw.devtunnels.ms/api/accounts/slugs/")
        .then(res => res.json())
        .then(data => setUserSlugs(data))
    }, [])

  return (
    <SlugContext.Provider value={{slugs: userSlugs}}>
         {props.children}
    </SlugContext.Provider>
  )
}

export default SlugContextProvider