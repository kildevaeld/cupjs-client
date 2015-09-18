/// <reference path="../typings" />

import {request, Request} from 'utilities/lib/index'
import {classtype, ClassType} from '../internal'

@classtype(ClassType.Service)
export class HttpService {
	
	get (url:any): Request {
		return request.get(url)
	}
	
	post (url:any): Request {
		return request.post(url)
	}
	
	put (url:any): Request {
		return request.put(url)
	}
	
	del (url:any): Request {
		return request.del(url)
	}
}