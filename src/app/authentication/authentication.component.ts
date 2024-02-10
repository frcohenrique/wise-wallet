import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private readonly authService: AuthenticationService) {}

  ngOnInit(): void {}
}
