import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoundsDataService {

  data: any;

  constructor(private http: HttpClient) { }

  load(): Observable<any> {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .pipe(map(this.processData, this));
    }

  }

  private processData(res: Response) {
    let body = res;
    return body || {}

  }
}
