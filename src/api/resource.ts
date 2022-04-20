import { Request } from "@/utils/request";

export function queryResourceList (params: any) {
  return Request.axiosInstance({
    url: '/resource-list',
    method: 'get',
    params
  })
}

export function createResource (params: any) {
  return Request.axiosInstance({
    url: '/resource',
    method: 'post',
    data: params
  })
}
export function updateResource (params: any) {
  return Request.axiosInstance({
    url: '/resource',
    method: 'put',
    data: params
  })
}