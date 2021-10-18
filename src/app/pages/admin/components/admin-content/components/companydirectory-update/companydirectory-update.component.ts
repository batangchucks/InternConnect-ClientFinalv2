import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
@Component({
  selector: 'app-companydirectory-update',
  templateUrl: './companydirectory-update.component.html',
  styleUrls: ['./companydirectory-update.component.scss'],
})
export class CompanydirectoryUpdateComponent implements OnInit {
  p: number = 1;
  CreateIndicator: boolean = false;
  UpdateIndicator: boolean = false;
  DeleteIndicator: boolean = false;
  updateCompany!: FormGroup;
  createCompany!: FormGroup;

  selectedFileLogo: File = null;
  imageSrc: string;
  LogoFileName: string;

  selectedCoverPhoto: File = null;
  coverPhotoFileName: string;

  Companies: CompanyModel[] = [];
  photoUrl:string;

  selectedUpdateLogo:File = null;

  updateLogo:string;
  selectedUpdateCoverPhoto:File = null;
  updateCoverPhoto:string;

  constructor(private company: CompanyService, private File: fileUpload) {}

  ngOnInit(): void {
    this.company.getCompany().subscribe((eC) => {
      this.Companies = eC;
    });

     this.photoUrl = this.File.photoUrl;
    
  }
  deleteCompany(eachCid: number) {
    this.company.deleteCompany(eachCid).subscribe((response) => {
      this.ngOnInit();
    });
  }
  toCreate() {
    console.log("here")
    this.CreateIndicator = true;
  }

  toCancel(){
    this.DeleteIndicator = false;
  }

  toCancelOne() {
    this.CreateIndicator = false;
  }
  toCancelTwo() {
    this.UpdateIndicator = false;
  }

  toUpdate(toUpdateCompany: CompanyModel) {
    this.UpdateIndicator = true;
    const name = toUpdateCompany.name;
    const description = toUpdateCompany.description;
    const addressOne = toUpdateCompany.addressOne;
    const addressTwo = toUpdateCompany.addressTwo;
    const addressThree = toUpdateCompany.addressThree;
    const city = toUpdateCompany.city;
    const headerFileName = toUpdateCompany.headerFileName;
    const logoFileName = toUpdateCompany.logoFileName;
    const contactPersonName = toUpdateCompany.contactPersonName;
    const contactPersonDesignation = toUpdateCompany.contactPersonDesignation;
    const contactPersonEmail = toUpdateCompany.contactPersonEmail;
    const link = toUpdateCompany.link;
    const id = toUpdateCompany.id;
    
    this.updateCoverPhoto = headerFileName;
    this.updateLogo = logoFileName;
    


    this.updateCompany = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      addressOne: new FormControl(addressOne, Validators.required),
      addressTwo: new FormControl(addressTwo),
      addressThree: new FormControl(addressThree),
      city: new FormControl(city, Validators.required),
      headerFileName: new FormControl(headerFileName),
      
      contactPersonName: new FormControl(
        contactPersonName,
        Validators.required
      ),
      contactPersonDesignation: new FormControl(
        contactPersonDesignation,
        Validators.required
      ),
      contactPersonEmail: new FormControl(
        contactPersonEmail,
        Validators.required
      ),
      link: new FormControl(link),
      id: new FormControl(id, Validators.required),
    });
  }
  onSubmitCreate(f: NgForm) {

   
    var payload = {
      name: f.controls.name.value,
      link: f.controls.link.value,
      addressOne: f.controls.addressOne.value,
      addressTwo: f.controls.addressTwo.value,
      addressThree: f.controls.addressThree.value,
      city: f.controls.city.value,
      headerFileName: this.coverPhotoFileName,
      logoFileName: this.LogoFileName,
      description: f.controls.description.value,
      contactPersonName: f.controls.contactPersonName.value,
      contactPersonEmail: f.controls.contactPersonEmail.value,
      contactPersonDesignation: f.controls.contactPersonDesignation.value,
    };
    console.log(payload);

    

     this.company.createCompany(payload).subscribe((createdC) => {
      this.ngOnInit();
      this.toCancelOne();
    });
   
  }
  updateSubmit() {
    var payload = {
      name: this.updateCompany.controls.name.value,
      link: this.updateCompany.controls.link.value,
      addressOne: this.updateCompany.controls.addressOne.value,
      addressTwo: this.updateCompany.controls.addressTwo.value,
      addressThree: this.updateCompany.controls.addressThree.value,
      city: this.updateCompany.controls.city.value,
      headerFileName: this.updateCoverPhoto,
      logoFileName: this.updateLogo,
      description: this.updateCompany.controls.description.value,
      contactPersonName: this.updateCompany.controls.contactPersonName.value,
      contactPersonEmail: this.updateCompany.controls.contactPersonEmail.value,
      contactPersonDesignation: this.updateCompany.controls.contactPersonDesignation.value,
      id: this.updateCompany.controls.id.value
    };
 
    this.company.updateCompany(payload).subscribe(eachC=> {
      console.log(eachC);
      this.UpdateIndicator = false;
      this.ngOnInit();
    });
  }

  uploadLogo(event) {
    this.selectedFileLogo = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append('files', this.selectedFileLogo, this.selectedFileLogo.name);

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.LogoFileName = data.toString();
      console.log(this.LogoFileName);
    });
  }

  uploadCoverPhoto(event) {
    this.selectedCoverPhoto = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append(
      'files',
      this.selectedCoverPhoto,
      this.selectedCoverPhoto.name
    );

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.coverPhotoFileName = data.toString();
      console.log(this.coverPhotoFileName);
    });
  }

  changeLogo(event) {
    this.selectedUpdateLogo = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append(
      'files',
      this.selectedUpdateLogo,
      this.selectedUpdateLogo.name
    );

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.updateLogo = data.toString();
      console.log(this.updateLogo);
    });
  }
  changeCoverPhoto(event) {
    this.selectedUpdateCoverPhoto = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    const formData: FormData = new FormData();
    formData.append(
      'files',
      this.selectedUpdateCoverPhoto,
      this.selectedUpdateCoverPhoto.name
    );

    this.File.uploadEndorsement(formData).subscribe((data: any) => {
      this.updateCoverPhoto = data.toString();
      console.log(this.updateCoverPhoto);
    });
  }

}
