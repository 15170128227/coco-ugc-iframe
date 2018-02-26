import { env } from '../config/config' 

const base = env.dev + 'ugc-xcx' // 基础路径

const Api = {
  // 用户
  userApi: base + '/us',
}

module.exports = Api