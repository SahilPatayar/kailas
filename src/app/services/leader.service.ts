import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  // getLeaders(): Leader[] {
  //   return LEADERS;
  // }

  // getFeaturedLeader(): Leader {
  //   return LEADERS.filter(leader => leader.featured)[0];
  // }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getFeaturedLeader(): Observable<Leader> {
     return this.restangular.all('leaders').getList({featured: true}).map(leaders => leaders[0]);
  }

}
