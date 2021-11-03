import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/services/company.service';
import { CompanyModel } from 'src/app/shared/models/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { fileUpload } from 'src/app/shared/services/fileUpload.service';
import { CompanyStatusList } from 'src/app/shared/models/enums.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';

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
  UpdateStatusIndicator: boolean = false;

  selectedFileLogo: File = null;
  imageSrc: string;
  LogoFileName: string;

  selectedCoverPhoto: File = null;
  coverPhotoFileName: string;

  Companies: CompanyModel[] = [];
  photoUrl: string;

  companyStatus = CompanyStatusList

  selectedUpdateLogo: File = null;

  updateLogo: string;
  selectedUpdateCoverPhoto: File = null;
  updateCoverPhoto: string;
  updateCompanyStatus: FormGroup;
  selectedCompanyStatus: string;

  ToDeleteCompanyId: number;
  todayDate;

  deleteCompanyModal:boolean = false;

  constructor(private company: CompanyService, private File: fileUpload, private date:DatePipe) {}

  ngOnInit(): void {
    this.company.getCompany().subscribe((eC) => {
      this.Companies = eC;

    });
    var dateGen = new Date();
    var today =
      dateGen.getFullYear() +
      '-' +
      (dateGen.getMonth() + 1) +
      '-' +
      dateGen.getDate();
    this.todayDate = today



    this.photoUrl = this.File.photoUrl;
  }
  deleteCompany(eachCid: number) {
    this.company.deleteCompany(eachCid).subscribe((response) => {
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }
  toCreate() {

    this.CreateIndicator = true;
  }

  toCancel() {
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
      expiration: new FormControl(
        this.date.transform(toUpdateCompany.expiration, 'yyyy-MM-dd')
      ),

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
      expiration: f.controls.expirationDate.value,
    };


    this.company.createCompany(payload).subscribe((createdC) => {
      this.ngOnInit();
      this.toCancelOne();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
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
      contactPersonDesignation:
        this.updateCompany.controls.contactPersonDesignation.value,
      id: this.updateCompany.controls.id.value,
      expiration: this.updateCompany.controls.expiration.value,
    };

    this.company.updateCompany(payload).subscribe((eachC) => {

      this.UpdateIndicator = false;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
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

    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
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

    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
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

    },(error:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
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

    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });
  }

  onUpdateStatus(id: number, status: string) {
    this.UpdateStatusIndicator = true;
    this.updateCompanyStatus = new FormGroup({
      id: new FormControl(id),
      status: new FormControl(status),
    });
  }

  confirmUpdateStatus() {
    this.company
      .updateCompanyStatus(this.updateCompanyStatus.value)
      .subscribe((resp) => {
        this.UpdateStatusIndicator = false;
        this.ngOnInit();
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
  }

  updateStatusCancel() {
    this.UpdateStatusIndicator = false;
  }

  onDelete(id: number) {
    this.deleteCompanyModal = true
    this.ToDeleteCompanyId = id
  }

  confirmDelete() {
    this.company.deleteCompany(this.ToDeleteCompanyId).subscribe(resp => {
      this.deleteCompanyModal = false;
      this.ToDeleteCompanyId = null;
      this.ngOnInit();
    },(err:Error)=> {
      alert("An error has occured");
      this.ngOnInit();
    });

  }

  cancelDelete() {
    this.deleteCompanyModal = false
  }
}
