import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { UserService } from 'src/app/services/user.service';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.editStaffForm = this.fb.group({
      departmentId: ['', Validators.required],
      unityId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response => {
      this.staffs = response.data.allUsers;
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
      const { departmentId, unityId } = this.editStaffForm.value;
    
      this.departmentService.assignDepartment({
        userId: this.selectedStaff?.id,
        departmentId:parseInt(departmentId),
        unityId:parseInt(unityId)
      }).subscribe({
        next: () => {
          this.showEditStaffModal = false;
          // Refresh the list of staffs
          this.ngOnInit();
        },
        error: err => {
          console.error("Error updating staff", err);
        }
      });
    }
  }
}
