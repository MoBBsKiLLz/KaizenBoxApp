import { Routes } from '@angular/router';
import { ListFacilitiesComponent } from './list-facilities/list-facilities.component';
import { CreateFacilityComponent } from './create-facility/create-facility.component';
import { DeleteFacilityComponent } from './delete-facility/delete-facility.component';
import { EditFacilityComponent } from './edit-facility/edit-facility.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: 'facilities', component: ListFacilitiesComponent, canActivate: [AuthGuard] },
    { path: 'facilities/create', component: CreateFacilityComponent, canActivate: [AuthGuard] },
    { path: 'facilities/edit/:id', component: EditFacilityComponent, canActivate: [AuthGuard] },
    { path: 'facilities/delete/:id', component: DeleteFacilityComponent, canActivate: [AuthGuard] },
    { path: 'auth/register', component: RegisterUserComponent },
    { path: 'auth/login', component: LoginUserComponent },
    { path: 'user/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
    { path: 'user/:id', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route for unauthenticated users
    //{ path: '**', redirectTo: 'auth/login' } // Catch-all route
];