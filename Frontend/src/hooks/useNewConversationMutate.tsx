import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { ConversationData, NewConversationData } from "../interfaces/conversation-data.interface"

const { VITE_API_URL } = import.meta.env

const newConversation = async (data: NewConversationData): Promise<AxiosPromise<ConversationData> | null> => {
  const { user, token } = data
  if (token) {
    const response = await axios.post<ConversationData>(`${VITE_API_URL}/conversation`, { user }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
    return response
  }

  return null
}

const useNewConversationMutate = () => {
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: async (data: NewConversationData) => newConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation-data'] })
    },
  })

  return mutate
}

export default useNewConversationMutate