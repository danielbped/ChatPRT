import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { DeleteConversationData } from "../interfaces/conversation-data.interface"

const { VITE_API_URL } = import.meta.env

const deleteConversation = async (data: DeleteConversationData): Promise<AxiosPromise<void> | null> => {
  const { conversation, token } = data
  if (token) {
    const response = await axios.delete<void>(`${VITE_API_URL}/conversation/${conversation}`, {
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
    mutationFn: async (data: DeleteConversationData) => deleteConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation-data'] })
    },
  })

  return mutate
}

export default useNewConversationMutate