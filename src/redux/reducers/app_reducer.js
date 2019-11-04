


export const appReducer = (state = {appInfo:{}},action) => {
    switch (action.type) {
        case "APP_INFO":
            return {
                ...state,appInfo:action.payload
            }
        default:
            return state;
    }
}