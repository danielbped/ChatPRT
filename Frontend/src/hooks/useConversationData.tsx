import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { Conversation } from "../interfaces/conversation-data.interface"
import { LoginResponse } from "../interfaces/login-data.interface"

const { VITE_API_URL } = import.meta.env

const fetchData = async (id: string, token: LoginResponse | null): Promise<AxiosResponse<Conversation[]> | null> => {
  if (token) {
    const response = await axios.get<Conversation[]>(VITE_API_URL + `/conversation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } else {
    return null
  }
}

const useConversationData = (id: string, token: LoginResponse | null) => {
  const query = useQuery<AxiosResponse<Conversation[]> | null, Error>({
    queryKey: ['conversation-data'],
    queryFn: () => fetchData(id, token),
  })

  return {
    ...query,
    data: query.data?.data
  }
}

export default useConversationData