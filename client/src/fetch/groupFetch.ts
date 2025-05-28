import { CHAT_GROUP_URL } from "@/lib/apiEndpoints"

export const fetchChatGroups = async (token : string) =>{
    const res = await fetch(CHAT_GROUP_URL,{
        headers : {
            Authorization : token
        },
        next: {
            revalidate: 60*60,
            tags: ['dashboard']
        }
    })

    if(!res.ok) throw new Error('Failed to fetch chat groups. Try again later!')
    
    const response = await res.json()
    if(response?.data) {
        return response.data
    }
    else return [];
}