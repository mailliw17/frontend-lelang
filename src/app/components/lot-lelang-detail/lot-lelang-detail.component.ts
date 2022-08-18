import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailInfoPenjualComponent } from '../dialog/detail-info-penjual/detail-info-penjual.component';
import { DetailInfoPenyelenggaraComponent } from '../dialog/detail-info-penyelenggara/detail-info-penyelenggara.component';
import { DetailLampiranComponent } from '../dialog/detail-lampiran/detail-lampiran.component';

const GET_DETAIL_API = 'http://10.1.137.50:8766/get/';

@Component({
  selector: 'app-lot-lelang-detail',
  templateUrl: './lot-lelang-detail.component.html',
  styleUrls: ['./lot-lelang-detail.component.css'],
})
export class LotLelangDetailComponent implements OnInit {
  detailDataAuctionObject: any = {};

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  openDialogLampiran() {
    this.dialog.open(DetailLampiranComponent);
  }

  openDialogInfoPenjual() {
    this.dialog.open(DetailInfoPenjualComponent);
  }

  openDialogInfoPenyelenggara() {
    this.dialog.open(DetailInfoPenyelenggaraComponent);
  }

  ngOnInit(): void {
    this.getDetailData();
  }

  getDetailData() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(GET_DETAIL_API + id).subscribe(
      (isi) => {
        console.log(isi);
        this.detailDataAuctionObject = isi;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
