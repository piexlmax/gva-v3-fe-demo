
export interface UserInfo{
    uuid: string,
    nickName: string,
    headerImg: string,
    authority: string,
}
export interface TypeUserState {
    userInfo: UserInfo,
    token: string,
}
// define your typings for the store state
export interface UserState {
    namespaced: boolean,
    state: TypeUserState,
}


