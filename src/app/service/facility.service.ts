import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private apiUrl = 'http://localhost:3000/facilities';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Set the Authorization header
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getFacilityById(facilityId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any[]>(`http://localhost:3000/facilities?facilityId=${facilityId}`, { headers });
  }

  createFacility(facility: any): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming your token is stored in localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, facility, { headers });
  }

  updateFacility(facilityId: number, facilityData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

     // Include the facilityId in the request body
     const body = {
        facilityId: facilityId,
        facilityName: facilityData.facility_name,
        address1: facilityData.address_1,
        address2: facilityData.address_2,
        city: facilityData.city,
        state: facilityData.state,
        postal: facilityData.postal,
        contactNumber: facilityData.contact_number,
        email: facilityData.email
    };
  
    return this.http.put(`http://localhost:3000/facilities`, body, { headers });
  }

  deleteFacility(facilityId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${facilityId}`, { headers });
  }
}
