import { Request } from "@/utils/request";

export function queryShopCommodityList (params: any) {
  return Request.axiosInstance({
    url: '/shop/commodity-list',
    method: 'get',
    params
  })
}