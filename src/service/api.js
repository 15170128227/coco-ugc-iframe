/**********************************************   接口url路径   ***************************************************/
import { env } from '../config/config' 

const base = env.dev + 'ugc-xcx' // 基础路径

const Api = {
  /**
   * 用户
   * restful
   * method post|get|put 创建用户|获取用户信息|更新用户信息
  */
  userApi: base + '/us/', 
}

module.exports = Api