import { Component, OnInit } from '@angular/core';
import { createAccount } from 'src/app/shared/services/createAcc.service';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';

@Component({
  selector: 'app-admin-esignature',
  templateUrl: './admin-esignature.component.html',
  styleUrls: ['./admin-esignature.component.scss']
})
export class AdminEsignatureComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));

  selectedFileUp: File = null;
  imageSrc: string;
  PhotoFileNameEsig:string;

  constructor(private File:fileUpload,private Acc: createAccount) { }

  ngOnInit(): void {
    console.log(this.user);
  }
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
   
    this.File.uploadEsign(formData).subscribe((data:any)=>{
      this.PhotoFileNameEsig = data.toString();
      this.updateEsig();
    });
  }
  updateEsig() {
    console.log(this.PhotoFileNameEsig);
    var PostVal = {
      stampFileName:this.PhotoFileNameEsig
    }
    this.Acc.updateAdminSignature(this.user.admin.id,PostVal).subscribe(createdVal=> {
      console.log(createdVal);
    });
  }

}
