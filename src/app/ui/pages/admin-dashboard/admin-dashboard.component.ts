import { Component, OnInit,HostListener  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TransferPatientInput } from 'src/app/interfaces/user.dto';
import { NgxSpinnerService } from "ngx-spinner";



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
  isAdmin:boolean=false;

  showTransferModal = false;
  transferForm: FormGroup;
  targetDepartmentId:number|null=null
  targetUnitId:number | null=null
  showRemoveDepartmentModal:boolean=false
  showRemoveUnitModal:boolean=false
  unitToDelete:any

  loadingUnits = false;
  departmentToDelete:any

  constructor(
    private departmentService: DepartmentService,
    private fb:FormBuilder,
    private router:Router,
    private stateService: StateService,
    private toastr: ToastrService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
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
    this.transferForm = this.fb.group({
      department: [''],
      unit: ['']
    });
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
        // this.stateService.setPatientsCount(this.patients.length);
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
    this.spinner.show()
    const addPatientInput=this.addPatientForm.value

    addPatientInput.unityId=this.selectedUnit.id
    addPatientInput.departmentId=this.selectedDepartment.id
    this.departmentService.addPatient(addPatientInput).subscribe({
      next:(async result=>{
          if(result){
           
           this.spinner.hide()
            this.showAddPatientModal = false;
            this.showPatients(this.selectedUnit.id)
            this.toastr.success('patient added successfully')
           

          }
      }),
      error:(error)=>{
        this.spinner.hide()
        this.toastr.error(error.message)
        throw new Error(error)
      }
    })
   }

  }

  submitSbar(){
    this.submitted=true
    if(this.createSbarForm.valid){
      this.spinner.show()
      const sbarInput=this.createSbarForm.value
      sbarInput.patientId=this.selectedPatient.id

      this.departmentService.createSbar(sbarInput).subscribe({
        next:(result=>{
          setTimeout(()=>{
            this.spinner.hide()
            this.createSbarForm.reset()
            this.showCreateSbarForm=false
            this.showSbars(this.selectedPatient.id);
            this.toastr.success('Sbar aded successfully')
          },800)

        }),
        error:(error=>{
          this.spinner.hide()
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



   addDepartment(){
    if(this.addDepartmentForm.valid){
      this.spinner.show()
      const departmentData=this.addDepartmentForm.value
      this.departmentService.addDepartment(departmentData).subscribe({
        next:result=>{
         setTimeout(()=>{
          this.spinner.hide()
          this.showAddDepartmentModal=false
          if(result){

          this.showDepartmentList=true
          }
         },800)
        },

        error:error=>{
          this.spinner.hide()
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
      this.spinner.show()
      const addUnitData=this.addUnitForm.value
      addUnitData.departmentId=this.selectedDepartment.id
      this.departmentService.addUnit(addUnitData).subscribe({
        next:(result=>{
          if(result){
            setTimeout(()=>{
              this.spinner.hide()
              this.showAddUnitModel=false
              this.showUnitList=true
              this.toastr.success("Unit added successfully")
            },800)

          }
        }),
        error:(error=>{
          this.spinner.hide()
          this.toastr.error(error.message);
          throw new Error(error.message)
        })
      })
    }
  }


  deleteDepartment(departmentId:any){
  this.departmentToDelete=departmentId
  console.log("departmentId",departmentId)
  this.showRemoveDepartmentModal=true
  }

  confirmRemoveDepartment(){
    this.spinner.show()
 this.departmentService.removeDepartment(this.departmentToDelete).subscribe({
  next:(result=>{
    this.spinner.hide()
    this.showRemoveDepartmentModal=false
    this.toastr.success("department deleted successfully")
  }),
  error:(error=>{
    this.spinner.hide()
    this.showRemoveDepartmentModal=false
    this.toastr.error(error.message);
    throw new Error(error.message)
  })
 })
  }

  deleteUnit(unitId:number){
    console.log("unitId",unitId)
  this.unitToDelete=unitId
  console.log("unit to delete",this.unitToDelete)
  this.showRemoveUnitModal=true
  }

  confirmRemoveUnit(){
    this.spinner.show()
   this.departmentService.removeUnit(this.unitToDelete,this.selectedDepartment.id).subscribe({
    next:(result=>{
      if(result){
        this.spinner.hide()
        this.showRemoveUnitModal=false
        this.toastr.success("unit deleted successfully");
      
      
      }
    }),
    error:(error=>{
      this.spinner.hide()
      this.showRemoveUnitModal=false
      this.toastr.error(error.message)
    })
  })
}

  deletePatient(patientId:number){

  }


  logout(): void {
    this.authService.logout();
  }

  onDepartmentChange(event: Event) {
   this.targetDepartmentId = +(event.target as HTMLSelectElement).value;
    const selectedDept = this.departments.find(dept => dept.id === this.targetDepartmentId);

    if (selectedDept) {
      this.spinner.show()
      this.departmentService.getUnits(this.targetDepartmentId).subscribe({
        next: result => {
          this.units = result.data.getUnities;
          this.transferForm.get('unit')?.setValue('');
          if(result){
            setTimeout(()=>{
              this.spinner.hide()
            },1000)

          }
          console.log('Units fetched:', this.units);
        },
        error: error => {
          this.spinner.hide()
          console.error('Error fetching units:', error);
        }
      });
    } else {
      this.units = [];
    }
  }

  onUnitChange(event: Event) {
    const unitId = +(event.target as HTMLSelectElement).value;
    console.log("UNIT ID ON CHANGE:", unitId);
    const selectedUnit = this.units.find(unit => unit.id === unitId);
    this.transferForm.get('unit')?.setValue(selectedUnit?.id || '');
    console.log('Selected Unit:', selectedUnit);
  }
  closeTransferModal() {
    this.showTransferModal = false;
  }

  transferPatient() {
    const transferData:TransferPatientInput = {
    targetDepartmentId:parseInt(this.transferForm.value.department),
    targetUnityId:parseInt(this.transferForm.value.unit),
    patientId:parseInt(this.selectedPatient.id)
    }

    console.log("transfer data",transferData)
   if(this.transferForm.valid){
   this.spinner.show()
    this.departmentService.transferPatient(transferData).subscribe({
      next:(result=>{
        this.departments=[]
        this.getDepartments();
        setTimeout(()=>{
          this.spinner.hide()
          window.location.reload()
          this.toastr.success("patient transfered successfully")
        },1500)

        console.log("transfer result",result)
      }),
      error:(error=>{
        this.spinner.hide()
        this.toastr.error(error.message)
        throw new Error(error.message)
      })
    })


   }
    this.closeTransferModal();
  }
}
