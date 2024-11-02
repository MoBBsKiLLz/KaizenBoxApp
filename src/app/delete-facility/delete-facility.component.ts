import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilityService } from '../service/facility.service';

@Component({
  selector: 'app-delete-facility',
  standalone: true,
  imports: [],
  templateUrl: './delete-facility.component.html',
  styleUrl: './delete-facility.component.css'
})
export class DeleteFacilityComponent {
  facilityId: number = 0;
  facility: any;

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.facilityId = +id;
      this.loadFacilityDetails(); 
    } else {
      // Navigate back to the facility list when 'id' is missing 
      this.router.navigate(['/facilities']);
    }
  }

  loadFacilityDetails(): void {
    this.facilityService.getFacilityById(this.facilityId).subscribe(
      (data) => {
        this.facility = data[0]; // Assign facility details to 'facility' property
      },
      (error) => {
        console.error('Error fetching facility details', error);
        this.router.navigate(['/facilities']); // Handle error by redirecting
      }
    );
  }

  onDeleteConfirm() {
    this.facilityService.deleteFacility(this.facilityId).subscribe(() => {
      this.router.navigate(['/facilities']);
    });
  }

  onCancel() {
    this.router.navigate(['/facilities']);
  }
}
