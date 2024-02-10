import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wise-wallet';
  showHeader: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/authentication/login']);
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.showHeader = isAuthenticated;
    });
  }
}
