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
