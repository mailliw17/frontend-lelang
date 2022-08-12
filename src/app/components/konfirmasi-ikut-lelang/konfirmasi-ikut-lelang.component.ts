import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const GET_DETAIL_API = 'http://10.1.137.220:8766/get/';
const GET_KTP_API = 'http://10.1.137.50:8761/ktp/user/';
const GET_NPWP_API = 'http://10.1.137.50:8761/npwp/user/';
const CREATE_VA_API = 'http://10.1.137.220:8772/create';
const GET_REKENING_DATA_API = 'http://10.1.137.50:8761/rekening/user/';

@Component({
  selector: 'app-konfirmasi-ikut-lelang',
  templateUrl: './konfirmasi-ikut-lelang.component.html',
  styleUrls: ['./konfirmasi-ikut-lelang.component.css'],
})
export class KonfirmasiIkutLelangComponent implements OnInit {
  disabledButton = false;
  isLoggedIn = false;
  detailDataAuctionObject: any = {};
  valueAuctionObject: any;
  dataKtp: any = {};
  dataNpwp: any = {};
  dataRekening: any = {};
  vaForm: any;

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // cara tau user sudah login atau belum
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.getDetailData();
      this.getKtpData();
      this.getNpwpData();
      this.getRekeningData();
    }
  }

  getDetailData() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(GET_DETAIL_API + id).subscribe(
      (isi) => {
        // console.log(isi);
        this.detailDataAuctionObject = isi;
        this.valueAuctionObject = isi.collateralQuantity;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getKtpData() {
    const user = this.token.getUser();
    this.http.get<any>(GET_KTP_API + user.id, this.httpOptions_base).subscribe(
      (isi) => {
        this.dataKtp = isi;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNpwpData() {
    const user = this.token.getUser();
    this.http.get<any>(GET_NPWP_API + user.id, this.httpOptions_base).subscribe(
      (isi) => {
        this.dataNpwp = isi;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getRekeningData() {
    const user = this.token.getUser();
    this.http
      .get<any>(GET_REKENING_DATA_API + user.id, this.httpOptions_base)
      .subscribe(
        (isi) => {
          // console.log(isi[0]);
          // pakai index karena dari BE dikasih array bukan lgsg object
          this.dataRekening = isi[0];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  createVirtualAccount() {
    const user = this.token.getUser();
    this.vaForm = {
      userId: user.id,
      value: this.valueAuctionObject,
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
        }
      );
  }
}
