import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { MessageResponse } from "../interfaces/message-data.interface"
import { LoginResponse } from "../interfaces/login-data.interface"

const { VITE_API_URL } = import.meta.env

const fetchData = async (id: string, token: LoginResponse | null): Promise<AxiosResponse<MessageResponse> | null> => {
  if (token) {
    const response = await axios.get<MessageResponse>(VITE_API_URL + `/message/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } else {
    return null
  }
}

const useMessageData = (id: string, token: LoginResponse | null) => {
  const query = useQuery<AxiosResponse<MessageResponse> | null, Error>({
    queryKey: ['message-data'],
    queryFn: () => fetchData(id, token),
  })

  return {
    ...query,
    data: query.data?.data
  }
}

export default useMessageData