import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dashboard-home">
      <h1>Welcome to Global Innovations Bank</h1>
      <p class="subtitle">Your comprehensive banking dashboard</p>

      <div class="quick-actions">
        <mat-card class="action-card" (click)="navigateTo('/dashboard/bank')">
          <mat-card-header>
            <mat-icon mat-card-avatar>account_balance</mat-icon>
            <mat-card-title>Bank Details</mat-card-title>
            <mat-card-subtitle>View bank information</mat-card-subtitle>
          </mat-card-header>
        </mat-card>

        <mat-card class="action-card" (click)="navigateTo('/dashboard/sub-clients')">
          <mat-card-header>
            <mat-icon mat-card-avatar>group</mat-icon>
            <mat-card-title>Sub Clients</mat-card-title>
            <mat-card-subtitle>Manage subclients</mat-card-subtitle>
          </mat-card-header>
        </mat-card>

        <mat-card class="action-card" (click)="navigateTo('/dashboard/create-subclients')">
          <mat-card-header>
            <mat-icon mat-card-avatar>person_add</mat-icon>
            <mat-card-title>Create Subclient</mat-card-title>
            <mat-card-subtitle>Add new subclient</mat-card-subtitle>
          </mat-card-header>
        </mat-card>

        <mat-card class="action-card" (click)="navigateTo('/dashboard/transactions')">
          <mat-card-header>
            <mat-icon mat-card-avatar>receipt_long</mat-icon>
            <mat-card-title>Transactions</mat-card-title>
            <mat-card-subtitle>View all transactions</mat-card-subtitle>
          </mat-card-header>
        </mat-card>
      </div>

      <div class="stats-section">
        <h2>Overview</h2>
        <div class="stats-grid">
          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>account_balance_wallet</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Total Balance</h3>
                <p class="stat-value">$125,450.00</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>trending_up</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Total Transactions</h3>
                <p class="stat-value">1,234</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>group</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Active Clients</h3>
                <p class="stat-value">567</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="stat-card">
            <mat-card-content>
              <div class="stat-icon">
                <mat-icon>schedule</mat-icon>
              </div>
              <div class="stat-info">
                <h3>Pending Tasks</h3>
                <p class="stat-value">23</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-home {
      max-width: 1400px;
      margin: 40px auto;
    }

    h1 {
      font-size: 32px;
      font-weight: 400;
      margin: 0 0 8px 0;
      color: #333;
    }

    .subtitle {
      font-size: 16px;
      color: #666;
      margin: 0 0 40px 0;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .action-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .action-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #1976d2;
    }

    .stats-section h2 {
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 24px 0;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .stat-icon {
      width: 56px;
      height: 56px;
      background: #e3f2fd;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1976d2;
    }

    .stat-info h3 {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      margin: 0 0 8px 0;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
