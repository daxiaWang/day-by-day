const tokens = {
  admin: {
    token: 'pass'
  },
  editor: {
    token: 'dri'
  }
}

module.exports = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      if (!token) {
        return {
          code: 60204,
          message: '账号或者密码错误'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  }
]
