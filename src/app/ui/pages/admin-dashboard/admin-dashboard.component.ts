import { Component, OnInit,HostListener  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isSmallScreen: boolean=false;
  showDepartmentList = false;
  showUnitList = false;
  showPatientList = false;
  showSbarDetails = false;
  departments: any[] = [];
  units: any[] = [];
  patients: any[] = [];
  sbars: any[] = [];
  filteredSbars:any[]=[]
  selectedDepartment:any
  selectedDepartmentName = '';
  selectedUnit: any;
  selectedPatient: any;
  showAddPatientModal=false
  showAddDepartmentModal=false
  showAddUnitModel=false
  submitted:boolean=false;
  addPatientForm:FormGroup
  createSbarForm:FormGroup
  addDepartmentForm:FormGroup
  addUnitForm:FormGroup
  showCreateSbarForm:boolean=false
  filterForm: FormGroup;
  filtering:boolean=false
  currentUser: any = null;
  isAdmin:boolean=false

  constructor(
    private departmentService: DepartmentService,
    private fb:FormBuilder,
    private router:Router,
    private stateService: StateService,
    private toastr: ToastrService,
    private authService: AuthService
 
   

  ) {
    this.createSbarForm =this.fb.group({
      situation:['',Validators['required']],
      background:['',Validators['required']],
      assessment:['',Validators['required']],
      recommendation:['',Validators['required']]
    }),
    this.addPatientForm=this.fb.group({
    firstName:['',Validators['required']],
    lastName:['',Validators['required']],

    }),
    this.filterForm = this.fb.group({
      id: [''],
      date: [''],
      createdBy: ['']
    }),
    this.addDepartmentForm=this.fb.group({
      name:['',Validators['required']]
    }),
    this.addUnitForm=this.fb.group({
      name:['',Validators['required']]
    }),
    this.checkScreenSize();
   }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser.role==='admin'){
        this.isAdmin=true
      }
     console.log("currentUser",this.currentUser)
    });
    this.getDepartments();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768; 
  }


  
 

  showDepartments(): void {
    this.showDepartmentList = true;
    this.showUnitList = false;
    this.showPatientList = false;
    this.showSbarDetails = false;
    this.selectedUnit = null;
    this.selectedPatient = null;
  }

  hideModels(): void {
    this.showDepartmentList = false;
    this.showUnitList = false;
    this.showPatientList = false;
    this.showSbarDetails = false;
  }

  keepDepartmentsVisible(): void {
    this.showDepartmentList = true;
  }

  keepUnitsVisible(): void {
    this.showUnitList = true;
  }

  keepPatientsVisible(): void {
    this.showPatientList = true;
  }

  keepSbarDetailsVisible(): void {
    this.showSbarDetails = true;
  }

  showUnits(departmentId: number): void {
    this.departmentService.getUnits(departmentId).subscribe({
      next: result => {
        this.units = result.data.getUnities;
        this.stateService.setUnitsCount(this.units.length);
        this. selectedDepartment = this.departments.find(dept => dept.id === departmentId);
        this.selectedDepartmentName = this.selectedDepartment?.name || '';
        this.showUnitList = true;
      },
      error: error => {
        console.error('Error fetching units:', error);
      }
    });
  }

  showPatients(unityId: number): void {
   
    this.departmentService.getPatients(unityId).subscribe({
      next: result => {
       
        this.patients = result.data.findPatientsByUnity;
        this.stateService.setPatientsCount(this.patients.length);
        this.showPatientList = true;
      },
      error: error => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  showSbars(patientId: number): void {
    this.departmentService.getSbars(patientId).subscribe({
      next: result => {
        console.log("sbar result",result)
        this.sbars = result.data.findSbarsByPatient;
        this.stateService.setSbarsCount(this.sbars.length);
        console.log('SBARs:', this.sbars);
        this.showSbarDetails = true;
      },
      error: error => {
        console.error('Error fetching SBARs:', error);
      }
    });
  }

  selectUnit(unit: any): void {
    this.selectedUnit = unit;
    console.log("selected unit",this.selectedUnit)
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
  }

   addPatient(){
   this.submitted=true
   if(this.addPatientForm.valid){
    const addPatientInput=this.addPatientForm.value
    addPatientInput.unityId=this.selectedUnit.id
    this.departmentService.addPatient(addPatientInput).subscribe({
      next:(async result=>{
          if(result){
            this.showAddPatientModal = false;
            this.showPatients(this.selectedUnit.id)
            this.toastr.success('patient added successfully')
          }
      }),
      error:(error)=>{
        this.toastr.error(error.message)
        throw new Error(error)
      }
    })
   }
  
  }

  addSbar(){
    this.submitted=true
    if(this.createSbarForm.valid){
      const sbarInput=this.createSbarForm.value
      sbarInput.patientId=this.selectedPatient.id
    
      this.departmentService.createSbar(sbarInput).subscribe({
        next:(result=>{
         
          this.showCreateSbarForm=false
          this.showSbars(this.selectedPatient.id);
          this.toastr.success('Sbar aded successfully')
        }),
        error:(error=>{
          this.toastr.error(error.message)
          throw new Error(error)
        })
      })
    }
   
  }



  applyFilter() {
    this.filtering=true
    const filterValue = this.filterForm.value;

    let filteredSbars = [...this.sbars];
  
    if (filterValue.id) {
      filteredSbars = filteredSbars.filter(sbar => sbar.id === filterValue.id);
    }
    if (filterValue.date) {
     
      const filterDate = new Date(filterValue.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric'
      });
  
      filteredSbars = filteredSbars.filter(sbar => {
      
        const createdAtDate = new Date(sbar.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'numeric', day: 'numeric'
        });
      
        return createdAtDate === filterDate;
      });
    }
    if (filterValue.createdBy) {
      filteredSbars = filteredSbars.filter(sbar => sbar.createdBy?.lastName === filterValue.createdBy);
    }
  
    this.filteredSbars = filteredSbars;
    console.log("filtered sbars",filteredSbars)
    this.filterForm.reset()
   
  
  }

  transferPatient(){
    
  }

   addDepartment(){
    if(this.addDepartmentForm.valid){
      const departmentData=this.addDepartmentForm.value
      this.departmentService.addDepartment(departmentData).subscribe({
        next:result=>{
         
          this.showAddDepartmentModal=false
          if(result){
         
          this.showDepartmentList=true
          }
         
        },
        
        error:error=>{
          this.toastr.error(error.message)
        }
      })
    }
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
  
  addUnit(){
    if(this.addUnitForm.valid){
      const addUnitData=this.addUnitForm.value
      addUnitData.departmentId=this.selectedDepartment.id
      this.departmentService.addUnit(addUnitData).subscribe({
        next:(result=>{
          if(result){
            this.showAddUnitModel=false
            this.showUnitList=true
            this.toastr.success("Unit added successfully")
          }
        }),
        error:(error=>{
          this.toastr.error(error.message);
          throw new Error(error.message)
        })
      })
    }
  }
  
  deleteDepartment(departmentId:number){

  }

  deleteUnit(unitId:number){

  }

  deletePatient(patientId:number){

  }
}
