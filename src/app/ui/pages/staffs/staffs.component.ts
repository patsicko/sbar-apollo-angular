import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  approved:boolean;
  department?: { id: number; name: string };
  unity?: { id: number; name: string };
}

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {

  staffs: Staff[] = [];
  departments: any[] = [];
  availableUnities: any[] = [];
  selectedStaff: any ;
  showEditStaffModal = false;
  editStaffForm: FormGroup;
  showRemoveUserModal:boolean=false
  selectedUserId:any = null;
  currentUser:any
  isAdmin:boolean=false
  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private stateService:StateService,
    private authService:AuthService
  ) {
    this.editStaffForm = this.fb.group({
      departmentId: ['', Validators.required],
      unityId: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if(this.currentUser.role==='admin'){
        this.isAdmin=true
      }
     console.log("currentUser",this.currentUser)
    });
    this.userService.getAllUsers().subscribe(response => {
      this.staffs = response.data.allUsers;
      this.stateService.setStaffsCount(this.staffs.length);
      console.log("current staffs", this.staffs);
    });

    this.departmentService.getDepartments().subscribe(response => {
      this.departments = response.data.getDepartments;
      console.log("our departments", this.departments);
    });
  }

  editStaff(staff: Staff) {
    this.selectedStaff = staff;
    this.showEditStaffModal = true;
    this.editStaffForm.patchValue({
      departmentId: staff.department?.id || null,
      unityId: staff.unity?.id || null
    });
    if (staff.department?.id) {
      this.updateAvailableUnities(staff.department.id);
    }
  }

  onDepartmentChange(event: Event) {
    const departmentId = (event.target as HTMLSelectElement).value;
    this.editStaffForm.patchValue({ unityId: '' });
    this.updateAvailableUnities(parseInt(departmentId, 10));
  }

  updateAvailableUnities(departmentId: any) {
    const selectedDepartment = this.departments.find(dept => dept.id === departmentId);
    this.availableUnities = selectedDepartment ? selectedDepartment.unities : [];
  }

  updateStaff() {
    if (this.editStaffForm.valid) {
      this.spinner.show()
      const { departmentId, unityId } = this.editStaffForm.value;

      this.departmentService.assignDepartment({
        userId: this.selectedStaff?.id,
        departmentId:parseInt(departmentId),
        unityId:parseInt(unityId)
      }).subscribe({
        next: (data) => {
          if(data){
            setTimeout(()=>{
              this.spinner.hide();
              this.toastr.success("Staff updated successfully")
              this.showEditStaffModal = false;
              this.ngOnInit();
            })
          }

        },
        error: err => {
          console.error("Error updating staff", err);
        }
      });
    }
  }

  approveUser(userId:number){
    this.departmentService.approveUser(userId).subscribe({
      next:(result=>{
        this.toastr.success('User approved successfully')
      })
    })
  }

  removeStaff(id: number) {
    this.selectedUserId = id;
    this.showRemoveUserModal = true;
  }

  confirmRemoveStaff(){
  const userId=this.selectedUserId
  this.departmentService.removeUser(userId).subscribe({
  next:(result=>{
    this.showRemoveUserModal = false;
    this.toastr.warning('User removed successfully')
    })
  })
  }

}
