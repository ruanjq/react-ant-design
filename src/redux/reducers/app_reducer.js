

const initialState = {
    appInfo:{},
    site: ''
};


export const appReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "APP_INFO":
            return {
                ...state,appInfo:action.payload
            }
        case "STORAGE_SITE_GET":
            return {
                ...state,site:action.payload
            }
        case "STORAGE_SITE_SET":
            return {
                ...state,site:action.payload
            }
        default:
            return state;
    }
}