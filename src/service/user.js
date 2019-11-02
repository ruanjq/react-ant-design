import services from './index';

/**
 * 登出
 */
export function logout() {
    window.location.href = '/admin/index/loginout'
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
    return services({
        url: 'http://localhost:8891/src/JSON/myinfo.json',
        method: 'GET',
    })
}