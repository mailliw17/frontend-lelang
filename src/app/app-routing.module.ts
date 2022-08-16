import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LotLelangDetailComponent } from './components/lot-lelang-detail/lot-lelang-detail.component';
import { LotLelangComponent } from './components/lot-lelang/lot-lelang.component';
import { LupaPasswordComponent } from './components/lupa-password/lupa-password.component';
import { ProfilComponent } from './components/index-profil/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { KonfirmasiIkutLelangComponent } from './components/konfirmasi-ikut-lelang/konfirmasi-ikut-lelang.component';
import { DetailStatusLelangComponent } from './components/detail-status-lelang/detail-status-lelang.component';
import { SyaratDanKetentuanComponent } from './components/syarat-dan-ketentuan/syarat-dan-ketentuan.component';
import { FaqComponent } from './components/faq/faq.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { PengumumanBiddingComponent } from './components/pengumuman-bidding/pengumuman-bidding.component';
import { KonfirmasiPembayaranJaminanComponent } from './components/konfirmasi-pembayaran-jaminan/konfirmasi-pembayaran-jaminan.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'lot-lelang',
    component: LotLelangComponent,
  },
  {
    path: 'lot-lelang/detail/:id',
    component: LotLelangDetailComponent,
  },
  {
    path: 'lot-lelang/konfirmasi-ikut-lelang/:id',
    component: KonfirmasiIkutLelangComponent,
  },
  {
    path: 'lot-lelang/bidding/:id',
    component: BiddingComponent,
  },
  {
    path: 'lot-lelang/pengumuman-bidding/:id',
    component: PengumumanBiddingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'lupa-password',
    component: LupaPasswordComponent,
  },
  {
    path: 'status-lelang',
    component: ProfilComponent,
  },
  {
    path: 'status-lelang/detail/:id',
    component: DetailStatusLelangComponent,
  },
  {
    path: 'profil/ktp',
    component: ProfilComponent,
  },
  {
    path: 'profil/rekening-bank',
    component: ProfilComponent,
  },
  {
    path: 'profil/npwp',
    component: ProfilComponent,
  },
  {
    path: 'profil/ganti-password',
    component: ProfilComponent,
  },
  {
    path: 'profil/ganti-nama',
    component: ProfilComponent,
  },
  {
    path: 'profil/ganti-nomor-hp',
    component: ProfilComponent,
  },
  {
    path: 'syarat-dan-ketentuan',
    component: SyaratDanKetentuanComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'konfirmasi-pembayaran-jaminan',
    component: KonfirmasiPembayaranJaminanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
