import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const CREATE_KPR_API = 'http://10.1.137.50:8774/create';
const STORE_BERKAS_API = 'http://10.1.137.50:8774/createDokumen/';

@Component({
  selector: 'app-form-kpr-tambah',
  templateUrl: './form-kpr-tambah.component.html',
  styleUrls: ['./form-kpr-tambah.component.css'],
})
export class FormKprTambahComponent implements OnInit {
  isNasabah!: boolean;
  dataAllKpr: any = {};
  fileForm!: FormGroup;
  fileSrc: any;
  KTP!: File;
  KK!: File;
  NPWP: any = {};
  MUTASI: any = {};
  KETPER: any = {};
  SLIPGAJI: any = {};
  HM: any = {};
  IMB: any = {};
  debitur_id: any = {};
  disabledButton = false;

  // token for get anything data
  httpOptions_base = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.getToken()}`
    ),
  };

  screeningDebitur = this._formBuilder.group({
    nama_lengkap: ['', Validators.required],
    spernikahan: ['', Validators.required],
    dob: ['', Validators.required],
    jpekerjaan: ['', Validators.required],
    isNasabah: ['', Validators.required],
    accountNumber: [''],
  });

  dataPengajuan = this._formBuilder.group({
    alamatJaminan: ['', Validators.required],
    city: ['', Validators.required],
    hargaProp: ['', Validators.required],
    jangkaWaktu: ['', Validators.required],
    jenisJaminan: ['', Validators.required],
    jumPinjaman: ['', Validators.required],
    kecamatan: ['', Validators.required],
    kelurahan: ['', Validators.required],
    luasBangunan: ['', Validators.required],
    luasTanah: ['', Validators.required],
    province: ['', Validators.required],
    sukuBunga: ['', Validators.required],
    tkredit: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  dataPemohon = this._formBuilder.group({
    alamat: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', Validators.required],
    jumTanggunan: ['', Validators.required],
    kecamatan: ['', Validators.required],
    kelurahan: ['', Validators.required],
    motherName: ['', Validators.required],
    nomorTeleponRumah: ['', Validators.required],
    pendidikanTerakhir: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    province: ['', Validators.required],
    statsRumah: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  dataPenghasilan = this._formBuilder.group({
    angsuranLain: ['', Validators.required],
    biayaRmhtg: ['', Validators.required],
    city: ['', Validators.required],
    jabatan: ['', Validators.required],
    jenisUsaha: ['', Validators.required],
    kecamatan: ['', Validators.required],
    kelurahan: ['', Validators.required],
    monthFirstWork: ['', Validators.required],
    officeAddress: ['', Validators.required],
    officeName: ['', Validators.required],
    penghasilan: ['', Validators.required],
    penghasilanTamb: ['', Validators.required],
    phoneNumberDirect: ['', Validators.required],
    phoneNumberHunting: ['', Validators.required],
    province: ['', Validators.required],
    unitKerja: ['', Validators.required],
    yearFirstWork: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  dataKeluargaTerdekat = this._formBuilder.group({
    alamatKeluarga: ['', Validators.required],
    city: ['', Validators.required],
    hubungan: ['', Validators.required],
    kecamatan: ['', Validators.required],
    kelurahan: ['', Validators.required],
    name: ['', Validators.required],
    nomorTeleponRumah: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    province: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  dataPernyataanFinasial = this._formBuilder.group({
    pernyataan_finansial: ['', Validators.required],
  });

  dataUploadDokumen = this._formBuilder.group({
    ktp: ['', Validators.required],
    kk: ['', Validators.required],
    npwp: ['', Validators.required],
    mutasi: ['', Validators.required],
    ketper: ['', Validators.required],
    slipgaji: ['', Validators.required],
    hm: ['', Validators.required],
    imb: ['', Validators.required],
  });

  dataSuratPernyataan = this._formBuilder.group({
    ceklis_akhir: [''],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.fileSrc = this._formBuilder.group({
      ktp: [null],
    });
  }

  ngOnInit(): void {}

  markAllAsTouched(jenis_form_group: FormGroup) {
    jenis_form_group.markAllAsTouched();
  }

  onKTPChange(event: any) {
    if (event.target.files.length === 1) {
      this.KTP = event.target.files[0];
    }
  }
  onKKChange(event: any) {
    if (event.target.files.length === 1) {
      this.KK = event.target.files[0];
    }
  }
  onNPWPChange(event: any) {
    if (event.target.files.length === 1) {
      this.NPWP = event.target.files[0];
    }
  }
  onMutasiChange(event: any) {
    if (event.target.files.length === 1) {
      this.MUTASI = event.target.files[0];
    }
  }
  onKeteranganPerusahaanChange(event: any) {
    if (event.target.files.length === 1) {
      this.KETPER = event.target.files[0];
    }
  }
  onSlipGajiChange(event: any) {
    if (event.target.files.length === 1) {
      this.SLIPGAJI = event.target.files[0];
    }
  }
  onHMChange(event: any) {
    if (event.target.files.length === 1) {
      this.HM = event.target.files[0];
    }
  }
  onIMBChange(event: any) {
    if (event.target.files.length === 1) {
      this.IMB = event.target.files[0];
    }
  }

  kirimDataKPR() {
    this.dataAllKpr.debitur = this.screeningDebitur.value;
    this.dataAllKpr.keluarga = this.dataKeluargaTerdekat.value;
    this.dataAllKpr.pemohon = this.dataPemohon.value;
    this.dataAllKpr.pengajuan = this.dataPengajuan.value;
    this.dataAllKpr.penghasilan = this.dataPenghasilan.value;

    console.log(this.dataAllKpr);

    this.http
      .post<any>(CREATE_KPR_API, this.dataAllKpr, this.httpOptions_base)
      .subscribe(
        (isi) => {
          this.submitFile(isi.debitur.id);

          alert('Sukses Mengajukan KPR');
          this.router.navigate(['form-kpr/sukses']);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  submitFile(id: any) {
    // console.log(this.KTP);
    // console.log(this.KK);
    // console.log(this.NPWP);
    // console.log(this.MUTASI);
    // console.log(this.KETPER);
    // console.log(this.SLIPGAJI);
    // console.log(this.HM);
    // console.log(this.IMB);
    var formData = new FormData();

    formData.append('ktp', this.KTP);
    formData.append('kk', this.KK);
    formData.append('npwp', this.NPWP);
    formData.append('mutasi', this.MUTASI);
    formData.append('sk_perusahaan', this.KETPER);
    formData.append('last_slip_gaji', this.SLIPGAJI);
    formData.append('coll_certificate', this.HM);
    formData.append('imb_certificate', this.IMB);

    this.http
      .post<any>(STORE_BERKAS_API + id, formData, this.httpOptions_base)
      .subscribe(
        (isi) => {
          alert('Berkas ok');
          // console.log(isi);
        },
        (err) => {
          alert('Berkas error');
          console.log(err);
        }
      );
  }
}
