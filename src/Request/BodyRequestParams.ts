export interface DataParams {
    cr?: string
    hr?: string
    ir?: string
  }
  
  
  export interface BodyRequestParams {
      siteUid: number
      comId: number
      rectifierType: string
      rectifierVersion: string
      data: DataParams
    }