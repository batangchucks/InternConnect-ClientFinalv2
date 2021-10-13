import { Component, OnInit } from '@angular/core';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-admin-esignature',
  templateUrl: './admin-esignature.component.html',
  styleUrls: ['./admin-esignature.component.scss'],
})
export class AdminEsignatureComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  _env = environment.apiUrl;
  selectedFileUp: File = null;
  imageSrc: string;
  PhotoFileNameEsig: string;
  dataPrivacyModal: boolean = true;

  constructor(private File: fileUpload, private Acc: createAccount) {}

  ngOnInit(): void {}
  eSignatureUp(event) {
    this.selectedFileUp = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileUp, this.selectedFileUp.name);

    this.File.uploadEsign(formData).subscribe((data: any) => {
      this.PhotoFileNameEsig = data.toString();
      this.updateEsig();
    });
  }
  previewPdf() {
    this.Acc.previewPdf(this.user.admin.id).subscribe((pdfGeneration) => {
      var blob = new Blob([pdfGeneration], { type: 'application/pdf' });
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  updateEsig() {
    var PostVal = {
      stampFileName: this.PhotoFileNameEsig,
    };
    this.Acc.updateAdminSignature(this.user.admin.id, PostVal).subscribe(
      (createdVal) => {}
    );
  }

  toAccept(){
    this.dataPrivacyModal = false;
  }

}
