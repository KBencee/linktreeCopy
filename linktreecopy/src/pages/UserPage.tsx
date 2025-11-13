import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserLinks, type UserLinkResponse } from "../services/publicApi"
import { AuthUserContext } from "../context/AuthenticatedUserContextProvider"
import NewUrlComponent from "../components/NewUrlComponent"
import { deleteUrl } from "../services/protectedApi"

const UserPage = () => {
    const {username} = useParams()
    const [links, setLinks] = useState<UserLinkResponse | undefined>()

    const ctx = useContext(AuthUserContext)

    useEffect(() => {
        getUserLinks(username || "anonymous").then(data => setLinks(data))
    },[])

    const removeURL = (id: number) => {
        deleteUrl(id).then(res => {
            if(res && links){
                setLinks(prev => prev && {...prev, links: prev.links.filter(e=> e.id !== id)})
            }
        })
    }

  return (
    <div>
        <h1>Ez itt {links?.display_name} oldala!</h1>
        {ctx && ctx.authUser.username === username && <NewUrlComponent />}
        <ul>
            {links?.links.map(link => 
            <li key={link.id}>
                <a href={link.url}>
                {link.title}</a> {ctx && ctx.authUser.username === username && 
                <button onClick={()=> removeURL(link.id)}>🚮</button>}
            </li>)}
        </ul>
    </div>
  )
}

export default UserPage