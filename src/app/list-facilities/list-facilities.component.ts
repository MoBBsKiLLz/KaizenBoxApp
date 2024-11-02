import { Component } from '@angular/core';
import { FacilityService } from '../service/facility.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-facilities',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './list-facilities.component.html',
  styleUrl: './list-facilities.component.css'
})
export class ListFacilitiesComponent {
  facilities: any[] = [];

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.facilityService.getFacilities().subscribe(
      (data) => {
        this.facilities = data;
      },
      (error) => {
        console.error('Error fetching facilities', error);
      }
    );
  }

  editFacility(facilityId: number): void {
    console.log('Edit facility with ID:', facilityId);
    // Placeholder for future edit logic
  }
}
