import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly API = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';
  
  constructor(private http: HttpClient) { }

  getAllUnits(): Observable<UnitsResponse>{
    return this.http.get<UnitsResponse>(this.API)
  }
}
