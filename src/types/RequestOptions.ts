export interface IRequestOptions {
	method: string
	headers: {
		[key: string]: string
	}
	url: string
	params?: any
}
