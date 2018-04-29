import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { OBSERVABLE_MEDIA_PROVIDER } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  handleError(error: Response | any) {
    let errorMsg: string;
    if (error instanceof Response) {
      const body = error.json() || {};
      const err = body.error || JSON.stringify(body);
      errorMsg = `${err.status} - ${err.statusText || ''} ${err}`;
    } else {
      errorMsg = error.message ? error.message : error.toString();
    }
    console.log(errorMsg);
    return Observable.throw(errorMsg);
  }

}
