import { useContext } from 'react'
import type { UserLink } from '../services/publicApi'
import { AuthUserContext } from '../context/AuthenticatedUserContextProvider'
import { deleteUrl } from '../services/protectedApi'

const UrlComponent = (props: UserLink) => {
    const ctx = useContext(AuthUserContext)

    const removeURL = (id: number) => {
        deleteUrl(id)
    }

    return (
        <li key={props.id}>
            <a href={props.url}>
                {props.title}</a>
            <>
                <button onClick={() => removeURL(props.id)}>🚮</button>
                <button>📝</button>
            </>
        </li>
    )
}

export default UrlComponent
