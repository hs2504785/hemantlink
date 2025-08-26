import { Component } from '@angular/core';
import { ProfileComponent } from './features/profile/profile.component';
import { LinksComponent } from './features/links/links.component';
import { ThemeToggleComponent } from './shared/ui/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileComponent, LinksComponent, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Simple app component - all data comes from config
}
