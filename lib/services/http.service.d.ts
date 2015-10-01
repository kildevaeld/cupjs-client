import { Request } from 'utilities';
export declare class HttpService {
    get(url: any): Request;
    post(url: any): Request;
    put(url: any): Request;
    del(url: any): Request;
}
