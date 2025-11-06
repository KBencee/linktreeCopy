export const BASE_URL = "https://pns0tn0c-8000.euw.devtunnels.ms"

type UserLink = {
    id: number,
    title: string,
    url: string
}

type UserLinkResponse = {
    id: number,
    username: string,
    display_name: string,
    bio: string,
    links: UserLink[]
}

export async function getUserLinks(username: string) {
    try {
        const res = await fetch(BASE_URL + `/api/links/public/${username}`)
        const data: UserLinkResponse = await res.json()

        return data
    } catch (error) {
        //TODO
    }
}

