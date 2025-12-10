import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HomeComponent } from './home-page.component';
import { BankDetailComponent } from './bank-detail.component';
import { CreateSubclientsComponent } from './create-subclients.component';
import { SubclientsComponent } from './subclients-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'bank',
        component: BankDetailComponent
      },
      {
        path: 'create-subclients',
        component: CreateSubclientsComponent
      },
      {
        path: 'sub-clients',
        component: SubclientsComponent
      }
    ]
  }
];