import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const GET_BIDDING_BY_AOID_API = 'http://10.1.137.50:8768/getByAuctionObj/';

@Component({
  selector: 'app-pengumuman-bidding',
  templateUrl: './pengumuman-bidding.component.html',
  styleUrls: ['./pengumuman-bidding.component.css'],
})
export class PengumumanBiddingComponent implements OnInit {
  biddingData: any;
  biddingDataWinner: any;
  userData: any;

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private router: Router,
    private profile: ProfileService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getHistoryBid();
    this.getUserData();
  }

  getHistoryBid() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http
      .get<any>(GET_BIDDING_BY_AOID_API + id, this.httpOptions_base)
      .subscribe(
        (isi) => {
          this.biddingData = isi;
          this.biddingDataWinner = isi[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getUserData() {
    this.profile.getUserData().subscribe(
      (isi) => {
        // console.log(isi);
        this.userData = isi;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
