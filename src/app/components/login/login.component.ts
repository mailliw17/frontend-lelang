import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NavbarComponent } from '../navbar/navbar.component';

const GET_PROFILE = 'http://10.1.137.50:8760/user/v1/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userData: any;
  currentUser: any;

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private router: Router,
    private http: HttpClient // private navbar: NavbarComponent
  ) {}

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        // menyimpan access_token di session storage
        this.token.saveToken(data.access_token);
        this.token.saveRefreshToken(data.refresh_token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
