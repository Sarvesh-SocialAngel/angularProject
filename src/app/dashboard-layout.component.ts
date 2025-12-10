import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-sidenav-container class="sidenav-container" [hasBackdrop]="isMobile">
        <!-- Sidebar -->
        <mat-sidenav 
          #drawer
          [mode]="sidenavMode" 
          [opened]="!isMobile"
          class="sidebar"
          [class.mini]="isTablet && !drawer.opened">
          
          <!-- Logo Section -->
          <div class="logo" [class.mini]="isTablet && !drawer.opened">
            <div class="logo-container">
             
                <img src="/logo.png" alt="Logo" width="140" height="40" />
              
            </div>
          </div>

          <!-- Navigation Content -->
          <div class="nav-content">
            <!-- Overview Section -->
            <div class="nav-section">
              <!-- <div class="nav-label" *ngIf="!isTablet || drawer.opened">OVERVIEW</div> -->
              <mat-nav-list>
                <a mat-list-item 
                   routerLink="/dashboard" 
                   routerLinkActive="active" 
                   [routerLinkActiveOptions]="{exact: true}"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Dashboard' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>dashboard</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Dashboard</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/tasks" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Tasks' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>assignment</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Tasks</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/transactions" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Transactions' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>receipt_long</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Transactions</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/sub-clients" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Sub Clients' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>group</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Sub Clients</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/profile" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Accounts' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>account_circle</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Accounts</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/settings" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Settings' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>settings</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Settings</span>
                </a>
              </mat-nav-list>
            </div>

            <!-- Transactions Section -->
            <!-- <div class="nav-section">
              <div class="nav-label" *ngIf="!isTablet || drawer.opened">TRANSACTIONS & BATCHES</div>
              <mat-nav-list>
                <a mat-list-item 
                   routerLink="/dashboard/transactions" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Transactions' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>receipt_long</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Transactions</span>
                </a>
              </mat-nav-list>
            </div> -->

            <!-- Subledger Section -->
            <!-- <div class="nav-section">
              <div class="nav-label" *ngIf="!isTablet || drawer.opened">SUBLEDGER</div>
              <mat-nav-list>
                <a mat-list-item 
                   routerLink="/dashboard/sub-clients" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Sub Clients' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>group</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Sub Clients</span>
                </a>
              </mat-nav-list>
            </div> -->

            <!-- Settings Section -->
            <!-- <div class="nav-section">
              <mat-nav-list>
                <a mat-list-item 
                   routerLink="/dashboard/profile" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Accounts' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>account_circle</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Accounts</span>
                </a>
                <a mat-list-item 
                   routerLink="/dashboard/settings" 
                   routerLinkActive="active"
                   [matTooltip]="(isTablet && !drawer.opened) ? 'Settings' : ''"
                   matTooltipPosition="right"
                   (click)="onMenuItemClick()">
                  <mat-icon matListItemIcon>settings</mat-icon>
                  <span matListItemTitle *ngIf="!isTablet || drawer.opened">Settings</span>
                </a>
              </mat-nav-list>
            </div> -->
          </div>

          <!-- Footer -->
          <div class="sidebar-footer" *ngIf="!isTablet || drawer.opened">
            <div class="footer-text">Services Provided by</div>
            <div class="footer-company">Global Innovations Bank,</div>
            <div class="footer-text">Member FDIC</div>
            <div class="footer-links">
              <a href="#">Trust Center</a> | <a href="#">Privacy Notice</a>
            </div>
          </div>

          <!-- Mini Footer -->
          <div class="sidebar-footer-mini" *ngIf="isTablet && !drawer.opened">
            <mat-icon>info</mat-icon>
          </div>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content>
          <!-- Top Bar -->
          <mat-toolbar class="top-bar">
            <button mat-icon-button 
                    (click)="drawer.toggle()" 
                    class="menu-toggle">
              <mat-icon>{{ drawer.opened ? 'menu_open' : 'menu' }}</mat-icon>
            </button>
            
            <span class="spacer"></span>
            
            <div class="top-bar-actions">
              <button mat-icon-button class="icon-btn">
                <mat-icon>search</mat-icon>
              </button>
              <button mat-icon-button class="icon-btn" [matBadge]="3" matBadgeColor="warn" matBadgeSize="small">
                <mat-icon>notifications_none</mat-icon>
              </button>
              <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-btn">
                <div class="avatar">A</div>
               
                <mat-icon>expand_more</mat-icon>
              </button>
            </div>
          </mat-toolbar>

          <mat-menu #userMenu="matMenu" class="user-menu">
            <div class="user-menu-header">
              <div class="avatar large">A</div>
              <div class="user-info">
                <div class="user-name-large">Alex</div>
                <div class="user-email">alex@globalbank.com</div>
              </div>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>

          <!-- Page Content -->
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
      font-family: Montserrat;
    }

    .sidenav-container {
      height: 100%;
      background: #f5f7fa;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 280px;
      border-right: 1px solid #e0e0e0;
      background: white;
      display: flex;
      flex-direction: column;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: visible;
    }

    .sidebar.mini {
      width: 72px;
    }

    /* Logo Styles */
    .logo {
      padding: 11px 24px;
      border-bottom: 1px solid #f0f0f0;
      transition: padding 0.3s;
    }

    .logo.mini {
      padding: 20px 16px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1.3;
      overflow: hidden;
    }

    .logo-title {
      font-size: 16px;
      font-weight: 700;
      color: #1976d2;
      text-transform: lowercase;
    }

    .logo-subtitle {
      font-size: 12px;
      font-weight: 500;
      color: #424242;
      text-transform: lowercase;
    }

    /* Navigation Styles */
    .nav-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 0;
      background-color: #fbfcfd;
    }

    .nav-content::-webkit-scrollbar {
      width: 6px;
    }
    
   ::ng-deep .mat-mdc-list-item.active {
    // /* background: linear-gradient(90deg, #e3f2fd 0%, transparent 100%) !important; */
    background:#f3f4f7 !important;
    color: #022d84 !important;
    border-left: 3px solid #1976d2;
    font-weight: 700;
}

    .nav-content::-webkit-scrollbar-thumb {
      background: #e0e0e0;
      border-radius: 3px;
    }

    .nav-section {
      margin-bottom: 24px;
    }

    .nav-label {
      font-size: 11px;
      font-weight: 600;
      color: #9e9e9e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 24px 8px;
      white-space: nowrap;
      overflow: hidden;
    }

    /* List Item Styles */
    ::ng-deep .mat-mdc-list-item {
      height: 48px !important;
      color: #616161 !important;
      border-radius: 0 !important;
      transition: all 0.2s;
    }

    ::ng-deep .sidebar.mini .mat-mdc-list-item {
      justify-content: center;
    }

    ::ng-deep .mat-mdc-list-item:hover {
      background: #f5f5f5 !important;
    }

    ::ng-deep .mat-mdc-list-item.active {
      background: #f3f4f7;
      color: #022d84 !important;
      border-left: 3px solid #1976d2;
      font-weight: 500;
    }

    ::ng-deep .mat-mdc-list-item.active .mat-icon {
      color: #022d84 !important;
    }

    ::ng-deep .mat-mdc-list-item .mat-icon {
      color: #9e9e9e !important;
      margin-right: 16px !important;
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    ::ng-deep .sidebar.mini .mat-mdc-list-item .mat-icon {
      margin-right: 0 !important;
    }

    ::ng-deep .mat-drawer-inner-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

    /* Footer Styles */
    .sidebar-footer {
      margin-top: auto;
      padding: 20px 24px;
      font-size: 11px;
      color: #9e9e9e;
      border-top: 1px solid #f0f0f0;
      background: #fafafa;
    }

    .sidebar-footer-mini {
      margin-top: auto;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
      background: #fafafa;
    }

    .sidebar-footer-mini mat-icon {
      color: #9e9e9e;
    }

    .footer-text {
      margin-bottom: 2px;
    }

    .footer-company {
      font-weight: 600;
      color: #616161;
      margin-bottom: 2px;
    }

    .footer-links {
      margin-top: 8px;
    }

    .footer-links a {
      color: #1976d2;
      text-decoration: none;
      font-size: 11px;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    /* Top Bar Styles */
    .top-bar {
      background: white;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      z-index: 10;
      padding: 0 16px;
      height: 64px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .menu-toggle {
      margin-right: 8px;
    }

    .spacer {
      flex: 1;
    }

    .top-bar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-btn {
      color: #616161;
    }

    .user-menu-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 24px;
      transition: background 0.2s;
    }

    .user-menu-btn:hover {
      background: #f5f5f5;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .avatar.large {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    .user-name {
      font-size: 14px;
      font-weight: 500;
      color: #424242;
    }

    /* User Menu */
    .user-menu-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }

    .user-info {
      flex: 1;
    }

    .user-name-large {
      font-size: 16px;
      font-weight: 600;
      color: #212121;
    }

    .user-email {
      font-size: 13px;
      color: #757575;
    }

    /* Page Content */
    .page-content {
    
      margin: 0 auto;
      animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Tablet - Mini Sidebar */
    @media (min-width: 768px) and (max-width: 1024px) {
      .sidebar:not(.mat-drawer-opened) {
        width: 72px;
      }
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .page-content {
        padding: 16px;
      }

      .top-bar {
        padding: 0 8px;
        height: 56px;
      }

      .user-name {
        display: none;
      }
    }

    @media (max-width: 599px) {
      .sidebar {
        width: 280px;
      }

      .top-bar {
        height: 56px;
      }

      .page-content {
        padding: 12px;
      }
    }
  `]
})
export class DashboardLayoutComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  
  isMobile = false;
  isTablet = false;
  sidenavMode: 'side' | 'over' = 'side';

  constructor(private breakpointObserver: BreakpointObserver) {
    // Mobile detection
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
        this.updateSidenavMode();
        
        // Auto-open on desktop, auto-close on mobile
        if (this.drawer) {
          if (this.isMobile) {
            this.drawer.close();
          } else {
            this.drawer.open();
          }
        }
      });

    // Tablet detection
    this.breakpointObserver.observe(['(min-width: 768px) and (max-width: 1024px)'])
      .subscribe(result => {
        this.isTablet = result.matches;
        this.updateSidenavMode();
        
        // Keep open on tablet/desktop
        if (this.drawer && !this.isMobile) {
          this.drawer.open();
        }
      });
  }

  private updateSidenavMode() {
    this.sidenavMode = this.isMobile ? 'over' : 'side';
  }
  
  ngAfterViewInit() {
    // Ensure correct initial state after view loads
    setTimeout(() => {
      if (this.drawer) {
        if (this.isMobile) {
          this.drawer.close();
        } else {
          this.drawer.open();
        }
      }
    }, 0);
  }
  
  onMenuItemClick() {
    // Close drawer on mobile when menu item is clicked
    if (this.isMobile && this.drawer) {
      this.drawer.close();
    }
  }
}