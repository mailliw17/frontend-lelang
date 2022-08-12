import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  isLoggedIn = false;

  constructor(
    private token: TokenStorageService,
    private router: Router,
    private profile: ProfileService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const tok = this.token.getToken();
    // console.log(tok);
    if (tok) {
      this.getDataUser();
      // window.location.reload();
      // break;
    }
  }

  getDataUser() {
    this.profile.getUserData().subscribe(
      (isi) => {
        // window.location.reload();
        this.token.saveUser(isi);
        this.currentUser = this.token.getUser();
        if (this.currentUser) {
          this.isLoggedIn = true;
        }
      },
      (err) => {
        console.log('gapapa belum login');
        console.log(err);
      }
    );
  }

  logout(): void {
    this.auth.logout().subscribe(
      (isi) => {
        this.token.signOut();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
