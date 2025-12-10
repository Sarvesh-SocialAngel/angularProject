import { Routes } from '@angular/router';
import { HomeComponent } from './app';
import { BankDetailComponent } from './bank-detail.component';
import { CreateSubclientsComponent } from './create-subclients.component';

export const routes: Routes = [
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
  }
];
