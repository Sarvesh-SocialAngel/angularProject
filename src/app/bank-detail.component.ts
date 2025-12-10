import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

interface BeneficialOwner {
  name: string;
  prong: string;
  icon?: string;
}

interface Account {
  name: string;
  type: string;
  balance: number;
  starred: boolean;
}

@Component({
  selector: 'app-bank-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <header class="header">
        <button mat-icon-button routerLink="/">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Global Innovation Bank</h1>
        <button mat-button class="archive-btn">
          <mat-icon>archive</mat-icon>
          Archive
        </button>
      </header>

      <div class="content-grid">
        <div class="main-content">
          <!-- Beneficial Owners Section -->
          <section class="section">
            <div class="section-header">
              <h2>Beneficial Owners</h2>
              <button mat-icon-button>
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Prong</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let owner of beneficialOwners">
                  <td>
                    <span class="status-dot"></span>
                    {{ owner.name }}
                  </td>
                  <td>{{ owner.prong }}</td>
                  <td>
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                      <mat-icon>more_horiz</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                      <button mat-menu-item>Edit</button>
                      <button mat-menu-item>Delete</button>
                    </mat-menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- Sub Transactions Section -->
          <section class="section">
            <div class="section-header">
              <h2>Sub Transactions</h2>
              <span class="hint-text">
                <mat-icon class="hint-icon">auto_awesome</mat-icon>
                Click to go to separate page, filtered for party
              </span>
            </div>
          </section>

          <!-- Accounts Section -->
          <section class="section">
            <div class="section-header">
              <h2>Accounts</h2>
              <button mat-icon-button>
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Accounts Name</th>
                  <th>Type</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let account of accounts">
                  <td>
                    <mat-icon class="star-icon" [class.starred]="account.starred">
                      {{ account.starred ? 'star' : 'star_border' }}
                    </mat-icon>
                    {{ account.name }}
                  </td>
                  <td>{{ account.type }}</td>
                  <td>{{ account.balance | currency }}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- Documents Section -->
          <section class="section">
            <div class="section-header">
              <h2>Documents</h2>
              <button mat-icon-button>
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <div class="no-documents">
              <mat-icon class="document-icon">folder_open</mat-icon>
              <div>
                <h3>No Documents</h3>
                <p>You can add important documents affiliated with this entity.</p>
              </div>
            </div>
          </section>
        </div>

        <!-- Summary Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <h3>Summary</h3>
            <button mat-icon-button>
              <mat-icon>edit</mat-icon>
            </button>
          </div>
          
          <div class="summary-content">
            <div class="summary-item">
              <label>Entity Type</label>
              <mat-chip-listbox>
                <mat-chip>
                  <mat-icon matChipAvatar>business</mat-icon>
                  Buiseness
                </mat-chip>
              </mat-chip-listbox>
            </div>

            <div class="summary-item">
              <label>Entity Type</label>
              <p>Global Innovation Bank</p>
            </div>

            <div class="summary-item">
              <label>Taxpayer Identification Number</label>
              <p>00-0000000</p>
            </div>

            <div class="summary-item">
              <label>Address</label>
              <p>Plot No., District, State</p>
            </div>

            <div class="summary-item">
              <label>Industry Code</label>
              <p class="code-value">00 00+</p>
            </div>

            <div class="summary-item">
              <label>Incorporation State</label>
              <p>MN</p>
            </div>

            <div class="summary-item">
              <label>Website</label>
              <a href="http://www.gibank.com" target="_blank">http: // www.gibank.com</a>
            </div>

            <div class="summary-item">
              <label>Risk Rating</label>
              <p>Not Provided</p>
            </div>

            <div class="summary-item">
              <label>Created at</label>
              <p>Nov 01, 2025, 3:16:36 PM PST</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      background: #f5f5f5;
      font-family: 'Roboto', sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 48px;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      gap: 24px;
    }

    .header h1 {
      font-size: 24px;
      font-weight: 400;
      margin: 0;
      color: #333;
      flex: 1;
    }

    .archive-btn {
      color: #d32f2f;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 0;
      padding: 24px 48px;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-right: 24px;
    }

    .section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header h2 {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      color: #333;
    }

    .hint-text {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #999;
      font-size: 14px;
    }

    .hint-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      text-align: left;
      padding: 12px 16px;
      font-weight: 500;
      color: #666;
      font-size: 14px;
      border-bottom: 1px solid #e0e0e0;
    }

    .data-table td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }

    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4caf50;
      margin-right: 12px;
    }

    .star-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #ccc;
      margin-right: 8px;
      vertical-align: middle;
    }

    .star-icon.starred {
      color: #ffd700;
    }

    .no-documents {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 32px;
      background: #fafafa;
      border-radius: 8px;
    }

    .document-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #999;
    }

    .no-documents h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .no-documents p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }

    .sidebar {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .sidebar-header h3 {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      color: #333;
    }

    .summary-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .summary-item label {
      display: block;
      font-size: 12px;
      color: #999;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .summary-item p {
      margin: 0;
      color: #333;
      font-size: 14px;
    }

    .summary-item a {
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
    }

    .summary-item a:hover {
      text-decoration: underline;
    }

    .code-value {
      font-family: 'Courier New', monospace;
    }

    mat-chip-listbox {
      margin: 0;
    }

    mat-chip {
      background: #f5f5f5 !important;
    }
  `]
})
export class BankDetailComponent {
  beneficialOwners: BeneficialOwner[] = [
    { name: 'David Hales (CEO)', prong: 'Control' },
    { name: 'David Hales', prong: 'Ownership' },
    { name: 'Joseph Plott', prong: 'Ownership' }
  ];

  accounts: Account[] = [
    { name: 'Increase Canary', type: 'Natural_Person', balance: 100.00, starred: false },
    { name: 'Default Account', type: 'Natural_Person', balance: 0.00, starred: false }
  ];
}
