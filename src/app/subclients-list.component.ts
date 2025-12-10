import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface Subclient {
  id: string;
  externalKey: string;
  name: string;
  type: string;
  status: string;
  balance: number;
}

@Component({
  selector: 'app-subclients-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="page-header">
      <div>
        <h1>Subclients</h1>
        <p class="subtitle">Entities and users of the Services</p>
      </div>
    </div>

    <div class="filters-section">
      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>ID</mat-label>
        <mat-select [(ngModel)]="filters.id">
          <mat-option value="">All</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>State</mat-label>
        <mat-select [(ngModel)]="filters.state">
          <mat-option value="">All</mat-option>
          <mat-option value="active">Active</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="filter-field search-field">
        <mat-label>Search</mat-label>
        <input matInput [(ngModel)]="filters.search">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <button mat-stroked-button class="advance-search-btn">
        Advance Search
      </button>

      <div class="filters-right">
        <button mat-icon-button><mat-icon>refresh</mat-icon></button>
        <button mat-icon-button><mat-icon>sort</mat-icon></button>
        <button mat-icon-button><mat-icon>filter_list</mat-icon></button>
        <button mat-stroked-button>Export</button>
      </div>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-label">Total No. of Subclients</div>
        <div class="stat-value">
          <mat-icon>group</mat-icon>
          •••
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Subclient In</div>
        <div class="stat-value">
          <mat-icon>person</mat-icon>
          •••
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Subclient Out</div>
        <div class="stat-value">
          <mat-icon>person</mat-icon>
          •••
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Subclient ID</th>
            <th>External Key</th>
            <th>Subclient Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Balance of Virtual Account</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of subclients" class="table-row">
            <td>{{ item.id }}</td>
            <td>{{ item.externalKey }}</td>
            <td>{{ item.name }}</td>
            <td>
              <mat-chip class="type-chip">{{ item.type }}</mat-chip>
            </td>
            <td>{{ item.status }}</td>
            <td>+ {{ item.balance.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button mat-fab class="fab" color="primary">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    .page-header {
      margin-bottom: 24px;
    }

    h1 {
      font-size: 32px;
      font-weight: 400;
      margin: 0 0 8px 0;
      color: #333;
    }

    .subtitle {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    .filters-section {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .filter-field {
      width: 150px;
    }

    .search-field {
      width: 250px;
    }

    .filters-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .stat-label {
      font-size: 13px;
      color: #666;
      margin-bottom: 12px;
    }

    .stat-value {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 500;
      color: #333;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      padding: 16px 20px;
      font-weight: 500;
      color: #666;
      font-size: 13px;
      border-bottom: 2px solid #e0e0e0;
      background: #fafafa;
    }

    .data-table td {
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
      font-size: 14px;
    }

    .table-row:hover {
      background: #f9f9f9;
      cursor: pointer;
    }

    .type-chip {
      background: #3949ab !important;
      color: white !important;
      font-size: 12px !important;
      height: 28px !important;
    }

    .fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `]
})
export class SubclientsListComponent {
  filters = {
    id: '',
    state: '',
    search: ''
  };

  subclients: Subclient[] = [
    { id: '381433', externalKey: 'XX XX XX 99 88', name: 'HARRY CHUNG', type: 'Natural_Person', status: 'Success', balance: 50.00 },
    { id: '381433', externalKey: 'XX XX XX 99 88', name: 'HARRY CHUNG', type: 'Natural_Person', status: 'Success', balance: 50.00 },
    { id: '381433', externalKey: 'XX XX XX 99 88', name: 'HARRY CHUNG', type: 'Natural_Person', status: 'Success', balance: 50.00 },
    { id: '381433', externalKey: 'XX XX XX 99 88', name: 'HARRY CHUNG', type: 'Natural_Person', status: 'Success', balance: 50.00 }
  ];
}
