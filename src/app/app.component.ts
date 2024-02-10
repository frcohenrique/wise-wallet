import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wise-wallet';
  showHeader: boolean = false;

  public currentUser: [] | any = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private readonly dataService: DataService
  ) {}

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/authentication/login']);
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.showHeader = isAuthenticated;
      this.authService.getCurrentUser().subscribe((currentUser: any) => {
        this.dataService.setCurrentUserId(currentUser?.uid);
        this.currentUser = currentUser;
      });
    });
  }
}
