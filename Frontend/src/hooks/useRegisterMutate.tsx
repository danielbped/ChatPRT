import { useMutation } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { RegisterData, RegisterResponse } from "../interfaces/register-data.interface"

const { VITE_API_URL } = import.meta.env

const register = async (data: RegisterData): AxiosPromise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(VITE_API_URL + '/user', data)
  return response
}

const useRegisterMutate = () => {
  const mutate = useMutation({
    mutationFn: register,
  })

  return mutate
}

export default useRegisterMutate