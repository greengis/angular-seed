import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from "../login/login/login.component";
import { AuthGuard } from "../auth.guard";


export const routes = [

    { path: 'login', component: LoginComponent },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent
        /*canActivate: [AuthGuard],*/,
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'login' }

];
