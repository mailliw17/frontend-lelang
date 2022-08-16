import { Component, OnInit } from '@angular/core';
import { KtpService } from 'src/app/_services/ktp.service';
import { RekeningService } from 'src/app/_services/rekening.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NpwpService } from '../../_services/npwp.service';
import { Ktp } from '../index-profil/main-profil-ktp/ktp';
import { Npwp } from '../index-profil/main-profil-npwp/npwp';
import { Rekening } from '../index-profil/main-profil-rekening-bank/rekening';

@Component({
  selector: 'app-latest-properties',
  templateUrl: './latest-properties.component.html',
  styleUrls: ['./latest-properties.component.css']
})
export class LatestPropertiesComponent implements OnInit {

  imgUrl: string = "assets/img/property-6.jpg"
  isLoggedIn = false;
  ktpData!: Ktp;
  npwpData!: Npwp;
  rekeningData!: Rekening[];
  isKtpExist: boolean = false;
  isNpwpExist: boolean = false;
  isRekeningExist: boolean = false;

  constructor(
    private token: TokenStorageService,
    private ktp: KtpService,
    private npwp: NpwpService,
    private rekening: RekeningService
  ) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.getKtpData();
      this.getNpwpData();
      this.getRekeningData();
    }
  }

  getKtpData() {
    this.ktp.getKtpData(this.token.getUser().id).subscribe(
      (isi) => {
        this.ktpData = isi;
        this.isKtpExist = true;
        console.log(this.ktpData);
      }, err => {
        this.isKtpExist = false;
        console.log(this.isKtpExist);
      }
    );
  }

  getNpwpData() {
    this.npwp.getNpwpData(this.token.getUser().id).subscribe(
      (isi) => {
        this.npwpData = isi;
        this.isNpwpExist = true;
        console.log(this.npwpData);
      }, err => {
        this.isNpwpExist = false;
        console.log(this.isNpwpExist);
      }
    );
  }

  getRekeningData() {
    this.rekening.getRekeningData(this.token.getUser().id).subscribe(
      (isi) => {
        this.rekeningData = isi;
        this.isRekeningExist = true;
        console.log(this.rekeningData);
      }, err => {
        this.isRekeningExist = false;
        console.log(this.isRekeningExist);
      }
    );
  }

}
