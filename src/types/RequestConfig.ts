export interface RequestConfig {
   method: string
   headers: {
      [key: string]: string
   }
   url: string
   params?: any
}