import { Request } from "@/utils/request";

export function login (params: any) {
  return Request.axiosInstance({
    url: '/login',
    method: 'post',
    data: params
  })
}