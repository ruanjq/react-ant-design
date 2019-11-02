
import {getUserInfo} from "../../service/user";


export const userInfoAction = async (dispatch) =>{
    const res = await getUserInfo();
    dispatch({
        type:"USER_INFO",
        payload:res.data
    });
}