export const BASE_URL = "https://pns0tn0c-8000.euw.devtunnels.ms"

type UserLink = {
    id: number,
    title: string,
    url: string
}

export type UserLinkResponse = {
    id: number,
    username: string,
    display_name: string,
    bio: string,
    links: UserLink[]
}

export async function getUserLinks(username: string) {
    try {
        const res = await fetch(BASE_URL + `/api/links/public/${username}/`)
        const data: UserLinkResponse = await res.json()

        return data
    } catch (error) {
        //TODO
    }
}

type TokenResponse = {
    access: string,
    refresh: string
}

export async function loginUser(username: string, password: string) {

    const res = await fetch(
        BASE_URL + "/api/accounts/token/",
        {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        }
    )

    if(!res.ok){
        console.error("Hibás felhasználónév vagy jelszó")
        //TODO
        return
    }
    const data:TokenResponse = await res.json()

    console.log(data);
}