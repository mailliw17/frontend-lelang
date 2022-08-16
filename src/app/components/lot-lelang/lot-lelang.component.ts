import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

// for faster development
const GET_ALL_API = 'http://10.1.137.50:8766/getAllUser';

@Component({
  selector: 'app-lot-lelang',
  templateUrl: './lot-lelang.component.html',
  styleUrls: ['./lot-lelang.component.css'],
})
export class LotLelangComponent implements OnInit {
  dataAuctionObject: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.http.get<any>(GET_ALL_API).subscribe(
      (isi) => {
        console.log(isi);
        this.dataAuctionObject = isi.content;
        // console.log(this.dataAuctionObject);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
