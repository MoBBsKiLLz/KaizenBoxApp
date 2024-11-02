import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FacilityService } from '../service/facility.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-facility',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule ],
  templateUrl: './edit-facility.component.html',
  styleUrl: './edit-facility.component.css'
})
export class EditFacilityComponent {
  facilityId!: number;
  facilityData: any = {}; // Initialize with an empty object

  constructor(
    private route: ActivatedRoute,
    private facilitiesService: FacilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facilityId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from route
    this.loadFacility();
  }

  loadFacility(): void {
    // Call service to get facility details here
    this.facilitiesService.getFacilityById(this.facilityId).subscribe(
      (data) => {
        // Assuming the response is an array and you need the first item
        if (data && data.length > 0) {
          this.facilityData = data[0]; // Set the facilityData with the fetched facility
        }
      },
      (error) => {
        console.error('Error fetching facility data', error);
        // Handle error (e.g., show a message to the user)
      }
    );
  }

  onSubmit(): void {
    this.facilitiesService.updateFacility(this.facilityId, this.facilityData).subscribe(() => {
      this.router.navigate(['/facilities']); // Redirect after update
    });
  }
}
