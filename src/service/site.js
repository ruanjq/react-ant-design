
import services from './index';



/**
 * 获取站点信息
 */
export function getSite() {
    return services({
        url: 'http://localhost:8891/src/JSON/siteinfo.json',
        method: 'GET',
    })
}