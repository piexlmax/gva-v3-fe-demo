export interface callBackFun {
    (error?:Error): boolean;
}

export interface loginFormModel {
    username:string
    password:string
    captcha:string
    captchaId:string
}