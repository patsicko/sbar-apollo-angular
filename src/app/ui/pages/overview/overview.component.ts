import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/services/state.service'; // Import the state service
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {
  departmentsCount: number=0;
  unitsCount: number=0;
  patientsCount: number=0;
  staffsCount:number=0;
  sbarsCount: number=0;
  currentUser:any
  isAdmin:boolean=false
  private subscriptions: Subscription[] = [];
  departments: any[] = [];
  patients:any[]=[]
  staffs: any[] = [];


  constructor(
    private stateService: StateService,
    private authService:AuthService,
    private departmentService:DepartmentService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
   this. getDepartments()
   this.departmentService.getAllPatients().subscribe({
    next:(result=>{
   if(result){
   
    this.patients=result.data.getPatients
    this.stateService.setPatientsCount(this.patients.length);
  
    

    console.log("all patients",result)
   }
    }),
    error:(error=>{
      this.spinner.hide()
      throw new Error(error.message)
    })
  })

  this.userService.getAllUsers().subscribe(response => {
    this.staffs = response.data.allUsers;
    this.stateService.setStaffsCount(this.staffs.length);
    console.log("current staffs", this.staffs);
  });


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
      }),
      this.stateService.staffsCount$.subscribe(count=>{
        this.staffsCount=count
      })
    );

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser.role==='admin'){
        this.isAdmin=true
      }
     console.log("currentUser",this.currentUser)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  getDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: result => {
  
        this.departments = result.data.getDepartments;
  
        this.stateService.setDepartmentsCount(this.departments.length);
      },
      error: error => {
        this.toastr.error(error.message)
        throw new Error(error.message)
      }
    });
  }
}
