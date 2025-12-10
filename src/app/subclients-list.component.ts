
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
          <mat-select [(ngModel)]="filters.id" (ngModelChange)="applyFilters()">
            <mat-option value="">All</mat-option>
            <mat-option value="381433">381433</mat-option>
            <mat-option value="64499">64499</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Ext. Key</mat-label>
          <input matInput [(ngModel)]="filters.extKey" (ngModelChange)="applyFilters()">
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>State</mat-label>
          <mat-select [(ngModel)]="filters.state" (ngModelChange)="applyFilters()">
            <mat-option value="">All</mat-option>
            <mat-option value="active">Active</mat-option>
            <mat-option value="inactive">Inactive</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Relationship Type</mat-label>
          <mat-select [(ngModel)]="filters.relationshipType" (ngModelChange)="applyFilters()">
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
            <input matInput [(ngModel)]="filters.search" (ngModelChange)="applyFilters()">
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
            <tr *ngFor="let item of filteredSubclients">
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
              <mat-select [(ngModel)]="pageSize" (ngModelChange)="applyFilters()">
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
      padding: 30px 40px;
      background: #ffffff;
      min-height: 100vh;
    }

    /* Header */
    .page-header {
      margin-bottom: 30px;
    }

    h1 {
      font-size: 30px;
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
      color: #999;
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
      border: 1px solid #e0e0e0;
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
      border-bottom: 1px solid #e0e0e0;
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
      font-weight:500;
      color: #333333;
      border-bottom: 1px solid #f0f0f0;
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

    .badge-natural {
      background: #1976d2;
      color: #ffffff;
    }

    /* Pagination Footer */
    .pagination-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 16px;
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

  pageSize = 20;

  /** ORIGINAL DATA */
 subclients: Subclient[] = [
  {
    "id": "381433",
    "extKey": "XX XX XX 99 88",
    "subClientName": "Harry Chung",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "Quanta Pay LLC",
    "state": "active",
    "vaBalances": "$50.00"
  },
  {
    "id": "64499",
    "extKey": "XX XX XX 99 88",
    "subClientName": "Jane Sadwoman",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "FlyBit Pay LLC",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "381433",
    "extKey": "XX XX XX 99 88",
    "subClientName": "Alex Goodsman",
    "type": "Natural_Person",
    "relationshipType": "Affiliate",
    "company": "Nova Pay LLC",
    "state": "active",
    "vaBalances": "$50.00"
  },
  {
    "id": "64499",
    "extKey": "XX XX XX 99 88",
    "subClientName": "Kelsey Brittany",
    "type": "Business",
    "relationshipType": "Root",
    "company": "Movio Pay LLC",
    "state": "inactive",
    "vaBalances": "$50.00"
  },

  /* ============= 46 MORE RANDOM GENERATED SUBCLIENTS ============= */

  {
    "id": "128900",
    "extKey": "XX XX XX 23 11",
    "subClientName": "Michael Foster",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "Fintron Pay Inc",
    "state": "active",
    "vaBalances": "$120.00"
  },
  {
    "id": "560122",
    "extKey": "XX XX XX 55 22",
    "subClientName": "Sarah Green",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "PayNest Solutions",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "789441",
    "extKey": "XX XX XX 77 55",
    "subClientName": "David Brown",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "BrightPay LTD",
    "state": "active",
    "vaBalances": "$80.00"
  },
  {
    "id": "990122",
    "extKey": "XX XX XX 44 32",
    "subClientName": "Emily Watson",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "TransPay Corp",
    "state": "inactive",
    "vaBalances": "$30.00"
  },
  {
    "id": "110238",
    "extKey": "XX XX XX 21 90",
    "subClientName": "Chris Thompson",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "QuickFlow Pay LLC",
    "state": "active",
    "vaBalances": "$65.00"
  },
  {
    "id": "812399",
    "extKey": "XX XX XX 91 72",
    "subClientName": "Laura Smith",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "WavePay Industries",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "342091",
    "extKey": "XX XX XX 63 41",
    "subClientName": "Mark Johnson",
    "type": "Natural_Person",
    "relationshipType": "Affiliate",
    "company": "Zentra Money Corp",
    "state": "active",
    "vaBalances": "$19.00"
  },
  {
    "id": "903211",
    "extKey": "XX XX XX 76 90",
    "subClientName": "Olivia Benson",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "AlphaPay LLC",
    "state": "active",
    "vaBalances": "$210.00"
  },
  {
    "id": "488321",
    "extKey": "XX XX XX 48 48",
    "subClientName": "Sophia Turner",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "CrediPay Global",
    "state": "inactive",
    "vaBalances": "$10.00"
  },
  {
    "id": "192033",
    "extKey": "XX XX XX 84 22",
    "subClientName": "Daniel White",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "MezzoPay Pvt Ltd",
    "state": "active",
    "vaBalances": "$70.00"
  },
  {
    "id": "910122",
    "extKey": "XX XX XX 12 45",
    "subClientName": "Emma Davis",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "CrossPay Innovations",
    "state": "active",
    "vaBalances": "$55.00"
  },
  {
    "id": "229411",
    "extKey": "XX XX XX 55 91",
    "subClientName": "James Carter",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "FlowMatrix Corp",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "832910",
    "extKey": "XX XX XX 32 87",
    "subClientName": "Lucas Martin",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "SwiftMoney Services",
    "state": "active",
    "vaBalances": "$110.00"
  },
  {
    "id": "453091",
    "extKey": "XX XX XX 87 54",
    "subClientName": "Isabella King",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "RidgePay Systems",
    "state": "inactive",
       "vaBalances": "$40.00"
  },
  {
    "id": "203944",
    "extKey": "XX XX XX 29 12",
    "subClientName": "William Scott",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "UniPay Global",
    "state": "active",
    "vaBalances": "$95.00"
  },
  {
    "id": "673210",
    "extKey": "XX XX XX 73 10",
    "subClientName": "Lily Adams",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "HexaPay Networks",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "998123",
    "extKey": "XX XX XX 22 48",
    "subClientName": "Henry Clark",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "PulsePay Corp",
    "state": "active",
    "vaBalances": "$130.00"
  },
  {
    "id": "721033",
    "extKey": "XX XX XX 90 11",
    "subClientName": "Ava Lopez",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "GranitePay Inc",
    "state": "inactive",
    "vaBalances": "$22.00"
  },
  {
    "id": "550912",
    "extKey": "XX XX XX 44 77",
    "subClientName": "Ethan Walker",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "VantaPay Solutions",
    "state": "active",
    "vaBalances": "$90.00"
  },
  {
    "id": "744100",
    "extKey": "XX XX XX 33 66",
    "subClientName": "Chloe Hill",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "VaultPay Finance",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "600221",
    "extKey": "XX XX XX 93 28",
    "subClientName": "Jack Wilson",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "OrbitPay Group",
    "state": "active",
    "vaBalances": "$45.00"
  },
  {
    "id": "433892",
    "extKey": "XX XX XX 81 10",
    "subClientName": "Evelyn Perez",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "InfiniPay Services",
    "state": "inactive",
    "vaBalances": "$12.00"
  },
  {
    "id": "551002",
    "extKey": "XX XX XX 90 09",
    "subClientName": "Aaron Garcia",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "OmniPay Corp",
    "state": "active",
    "vaBalances": "$155.00"
  },
  {
    "id": "990432",
    "extKey": "XX XX XX 02 88",
    "subClientName": "Victoria Brooks",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "SkyPay Digital",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "889321",
    "extKey": "XX XX XX 12 66",
    "subClientName": "Andrew Martinez",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "UltraPay Systems",
    "state": "active",
    "vaBalances": "$102.00"
  },
  {
    "id": "233901",
    "extKey": "XX XX XX 22 19",
    "subClientName": "Grace Ramirez",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "ZenPay Industries",
    "state": "inactive",
    "vaBalances": "$16.00"
  },
  {
    "id": "432180",
    "extKey": "XX XX XX 71 91",
    "subClientName": "Benjamin Lewis",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "PentaPay Global",
    "state": "active",
    "vaBalances": "$62.00"
  },
  {
    "id": "618231",
    "extKey": "XX XX XX 88 18",
    "subClientName": "Mia Moore",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "EchoPay Network",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "289112",
    "extKey": "XX XX XX 51 14",
    "subClientName": "Leo Rivera",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "FleetPay Solutions",
    "state": "active",
    "vaBalances": "$115.00"
  },
  {
    "id": "199022",
    "extKey": "XX XX XX 93 87",
    "subClientName": "Scarlett Ward",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "PrimePay Fintech",
    "state": "inactive",
    "vaBalances": "$33.00"
  },
  {
    "id": "300198",
    "extKey": "XX XX XX 44 20",
    "subClientName": "Nathan Cooper",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "NeonPay Tech",
    "state": "active",
    "vaBalances": "$200.00"
  },
  {
    "id": "509922",
    "extKey": "XX XX XX 08 12",
    "subClientName": "Hannah Ortiz",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "OmegaPay Inc",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "711009",
    "extKey": "XX XX XX 22 00",
    "subClientName": "Ryan Howard",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "FusionPay Labs",
    "state": "active",
    "vaBalances": "$134.00"
  },
  {
    "id": "930221",
    "extKey": "XX XX XX 77 32",
    "subClientName": "Layla Morgan",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "LinkPay Digital",
    "state": "inactive",
    "vaBalances": "$27.00"
  },
  {
    "id": "600433",
    "extKey": "XX XX XX 11 50",
    "subClientName": "Jason Reed",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "CrystalPay Group",
    "state": "active",
    "vaBalances": "$84.00"
  },
  {
    "id": "491230",
    "extKey": "XX XX XX 65 89",
    "subClientName": "Aria Jenkins",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "BlueWave Pay",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "288190",
    "extKey": "XX XX XX 94 99",
    "subClientName": "Julian Foster",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "NextPay Tech Ltd",
    "state": "active",
    "vaBalances": "$108.00"
  },
  {
    "id": "920044",
    "extKey": "XX XX XX 73 19",
    "subClientName": "Zoey Simmons",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "NovaPay Digital",
    "state": "inactive",
    "vaBalances": "$19.00"
  },
  {
    "id": "782011",
    "extKey": "XX XX XX 42 31",
    "subClientName": "Gabriel Price",
    "type": "Business",
    "relationshipType": "Customer",
    "company": "VervePay Systems",
    "state": "active",
    "vaBalances": "$59.00"
  },
  {
    "id": "577010",
    "extKey": "XX XX XX 57 68",
    "subClientName": "Ellie Scott",
    "type": "Natural_Person",
    "relationshipType": "Beneficiary",
    "company": "FlowX Payment",
    "state": "inactive",
    "vaBalances": "NA"
  },
  {
    "id": "344900",
    "extKey": "XX XX XX 33 31",
    "subClientName": "Owen Mitchell",
    "type": "Business",
    "relationshipType": "Affiliate",
    "company": "JetPay Solutions",
    "state": "active",
    "vaBalances": "$125.00"
  },
  {
    "id": "921008",
    "extKey": "XX XX XX 12 56",
    "subClientName": "Aubrey Rivera",
    "type": "Natural_Person",
    "relationshipType": "Root",
    "company": "SunPay Corp",
    "state": "inactive",
    "vaBalances": "$20.00"
  }
];


  /** FILTERED DATA */
  filteredSubclients: Subclient[] = [];

  ngOnInit() {
    this.applyFilters();
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
  }
}
