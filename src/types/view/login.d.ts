export interface callBackFun {
    (error?:Error): boolean;
}

export interface loginFormType {
    username:string
    password:string
    captcha:string
    captchaId:string
}