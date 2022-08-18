import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/_services/profile.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const GET_BIDDING_BY_AOID_API = 'http://10.1.137.50:8768/getByAuctionObj/';
const GET_DETAIL_API = 'http://10.1.137.50:8766/get/';
const CREATE_VA_API = 'http://10.1.137.50:8772/create';

@Component({
  selector: 'app-pengumuman-bidding',
  templateUrl: './pengumuman-bidding.component.html',
  styleUrls: ['./pengumuman-bidding.component.css'],
})
export class PengumumanBiddingComponent implements OnInit {
  biddingData: any;
  biddingDataWinner: any;
  userData: any;
  vaForm: any;
  idAuctionObject: any;
  dpAuctionObject: any;

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
    this.getDataAO();
  }

  getHistoryBid() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http
      .get<any>(GET_BIDDING_BY_AOID_API + id, this.httpOptions_base)
      .subscribe(
        (isi) => {
          this.biddingData = isi;
          this.biddingDataWinner = isi[0];
          // console.log(this.biddingDataWinner);
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

  getDataAO() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(GET_DETAIL_API + id).subscribe(
      (isi) => {
        // console.log(isi);
        this.idAuctionObject = isi.id;
        this.dpAuctionObject = isi.collateralQuantity;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createVirtualAccount() {
    const user = this.token.getUser();
    const biayaPelunasan = this.biddingDataWinner.value - this.dpAuctionObject;
    this.vaForm = {
      auctionobjectId: this.idAuctionObject,
      userId: user.id,
      value: biayaPelunasan,
    };

    // console.log(this.vaForm);
    this.http
      .post<any>(CREATE_VA_API, this.vaForm, this.httpOptions_base)
      .subscribe(
        (isi) => {
          alert('Sukses membuat transaksi');
          this.router.navigate(['status-lelang']);
        },
        (err) => {
          console.log(err);
          alert(
            'Kamu sudah pernah melakukan booking lot lelang ini sebelumnya !'
          );
          this.router.navigate(['/status-lelang']);
        }
      );
  }
}
