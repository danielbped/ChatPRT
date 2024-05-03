import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { LoginResponse } from "../interfaces/login-data.interface"
import { MessageData } from "../interfaces/message-data.interface"

const { VITE_API_URL } = import.meta.env

interface NewMessageData {
  conversation: string, content: string, token: LoginResponse | null
}

const newMessage = async (data: NewMessageData): Promise<AxiosPromise<MessageData> | null> => {
  const { token, conversation, content } = data
  if (token) {
    const body = {
      conversation,
      content
    }

    const response = await axios.post<MessageData>(`${VITE_API_URL}/message`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    return response
  }

  return null
}

const useMessageMutate = () => {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: async (data: NewMessageData) => newMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation-data'] })
    },
  })

  return mutate
}

export default useMessageMutate