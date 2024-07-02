import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showDepartmentList = false;
  showUnitList = false;
  departments: any[] = [];
  units: any[] = [];
  patients: any[] = [];
  selectedDepartmentName = '';
  selectedUnit: any;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: result => {
        console.log('departments', result.data.getDepartments);
        console.log('departments type', typeof (result.data.getDepartments));
        this.departments = result.data.getDepartments;
      },
      error: error => {
        throw new Error(error);
      }
    });
  }

  showDepartments(): void {
    this.showDepartmentList = true;
    this.showUnitList = false;
    this.selectedUnit = null;
  }

  hideModels(): void {
    this.showDepartmentList = false;
    this.showUnitList = false;
  }

  keepDepartmentsVisible(): void {
    this.showDepartmentList = true;
  }

  keepUnitsVisible(): void {
    this.showUnitList = true;
  }

  showUnits(departmentId: string): void {
    this.departmentService.getUnits(departmentId).subscribe({
      next: result => {
        this.units = result.data.getUnities;
        const selectedDepartment = this.departments.find(dept => dept.id === departmentId);
        this.selectedDepartmentName = selectedDepartment.name;
        this.showUnitList = true;
      }
    });
  }

  selectUnit(unit: any): void {
    this.selectedUnit = unit;
    this.showUnitList = false;
    this.getPatients(unit.id);
  }

  getPatients(unitId: string): void {
    this.departmentService.getPatients(unitId).subscribe(result => {
      this.patients = result.data.unit.patients;
    });
  }
}
