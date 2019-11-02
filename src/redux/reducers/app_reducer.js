


export const appReducer = (state = {userInfo:{}},action) => {
    switch (action.type) {
        case "USER_INFO":
            return {
                ...state,userInfo:action.payload
            }
        default:
            return state;
    }
}