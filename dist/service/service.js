// service.js
import {get, post, put, del} from './fetch'
import Api from './api.js'

/* 
 * 后台接口默认第一层数据结构
 * {
 *   code: '0101', // 0101:成功 0102:错误 配合具体编码确认错误信息
 *   data: Object|Array|String|null, // 具体数据结构看对应的接口
 *   message: '', // 编码 详情请看'./api.js'
 * } 
 */

 /*************************************************************  用户  *************************************************************/
/**
 * 静默登录
 * @params code String  必填  用于获取WX sessionKey的编码
 * @params systemInfo Object WX系统信息
 * result data null
*/
export const defaultLogin = ({code, systemInfo}) => post(Api.userApi, {code, systemInfo}) // path:'/us' 静默登录 
export const updateUserInfo = userId => put(`${Api.userApi}/${userId}`) // path:'/us/:userId' 获取用户信息
export const getUserInfo = userId => get(`${Api.userApi}/${userId}`) // path:'/us/:userId' 更新用户信息
export const delUser = userId => del(`${Api.userApi}/${userId}`) // path:'/us/:userId' 更新用户信息

