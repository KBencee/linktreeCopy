import { useState, type FormEvent } from "react"
import { createNewURL } from "../services/protectedApi"

const NewUrlComponent = () => {
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")

const addUrl = (e: FormEvent) => {
    e.preventDefault()
    console.log(createNewURL(url, title));
    setUrl("")
    setTitle("")
}

  return (
    <div>
        <form onSubmit={addUrl}>
            <label>URL: <br />
            <input type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            /></label><br />
            <label>title: <br />
            <input type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            /></label><br />
            <button type="submit">Hozzáad</button>
        </form>
    </div>
  )
}

export default NewUrlComponent