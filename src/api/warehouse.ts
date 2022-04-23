import { Request } from "@/utils/request";

export function queryWarehouseCommodityList (params: any) {
  return Request.axiosInstance({
    url: '/warehouse/commodity-list',
    method: 'get',
    params
  })
}

export function createWarehouseCommodity (params: any) {
  return Request.axiosInstance({
    url: '/warehouse/commodity',
    method: 'post',
    data: params
  })
}
export function updateWarehouseCommodity (params: any) {
  return Request.axiosInstance({
    url: '/warehouse/commodity',
    method: 'put',
    data: params
  })
}

export function deleteWarehouseCommodity (params: any) {
  return Request.axiosInstance({
    url: '/warehouse/commodity',
    method: 'delete',
    params
  })
}
