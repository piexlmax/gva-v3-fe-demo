interface resModel {
    code:number
    msg:string
    data:any
  }
  

export interface requestModel {
    <T>(data?: T): Promise<resModel>
 }