import { Request } from "@/utils/request";

export function queryResourceList (params: any) {
  return Request.axiosInstance({
    url: '/resource-list',
    method: 'get',
    params
  })
}