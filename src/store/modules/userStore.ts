interface userInfo {
  username: string,
  authorization: string
}

const userStore = {
  state: () => ({
    userInfo: {
      username: '123',
      authorization: ''
    }
  }),
  mutations: {
    setUserInfo (state:any, payload:userInfo) {
      state.userInfo = payload
    }
  }
}

export default userStore