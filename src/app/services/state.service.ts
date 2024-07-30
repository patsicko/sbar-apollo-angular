import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private departmentsCountSubject = new BehaviorSubject<number>(0);
  private unitsCountSubject = new BehaviorSubject<number>(0);
  private patientsCountSubject = new BehaviorSubject<number>(0);
  private sbarsCountSubject = new BehaviorSubject<number>(0);
  private staffsCountSubject= new BehaviorSubject<number>(0)

  departmentsCount$ = this.departmentsCountSubject.asObservable();
  unitsCount$ = this.unitsCountSubject.asObservable();
  patientsCount$ = this.patientsCountSubject.asObservable();
  sbarsCount$ = this.sbarsCountSubject.asObservable();
  staffsCount$=this.staffsCountSubject.asObservable()

  setDepartmentsCount(count: number) {
    this.departmentsCountSubject.next(count);
  }

  setUnitsCount(count: number) {
    this.unitsCountSubject.next(count);
  }

  setPatientsCount(count: number) {
    this.patientsCountSubject.next(count);
  }

  setSbarsCount(count: number) {
    this.sbarsCountSubject.next(count);
  }

  setStaffsCount(count:number){
    this.staffsCountSubject.next(count)
  }
}
