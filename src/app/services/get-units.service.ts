import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UnitsResponse } from '../types/units-response';
import { Location } from '../types/location';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];
  
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });

  }

  getAllUnits(): Observable<Location[]>{
    return this.allUnits$;
  }

  getFilteredUnits(){
    return this.filteredUnits;
  }

  setFilteredUnits(value: Location[]){
    this.filteredUnits = value;
  }


}
