
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import subclientsData from './subclients-data.json';

interface Subclient {
  id: string;
  extKey: string;
  subClientName: string;
  type: string;
  relationshipType: string;
  company: string;
  state: string;
  vaBalances: string;
}

@Component({
  selector: 'app-subclients',
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
    <div class="subclients-container">
      <!-- Header -->
      <div class="page-header">
        <h1>Subclients</h1>
        <p class="subtitle">Entities and users of the Services</p>
      </div>

      <!-- Filters Row -->
      <div class="filters-row">
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>ID</mat-label>
          <mat-select [(ngModel)]="filters.id" (selectionChange)="applyFilters()">
            <mat-option value="">All</mat-option>
            <mat-option value="381433">381433</mat-option>
            <mat-option value="64499">64499</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Ext. Key</mat-label>
          <input matInput [(ngModel)]="filters.extKey" (input)="applyFilters()">
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>State</mat-label>
          <mat-select [(ngModel)]="filters.state" (selectionChange)="applyFilters()">
            <mat-option value="">All</mat-option>
            <mat-option value="active">Active</mat-option>
            <mat-option value="inactive">Inactive</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Relationship Type</mat-label>
          <mat-select [(ngModel)]="filters.relationshipType" (selectionChange)="applyFilters()">
            <mat-option value="">All</mat-option>
            <mat-option value="Customer">Customer</mat-option>
            <mat-option value="Beneficiary">Beneficiary</mat-option>
            <mat-option value="Affiliate">Affiliate</mat-option>
            <mat-option value="Root">Root</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="right-controls">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search</mat-label>
            <input matInput [(ngModel)]="filters.search" (input)="applyFilters()">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <button mat-stroked-button class="export-btn">Export</button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-wrapper">
        <table class="subclients-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ext. Key</th>
              <th>Sub_Client_Name</th>
              <th>Type <mat-icon class="sort-icon">unfold_more</mat-icon></th>
              <th>Relationship Type</th>
              <th>Company</th>
              <th>VA_Balances</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of paginatedSubclients">
              <td>{{ item.id }}</td>
              <td>{{ item.extKey }}</td>
              <td>{{ item.subClientName }}</td>
              <td>
                <span class="type-badge" [ngClass]="item.type === 'Business' ? 'badge-business' : 'badge-natural'">
                  {{ item.type }}
                </span>
              </td>
              <td>{{ item.relationshipType }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.vaBalances }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Footer -->
        <div class="pagination-footer">
          <div class="pagination-left">
            <span>Items per page:</span>
            <mat-form-field appearance="outline" class="page-size-select">
              <mat-select [(ngModel)]="pageSize" (selectionChange)="onPageSizeChange()">
                <mat-option [value]="20">20</mat-option>
                <mat-option [value]="50">50</mat-option>
                <mat-option [value]="100">100</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="pagination-right">
            <button mat-icon-button>
              <mat-icon>chevron_left</mat-icon>
            </button>
            <span class="page-number">20</span>
            <button mat-icon-button>
              <mat-icon>chevron_right</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- FAB Button -->
      <button mat-fab color="primary" class="add-fab">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .subclients-container {
      padding: 48px 40px;
      background: #ffffff;
      min-height: 100vh;
    }
    .add-fab{
      background-color:#293681;
    }

    /* Header */
    .page-header {
      margin-bottom: 30px;
    }

    h1 {
      font-size: 28px;
      font-weight: 400;
      margin: 0 0 6px 0;
      color: #000000;
    }

    .subtitle {
      font-size: 14px;
      color: #666666;
      margin: 0;
      font-weight: 400;
    }

    /* Filters Row */
    .filters-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 20px;
    }

    .right-controls {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-left: auto;
    }

    /* Form Fields */
    ::ng-deep .filter-field,
    ::ng-deep .search-field,
    ::ng-deep .page-size-select {
      margin: 0 !important;
    }

    ::ng-deep .filter-field .mat-mdc-text-field-wrapper,
    ::ng-deep .search-field .mat-mdc-text-field-wrapper,
    ::ng-deep .page-size-select .mat-mdc-text-field-wrapper {
      background: #ffffff;
      border-radius: 4px;
      height: 40px;
    }

    ::ng-deep .filter-field .mat-mdc-form-field-infix,
    ::ng-deep .search-field .mat-mdc-form-field-infix {
      min-height: 40px;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      display: flex;
      align-items: center;
    }

    ::ng-deep .page-size-select .mat-mdc-form-field-infix {
      min-height: 32px;
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    ::ng-deep .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    ::ng-deep .mat-mdc-floating-label {
      font-size: 12px;
      color: #666;
      top: 20px !important;
    }

    ::ng-deep .mdc-floating-label--float-above {
      top: 10px !important;
      transform: translateY(-100%) scale(0.85) !important;
    }

    ::ng-deep .mat-mdc-select-value,
    ::ng-deep input.mat-mdc-input-element {
      font-size: 13px;
      color: #000;
      line-height: 24px;
    }

    ::ng-deep .mat-mdc-select-arrow-wrapper {
      transform: translateY(0) !important;
    }

    .filter-field {
      width: 110px;
    }

    .search-field {
      width: 180px;
    }

    .page-size-select {
      width: 65px;
    }

    ::ng-deep .search-field .mat-icon {
      color: #ffff;
    }

    /* Export Button */
    .export-btn {
      height: 40px;
      padding: 0 16px;
      font-size: 13px;
      border: 1px solid #d0d0d0;
      background: #ffffff;
      color: #333;
    }

    .export-btn:hover {
      background: #f8f8f8;
    }

    /* Table */
    .table-wrapper {
      background: #ffffff;
      // border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .subclients-table {
      width: 100%;
      border-collapse: collapse;
    }

    .subclients-table thead {
      background: #fafafa;
    }

    .subclients-table th {
      text-align: left;
      padding: 10px 14px;
      font-weight: 600;
      font-size: 12px;
      // font-weight:400:
      color: #666666;
      background:white;
      background: #ffffff;
      border-bottom: 1px solid #F0F1F4;
    }

    .subclients-table th .sort-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
      vertical-align: middle;
      color: #999;
      margin-left: 2px;
    }

    .subclients-table td {
      padding: 6px 14px;
      font-size: 12px;
      font-weight:400;
      color: #333333;
      border-bottom: 1px solid #F0F1F4;
    }

    .subclients-table tbody tr:hover {
      background: #f9f9f9;
    }

    .subclients-table tbody tr:last-child td {
      border-bottom: none;
    }

    /* Type Badges */
    .type-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 500;
    }

    .badge-business {
      background: #2A71A8;
      color: #ffffff;
    }
    .subclients-table {
  border-top: 1px solid #f0f1f4; /* adjust color & thickness */
  border-collapse: collapse;
}

    .badge-natural {
      background: #293681;
      color: #ffffff;
    }

    /* Pagination Footer */
    .pagination-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 16px;
      border-top: 1px solid #e0e0e0;
      background: #ffffff;
    }

    .pagination-left {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #666;
    }

    .pagination-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .page-number {
      font-size: 12px;
      color: #333;
      min-width: 25px;
      text-align: center;
    }
    ::ng-deep .page-size-select .mat-mdc-text-field-wrapper {
     
      height: 32px;
          // padding-top: 4px !important;
      
    }

    ::ng-deep .pagination-right .mat-mdc-icon-button {
      width: 32px;
      height: 32px;
      padding: 4px;
    }

    ::ng-deep .pagination-right .mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px; 
    }

    /* FAB Button */
    .add-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 56px;
      height: 56px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    ::ng-deep .add-fab .mat-icon {
      font-size: 24px;
      color:white;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .filters-row {
        flex-wrap: wrap;
      }

      .right-controls {
        margin-left: 0;
        width: 100%;
        justify-content: flex-end;
      }
    }

    @media (max-width: 768px) {
      .subclients-container {
        padding: 20px;
      }

      .filters-row {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-field,
      .search-field {
        width: 100%;
      }

      .right-controls {
        flex-direction: column;
      }

      .export-btn {
        width: 100%;
      }

      .table-wrapper {
        overflow-x: auto;
      }
      
      .subclients-table {
        min-width: 1000px;
      }
    }
  `]
})
export class SubclientsComponent {

  filters = {
    id: '',
    extKey: '',
    state: '',
    relationshipType: '',
    search: ''
  };

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  /** ORIGINAL DATA */
  subclients: Subclient[] = subclientsData;

  /** FILTERED DATA */
  filteredSubclients: Subclient[] = [];

  /** PAGINATED DATA */
  paginatedSubclients: Subclient[] = [];

  ngOnInit() {
    this.filteredSubclients = subclientsData;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredSubclients.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedSubclients = this.filteredSubclients.slice(startIndex, endIndex);
  }

  /** MAIN FILTER FUNCTION */
  applyFilters() {
    const s = this.filters.search.toLowerCase();

    this.filteredSubclients = this.subclients.filter(item => {
      return (
        (this.filters.id === '' || item.id === this.filters.id) &&
        (this.filters.extKey === '' || item.extKey.toLowerCase().includes(this.filters.extKey.toLowerCase())) &&
        (this.filters.state === '' || item.state === this.filters.state) &&
        (this.filters.relationshipType === '' ||
          item.relationshipType.toLowerCase() === this.filters.relationshipType.toLowerCase()
        ) &&
        (
          s === '' ||
          item.id.toLowerCase().includes(s) ||
          item.subClientName.toLowerCase().includes(s) ||
          item.company.toLowerCase().includes(s) ||
          item.extKey.toLowerCase().includes(s) ||
          item.relationshipType.toLowerCase().includes(s)
        )
      );
    });
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}

