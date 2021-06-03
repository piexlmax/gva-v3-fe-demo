import service from "@/utils/request"
import {requestT} from "@/types/service/index"

export const test:requestT = () => service({
    url: "http://www.baidu.com",
    method: "GET"
})