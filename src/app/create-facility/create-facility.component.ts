import { Component } from '@angular/core';
import { FacilityService } from '../service/facility.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-facility',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './create-facility.component.html',
  styleUrl: './create-facility.component.css'
})
export class CreateFacilityComponent {
  facility = {
    facilityName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    contactNumber: '',
    email: ''
  };

  constructor(private facilitiesService: FacilityService, private router: Router) {}

  onSubmit() {
    this.facilitiesService.createFacility(this.facility).subscribe(response => {
      // Handle success response
      console.log('Facility created!', response);
      this.router.navigate(['/facilities']); // Redirect to the facilities list
    }, error => {
      // Handle error response
      console.error('Error creating facility:', error);
    });
  }
}
