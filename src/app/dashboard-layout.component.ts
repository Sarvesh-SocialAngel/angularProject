import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened class="sidebar">
          <div class="logo">
            <img src="https://via.placeholder.com/150x40/1976d2/ffffff?text=GIB" alt="Global Innovations Bank">
          </div>

          <div class="nav-section">
            <div class="nav-label">Overview</div>
            <mat-nav-list>
              <a mat-list-item routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <mat-icon matListItemIcon>dashboard</mat-icon>
                <span matListItemTitle>Dashboard</span>
              </a>
              <a mat-list-item routerLink="/dashboard/tasks" routerLinkActive="active">
                <mat-icon matListItemIcon>assignment</mat-icon>
                <span matListItemTitle>Tasks</span>
              </a>
            </mat-nav-list>
          </div>

          <div class="nav-section">
            <div class="nav-label">Transactions & Batches</div>
            <mat-nav-list>
              <a mat-list-item routerLink="/dashboard/batches" routerLinkActive="active">
                <mat-icon matListItemIcon>science</mat-icon>
                <span matListItemTitle>Batches</span>
              </a>
              <a mat-list-item routerLink="/dashboard/transactions" routerLinkActive="active">
                <mat-icon matListItemIcon>receipt_long</mat-icon>
                <span matListItemTitle>Transactions</span>
              </a>
            </mat-nav-list>
          </div>

          <div class="nav-section">
            <div class="nav-label">Subledger</div>
            <mat-nav-list>
              <a mat-list-item routerLink="/dashboard/sub-transactions" routerLinkActive="active">
                <mat-icon matListItemIcon>sync_alt</mat-icon>
                <span matListItemTitle>Sub Transactions</span>
              </a>
              <a mat-list-item routerLink="/dashboard/sub-clients" routerLinkActive="active">
                <mat-icon matListItemIcon>group</mat-icon>
                <span matListItemTitle>Sub Clients</span>
              </a>
            </mat-nav-list>
          </div>

          <div class="nav-section">
            <mat-nav-list>
              <a mat-list-item routerLink="/dashboard/profile" routerLinkActive="active">
                <mat-icon matListItemIcon>account_circle</mat-icon>
                <span matListItemTitle>Profile</span>
              </a>
              <a mat-list-item routerLink="/dashboard/developers" routerLinkActive="active">
                <mat-icon matListItemIcon>code</mat-icon>
                <span matListItemTitle>Developers</span>
              </a>
              <a mat-list-item routerLink="/dashboard/settings" routerLinkActive="active">
                <mat-icon matListItemIcon>settings</mat-icon>
                <span matListItemTitle>Settings</span>
              </a>
              <a mat-list-item routerLink="/dashboard/tickets" routerLinkActive="active">
                <mat-icon matListItemIcon>confirmation_number</mat-icon>
                <span matListItemTitle>Raise Tickets</span>
              </a>
              <a mat-list-item routerLink="/dashboard/support" routerLinkActive="active">
                <mat-icon matListItemIcon>help_outline</mat-icon>
                <span matListItemTitle>Help & Support</span>
              </a>
            </mat-nav-list>
          </div>

          <div class="sidebar-footer">
            <div class="footer-text">Services Provided by</div>
            <div class="footer-company">Global Innovations Bank,</div>
            <div class="footer-text">Member FDIC</div>
            <div class="footer-links">
              <a href="#">Trust Center</a> | <a href="#">Privacy Notice</a>
            </div>
          </div>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="top-bar">
            <div class="top-bar-left">
              <button mat-icon-button>
                <mat-icon>notifications_none</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>event</mat-icon>
              </button>
              <span class="date">Nov 11</span>
              <button mat-icon-button>
                <mat-icon>tune</mat-icon>
              </button>
              <span class="test-label">Test</span>
            </div>
            <div class="top-bar-right">
              <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-btn">
                <div class="avatar">A</div>
                <span>Alex</span>
                <mat-icon>expand_more</mat-icon>
              </button>
              <mat-menu #userMenu="matMenu">
                <button mat-menu-item>Profile</button>
                <button mat-menu-item>Settings</button>
                <button mat-menu-item>Logout</button>
              </mat-menu>
            </div>
          </div>

          <div class="page-content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
      overflow: hidden;
    }

    .sidenav-container {
      height: 100%;
    }

    .sidebar {
      width: 260px;
      border-right: 1px solid #e0e0e0;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .logo {
      padding: 20px 24px;
      border-bottom: 1px solid #e0e0e0;
    }

    .logo img {
      width: 150px;
      height: auto;
    }

    .nav-section {
      padding: 16px 0;
    }

    .nav-label {
      font-size: 11px;
      font-weight: 600;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 8px 24px;
    }

    ::ng-deep .mat-mdc-list-item {
      height: 48px !important;
      color: #666 !important;
    }

    ::ng-deep .mat-mdc-list-item:hover {
      background: #f0f0f0 !important;
    }

    ::ng-deep .mat-mdc-list-item.active {
      background: #e3f2fd !important;
      color: #1976d2 !important;
    }

    ::ng-deep .mat-mdc-list-item.active .mat-icon {
      color: #1976d2 !important;
    }

    ::ng-deep .mat-mdc-list-item .mat-icon {
      color: #999 !important;
      margin-right: 16px !important;
    }

    .sidebar-footer {
      margin-top: auto;
      padding: 24px;
      font-size: 11px;
      color: #999;
      border-top: 1px solid #e0e0e0;
    }

    .footer-text {
      margin-bottom: 4px;
    }

    .footer-company {
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }

    .footer-links {
      margin-top: 8px;
    }

    .footer-links a {
      color: #1976d2;
      text-decoration: none;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      background: white;
      border-bottom: 1px solid #e0e0e0;
    }

    .top-bar-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .top-bar-right {
      display: flex;
      align-items: center;
    }

    .date {
      font-size: 14px;
      color: #666;
    }

    .test-label {
      font-size: 14px;
      color: #666;
    }

    .user-menu-btn {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #1976d2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }

    .page-content {
      padding: 32px 48px;
      background: #fafafa;
      min-height: calc(100vh - 64px);
      overflow-y: auto;
    }
  `]
})
export class DashboardLayoutComponent {}
