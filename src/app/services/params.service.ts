import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";  

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor() { }

  private dataSource = new BehaviorSubject("initial default");

  serviceData = this.dataSource.asObservable();

  changeData(data: any) {
    this.dataSource.next(data);
  }

}
