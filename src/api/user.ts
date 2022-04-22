import { Request } from "@/utils/request";

export function login (params: any) {
  return Request.axiosInstance({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

export function getUserList (params: any) {
  return Request.axiosInstance({
    url: '/user-list',
    method: 'get',
    params
  })
}

export function getSignIn () {
  return Request.axiosInstance({
    url: '/user/sign-in',
    method: 'get'
  })
}