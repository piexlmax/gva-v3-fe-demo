import service from "@/utils/request"

interface request {
    (data?: any): Promise<any>
}

export const test:request = () => service({
    url: "http://www.baidu.com",
    method: "GET"
})