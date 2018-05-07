import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService {

  feedBacks: Feedback[];
  feedBack: Feedback;

  constructor(private restAngular: Restangular) { }

  saveFeedback(fb: Feedback): Observable<Feedback> {
    return this.restAngular.all('feedback').post(fb);
  }

}
