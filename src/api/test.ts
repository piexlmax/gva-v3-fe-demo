import service from "@/utils/request"
import {requestModel} from "@/types/service/index"

export const test:requestModel = () => service({
    url: "http://www.baidu.com",
    method: "GET"
})