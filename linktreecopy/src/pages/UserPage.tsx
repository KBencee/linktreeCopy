import { useParams } from "react-router-dom"

const UserPage = () => {
    const {username} = useParams()
  return (
    <div>
        <h1>Ez itt {username} oldala!</h1>
    </div>
  )
}

export default UserPage