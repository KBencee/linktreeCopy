import { useContext } from "react"
import { SlugContext } from "../context/SlugContextProvider"
import UserCard from "../components/UserCard"

const Home = () => {
    const {slugs} = useContext(SlugContext)
  return (
    <main>
        <h1>Link 🌳</h1>
        {slugs.map(slug => <UserCard {...slug}/>)}
    </main>
  )
}

export default Home