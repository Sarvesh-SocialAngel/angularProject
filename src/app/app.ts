import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css'
})
export class App {}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class HomeComponent {
  protected readonly title = signal('my-app');

  constructor(private router: Router) {}

  navigateToBank() {
    this.router.navigate(['/bank']);
  }
}
