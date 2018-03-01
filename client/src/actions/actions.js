export const GET_USER_INFO = 'GET_USER_INFO'

export const TOGGLE_SUB_HEADER = 'TOGGLE_SUB_HEADER'


export function getUserInfo(){
    return { type: GET_USER_INFO }
}


export function toggleSubHeader(visible){
    return { type: TOGGLE_SUB_HEADER, visible}
}

