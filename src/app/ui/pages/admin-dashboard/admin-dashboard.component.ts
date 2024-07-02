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
  showPatientList = false;
  showSbarDetails = false;
  departments: any[] = [];
  units: any[] = [];
  patients: any[] = [];
  sbars: any[] = [];
  selectedDepartmentName = '';
  selectedUnit: any;
  selectedPatient: any;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: result => {
        console.log('departments', result.data.getDepartments);
        this.departments = result.data.getDepartments;
      },
      error: error => {
        console.error('Error fetching departments:', error);
      }
    });
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

  showUnits(departmentId: string): void {
    this.departmentService.getUnits(departmentId).subscribe({
      next: result => {
        this.units = result.data.getUnities;
        const selectedDepartment = this.departments.find(dept => dept.id === departmentId);
        this.selectedDepartmentName = selectedDepartment?.name || '';
        this.showUnitList = true;
      },
      error: error => {
        console.error('Error fetching units:', error);
      }
    });
  }

  showPatients(unitId: string): void {
    this.departmentService.getPatients(unitId).subscribe({
      next: result => {
        this.patients = result.data.findPatientsByUnity;
        this.showPatientList = true;
      },
      error: error => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  showSbars(patientId: string): void {
    this.departmentService.getSbars(patientId).subscribe({
      next: result => {
        console.log("sbar result",result)
        this.sbars = result.data.findSbarsByPatient
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
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
  }
}
