
import {getUserInfo} from "../../service/user";
import { getSite} from "../../service/site";

export const appInfoAction = async (dispatch) =>{
    const res = await Promise.all([getUserInfo(),getSite()]);
    // 聚合2个接口的数据
    let appData = ((data) => {
        let result = {};
        data.forEach((item,key) =>{
            if(key === 0){
                if(item.data){
                    result["authInfo"] = item.data.authInfo;
                    result["userinfo"] = item.data.userinfo;
                }
            } else if(key === 1){
                result["siteinfo"] = item.data;
            }
        });
        return result;
    })(res);
    console.log(appData);
    dispatch({
        type:"APP_INFO",
        payload:appData
    });
}

