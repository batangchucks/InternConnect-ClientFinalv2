import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EndorsementformComponent } from './pages/endorsementform/endorsementform.component';
import { CompanydirectoryComponent } from './pages/companydirectory/companydirectory.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { CompanyprofileComponent } from './pages/companyprofile/companyprofile.component';
import { StatusComponent } from './pages/landing/components/status/status.component';
import { AdminSidebarComponent } from './pages/admin/components/admin-sidebar/admin-sidebar.component';
import { AdminEsignatureComponent } from './pages/admin/components/admin-esignature/admin-esignature.component';
import { AdminSubmissionsComponent } from './pages/admin/components/admin-submissions/admin-submissions.component';
import { AdminReportsComponent } from './pages/admin/components/admin-reports/admin-reports.component';
import { AdminAccountsComponent } from './pages/admin/components/admin-accounts/admin-accounts.component';
import { AdminLogsComponent } from './pages/admin/components/admin-logs/admin-logs.component';
import { AdminContentComponent } from './pages/admin/components/admin-content/admin-content.component';
import { AdminEventsComponent } from './pages/admin/components/admin-events/admin-events.component';
import { AdminIsoComponent } from './pages/admin/components/admin-iso/admin-iso.component';
import { AdminAcadyearComponent } from './pages/admin/components/admin-acadyear/admin-acadyear.component';
import { AdminDashboardComponent } from './pages/admin/components/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './pages/landing/components/navbar/navbar.component';
import { FooterComponent } from './pages/landing/components/footer/footer.component';
import { OpportunitiesComponent } from './pages/companyprofile/components/opportunities/opportunities.component';
import { ApplicationComponent } from './pages/landing/components/application/application.component';
import { TransactionComponent } from './pages/landing/components/transaction/transaction.component';
import { CompanyComponent } from './pages/landing/components/company/company.component';
import { NewSubmissionsComponent } from './pages/admin/components/admin-submissions/components/new-submissions/new-submissions.component';
import { PendingSubmissionsComponent } from './pages/admin/components/admin-submissions/components/pending-submissions/pending-submissions.component';
import { ApprovedSubmissionsComponent } from './pages/admin/components/admin-submissions/components/approved-submissions/approved-submissions.component';
import { FinalSubmissionsComponent } from './pages/admin/components/admin-submissions/components/final-submissions/final-submissions.component';
import { LandingUpdateComponent } from './pages/admin/components/admin-content/components/landing-update/landing-update.component';
import { CompanydirectoryUpdateComponent } from './pages/admin/components/admin-content/components/companydirectory-update/companydirectory-update.component';
import { OpportunitiesUpdateComponent } from './pages/admin/components/admin-content/components/opportunities-update/opportunities-update.component';
import { SectionsComponent } from './pages/admin/components/admin-accounts/components/sections/sections.component';
import { StudentsComponent } from './pages/admin/components/admin-accounts/components/students/students.component';
import { CoordinatorComponent } from './pages/admin/components/admin-accounts/components/coordinator/coordinator.component';
import { ProgramsComponent } from './pages/admin/components/admin-accounts/components/programs/programs.component';
import { ChairComponent } from './pages/admin/components/admin-accounts/components/chair/chair.component';
import { DeanComponent } from './pages/admin/components/admin-accounts/components/dean/dean.component';
import { TechprogramComponent } from './pages/admin/components/admin-accounts/components/techprogram/techprogram.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompanyService } from './shared/services/company.service';
import { SearchfilterPipe } from './searchfilter.pipe';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ResetpassComponent } from './pages/resetpass/resetpass.component';
import { AdminReturnisoComponent } from './pages/admin/components/admin-iso/components/admin-returniso/admin-returniso.component';
import { sectionFilter } from './sectionFilter.pipe';
import { isoCodeFilter } from './isoCodeFilter.pipe';
import { FaqsComponent } from './pages/landing/components/faqs/faqs.component';
import { PolicyComponent } from './pages/landing/components/policy/policy.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LandingComponent,
    EndorsementformComponent,
    CompanydirectoryComponent,
    OnboardingComponent,
    LoginComponent,
    ForgotpassComponent,
    CompanyprofileComponent,
    StatusComponent,
    AdminSidebarComponent,
    AdminEsignatureComponent,
    AdminSubmissionsComponent,
    AdminReportsComponent,
    AdminAccountsComponent,
    AdminLogsComponent,
    AdminContentComponent,
    AdminEventsComponent,
    AdminIsoComponent,
    AdminAcadyearComponent,
    AdminDashboardComponent,
    NavbarComponent,
    FooterComponent,
    OpportunitiesComponent,
    ApplicationComponent,
    TransactionComponent,
    CompanyComponent,
    NewSubmissionsComponent,
    PendingSubmissionsComponent,
    ApprovedSubmissionsComponent,
    FinalSubmissionsComponent,
    LandingUpdateComponent,
    CompanydirectoryUpdateComponent,
    OpportunitiesUpdateComponent,
    SectionsComponent,
    StudentsComponent,
    CoordinatorComponent,
    ProgramsComponent,
    ChairComponent,
    DeanComponent,
    TechprogramComponent,
    SearchfilterPipe,
    ResetpassComponent,
    AdminReturnisoComponent,
    sectionFilter,
    FaqsComponent,
    PolicyComponent,
    isoCodeFilter,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    CompanyService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
