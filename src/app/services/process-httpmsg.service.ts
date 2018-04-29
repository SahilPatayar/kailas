import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ProcessHttpmsgService {

  constructor() { }

  extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

}
