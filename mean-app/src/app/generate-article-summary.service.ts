import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GenerateArticleSummaryService {

  constructor(private http: Http) { }

  getSummary() {
  	return this.http.get('/api/summary')
  		.map(data => JSON.parse(data['_body']));
  }

}
