import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

interface Account {
  routingNo: string;
  accountNo: string;
  type: string;
  description: string;
}

interface Transaction {
  id: string;
  transactionId: string;
  subclientOrigin: string;
  subclientDestination: string;
  reference: string;
  amount: number;
  purpose: string;
  submitted: string;
  company: string;
}

@Component({
  selector: 'app-create-subclients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  template: `
    <div class="container">
      <h1 class="page-title">Create Subclients</h1>

      <!-- Basic Information -->
      <div class="form-section">
        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Type*</mat-label>
            <mat-select [(ngModel)]="formData.type">
              <mat-option value="individual">Individual</mat-option>
              <mat-option value="business">Business</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Relation Type*</mat-label>
            <mat-select [(ngModel)]="formData.relationType">
              <mat-option value="parent">Parent</mat-option>
              <mat-option value="subsidiary">Subsidiary</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field full-width">
            <mat-label>State*</mat-label>
            <mat-select [(ngModel)]="formData.state">
              <mat-option value="created">Created</mat-option>
              <mat-option value="active">Active</mat-option>
              <mat-option value="inactive">Inactive</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Name*</mat-label>
            <mat-select [(ngModel)]="formData.name">
              <mat-option value="">Select Name</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>External Key</mat-label>
            <input matInput [(ngModel)]="formData.externalKey">
          </mat-form-field>
        </div>

        <div class="checkbox-row">
          <mat-checkbox [(ngModel)]="formData.active" color="primary">
            Active
          </mat-checkbox>
        </div>
      </div>

      <!-- Address Section -->
      <div class="form-section">
        <h2 class="section-title">Address</h2>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Street Address 1*</mat-label>
            <input matInput [(ngModel)]="formData.address.street1">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Street Address 2</mat-label>
            <input matInput [(ngModel)]="formData.address.street2">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>City*</mat-label>
            <input matInput [(ngModel)]="formData.address.city">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>State/Province</mat-label>
            <input matInput [(ngModel)]="formData.address.stateProvince">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Postal Code</mat-label>
            <input matInput [(ngModel)]="formData.address.postalCode">
          </mat-form-field>

          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Country Code (ISO 3166-1 alpha-2)</mat-label>
            <input matInput [(ngModel)]="formData.address.countryCode">
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="form-field full-width">
            <mat-label>Address Type</mat-label>
            <mat-select [(ngModel)]="formData.address.type">
              <mat-option value="residential">Residential</mat-option>
              <mat-option value="commercial">Commercial</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <!-- Account Section -->
      <div class="form-section">
        <div class="section-header">
          <h2 class="section-title">Account</h2>
          <button mat-icon-button (click)="addAccount()">
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <table class="data-table" *ngIf="accounts.length > 0">
          <thead>
            <tr>
              <th>Routing No.</th>
              <th>Account No.</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let account of accounts">
              <td>{{ account.routingNo }}</td>
              <td>{{ account.accountNo }}</td>
              <td>{{ account.type }}</td>
              <td>{{ account.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Documents Section -->
      <div class="form-section">
        <h2 class="section-title">Documents</h2>
        <a href="#" class="link">Show Documents</a>
      </div>

      <!-- Outbound Subtransaction Section -->
      <div class="form-section">
        <h2 class="section-title">Outbound Subtransaction</h2>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Transaction Id</th>
                <th>Subclient Origin</th>
                <th>Subclient Destination</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Submitted</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="outboundTransactions.length === 0">
                <td colspan="9" class="no-data">No data available</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <span class="pagination-label">Items per page</span>
            <mat-form-field appearance="outline" class="pagination-select">
              <mat-select [(ngModel)]="outboundPageSize">
                <mat-option [value]="10">10</mat-option>
                <mat-option [value]="20">20</mat-option>
                <mat-option [value]="50">50</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-icon-button [disabled]="outboundPage === 1">
              <mat-icon>chevron_left</mat-icon>
            </button>
            <span class="pagination-info">{{ outboundPage }}</span>
            <button mat-icon-button [disabled]="outboundPage >= totalOutboundPages">
              <mat-icon>chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Inbound Subtransaction Section -->
      <div class="form-section">
        <h2 class="section-title">Inbound Subtransaction</h2>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Transaction Id</th>
                <th>Subclient Origin</th>
                <th>Subclient Destination</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Submitted</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="inboundTransactions.length === 0">
                <td colspan="9" class="no-data">No data available</td>
              </tr>
            </tbody>
          </table>

          <div class="pagination">
            <span class="pagination-label">Items per page</span>
            <mat-form-field appearance="outline" class="pagination-select">
              <mat-select [(ngModel)]="inboundPageSize">
                <mat-option [value]="10">10</mat-option>
                <mat-option [value]="20">20</mat-option>
                <mat-option [value]="50">50</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-icon-button [disabled]="inboundPage === 1">
              <mat-icon>chevron_left</mat-icon>
            </button>
            <span class="pagination-info">{{ inboundPage }}</span>
            <button mat-icon-button [disabled]="inboundPage >= totalInboundPages">
              <mat-icon>chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button mat-button class="cancel-btn" (click)="cancel()">Cancel</button>
        <button mat-raised-button color="primary" class="ok-btn" (click)="submit()">Ok</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 48px;
      background: #fafafa;
      min-height: 100vh;
    }

    .page-title {
      font-size: 28px;
      font-weight: 400;
      margin: 0 0 32px 0;
      color: #333;
    }

    .form-section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 20px 0;
      color: #333;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-field {
      width: 100%;
    }

    .form-field.full-width {
      grid-column: 1 / -1;
    }

    .checkbox-row {
      margin: 16px 0;
    }

    ::ng-deep .mat-mdc-form-field {
      font-size: 14px;
    }

    ::ng-deep .mat-mdc-text-field-wrapper {
      background: white;
    }

    ::ng-deep .mdc-text-field--outlined .mdc-notched-outline {
      border-color: #e0e0e0;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }

    .data-table th {
      text-align: left;
      padding: 12px 16px;
      font-weight: 500;
      color: #666;
      font-size: 13px;
      border-bottom: 2px solid #e0e0e0;
      background: #fafafa;
    }

    .data-table td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
      font-size: 14px;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    .no-data {
      text-align: center;
      color: #999;
      padding: 32px !important;
    }

    .link {
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
      display: inline-block;
      margin-top: 8px;
    }

    .link:hover {
      text-decoration: underline;
    }

    .table-container {
      overflow-x: auto;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 16px;
      padding: 16px 0;
      border-top: 1px solid #e0e0e0;
    }

    .pagination-label {
      font-size: 14px;
      color: #666;
    }

    .pagination-select {
      width: 80px;
    }

    .pagination-select ::ng-deep .mat-mdc-form-field-infix {
      padding: 8px 0;
      min-height: auto;
    }

    .pagination-select ::ng-deep .mat-mdc-text-field-wrapper {
      padding: 0 8px;
    }

    .pagination-info {
      font-size: 14px;
      color: #333;
      min-width: 30px;
      text-align: center;
    }

    .action-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 32px;
    }

    .cancel-btn {
      color: #666;
    }

    .ok-btn {
      background: #1976d2;
      color: white;
      padding: 0 32px;
    }

    ::ng-deep .mat-mdc-raised-button:not(:disabled) {
      background-color: #1976d2;
    }

    ::ng-deep .mat-mdc-raised-button:hover:not(:disabled) {
      background-color: #1565c0;
    }
  `]
})
export class CreateSubclientsComponent {
  formData = {
    type: '',
    relationType: '',
    state: 'created',
    name: '',
    externalKey: '',
    active: true,
    address: {
      street1: '',
      street2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      countryCode: '',
      type: ''
    }
  };

  accounts: Account[] = [];
  outboundTransactions: Transaction[] = [];
  inboundTransactions: Transaction[] = [];

  outboundPage = 1;
  outboundPageSize = 20;
  totalOutboundPages = 1;

  inboundPage = 1;
  inboundPageSize = 20;
  totalInboundPages = 1;

  constructor(private router: Router) {}

  addAccount() {
    // Logic to add new account
    console.log('Add account clicked');
  }

  cancel() {
    this.router.navigate(['/']);
  }

  submit() {
    console.log('Form submitted:', this.formData);
    // Add submission logic here
  }
}
