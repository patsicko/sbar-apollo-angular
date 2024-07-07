import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/services/state.service'; // Import the state service
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  departmentsCount: number=0;
  unitsCount: number=0;
  patientsCount: number=0;
  sbarsCount: number=0;
  
  private subscriptions: Subscription[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.stateService.departmentsCount$.subscribe(count => {
        this.departmentsCount = count;
      }),
      this.stateService.unitsCount$.subscribe(count => {
        this.unitsCount = count;
      }),
      this.stateService.patientsCount$.subscribe(count => {
        this.patientsCount = count;
      }),
      this.stateService.sbarsCount$.subscribe(count => {
        this.sbarsCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
