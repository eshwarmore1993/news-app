import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

@Injectable()
export class NewsService {

    private readonly _url = 'https://api.myjson.com/bins/10ijyt';

    constructor(private _http: Http) {
    }

    getAllNews(): Observable<any> {
        return this._http.get(this._url)
            .map((response) => {
                return response.json()
            })
            .catch((error, caught) => {
                console.log(error.message);
                return Observable.throw(caught);
            })
    }


}
