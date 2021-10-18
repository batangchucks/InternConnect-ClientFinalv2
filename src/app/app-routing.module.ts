import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { EndorsementformComponent } from './pages/endorsementform/endorsementform.component';
import { CompanydirectoryComponent } from './pages/companydirectory/companydirectory.component';
import { CompanyprofileComponent } from './pages/companyprofile/companyprofile.component';
import { FaqsComponent } from './pages/landing/components/faqs/faqs.component';
import { PolicyComponent } from './pages/landing/components/policy/policy.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin/components/admin-dashboard/admin-dashboard.component';
import { AdminEsignatureComponent } from './pages/admin/components/admin-esignature/admin-esignature.component';
import { AdminSubmissionsComponent } from './pages/admin/components/admin-submissions/admin-submissions.component';
import { NewSubmissionsComponent } from './pages/admin/components/admin-submissions/components/new-submissions/new-submissions.component';
import { PendingSubmissionsComponent } from './pages/admin/components/admin-submissions/components/pending-submissions/pending-submissions.component';
import { ApprovedSubmissionsComponent } from './pages/admin/components/admin-submissions/components/approved-submissions/approved-submissions.component';
import { FinalSubmissionsComponent } from './pages/admin/components/admin-submissions/components/final-submissions/final-submissions.component';
import { LandingUpdateComponent } from './pages/admin/components/admin-content/components/landing-update/landing-update.component';
import { CompanydirectoryUpdateComponent } from './pages/admin/components/admin-content/components/companydirectory-update/companydirectory-update.component';
import { OpportunitiesUpdateComponent } from './pages/admin/components/admin-content/components/opportunities-update/opportunities-update.component';
import { ChairComponent } from './pages/admin/components/admin-accounts/components/chair/chair.component';
import { CoordinatorComponent } from './pages/admin/components/admin-accounts/components/coordinator/coordinator.component';
import { DeanComponent } from './pages/admin/components/admin-accounts/components/dean/dean.component';
import { TechprogramComponent } from './pages/admin/components/admin-accounts/components/techprogram/techprogram.component';
import { StudentsComponent } from './pages/admin/components/admin-accounts/components/students/students.component';
import { ProgramsComponent } from './pages/admin/components/admin-accounts/components/programs/programs.component';
import { SectionsComponent } from './pages/admin/components/admin-accounts/components/sections/sections.component';
import { AdminReportsComponent } from './pages/admin/components/admin-reports/admin-reports.component';
import { AdminEventsComponent } from './pages/admin/components/admin-events/admin-events.component';
import { AdminIsoComponent } from './pages/admin/components/admin-iso/admin-iso.component';
import { AdminAcadyearComponent } from './pages/admin/components/admin-acadyear/admin-acadyear.component';
import { AdminLogsComponent } from './pages/admin/components/admin-logs/admin-logs.component';
import { RouteGuardCoordinator } from './helpers/route-guardCoordinator.service';
import { RouteGuardChair } from './helpers/route-guardChair.service';
import { RouteGuardDean } from './helpers/route-guardDean.service';
import { RouteGuardLogin } from './helpers/route-guardLogin.service';
import { RouteGuardCordChair } from './helpers/route-guardCordChair.service';
import { RouteGuardAdmin } from './helpers/route-guardAdmin.service';
import { RouteGuardCordDean } from './helpers/route-guardCordDean.service';
import { RouteGuardChairDean } from './helpers/route-guardChairDean.service';
import { RouteGuardThreeCombi } from './helpers/route-guardChDeanTech.service';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { RouteGuardStudent } from './helpers/route-guardStudent.service';
import {ResetpassComponent} from './pages/resetpass/resetpass.component';
import {StatusComponent} from './pages/landing/components/status/status.component';
import { AdminReturnisoComponent } from './pages/admin/components/admin-iso/components/admin-returniso/admin-returniso.component';
import { RouteGuardEndorsement } from './helpers/route-guardEndorsement.service';
import { ChangedeanComponent } from './pages/changedean/changedean.component';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [RouteGuardLogin] },
  {
    path: 'resetPassword',
    component: ForgotpassComponent,
    canActivate: [RouteGuardLogin],
  },
  {
    path: 'endorsementform',
    component: EndorsementformComponent,
    canActivate: [RouteGuardEndorsement],
  },
  {
    path: 'companydirectory',

    component: CompanydirectoryComponent,
  },
  { path: 'companyprofile/:id', component: CompanyprofileComponent },
  {
    path: 'onboard',
    component: OnboardingComponent,
    canActivate: [RouteGuardLogin],
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'forgotpassword',
    component: ResetpassComponent ,
    canActivate: [RouteGuardLogin],
  },
  {
    path: 'status',
    component: StatusComponent ,
    canActivate: [RouteGuardStudent],
  },
  {
    path:'changedean',
    component:ChangedeanComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        canActivate: [RouteGuardAdmin],
        component: AdminDashboardComponent,
      },
      {
        path: 'esignature',
        canActivate: [RouteGuardCordDean],
        component: AdminEsignatureComponent,
      },
      { path: 'admin-submissions', component: AdminSubmissionsComponent },
      {
        path: 'new-submissions',
        component: NewSubmissionsComponent,
        canActivate: [RouteGuardCoordinator],
      },
      {
        path: 'pending-submissions',
        component: PendingSubmissionsComponent,
        canActivate: [RouteGuardCoordinator],
      },
      {
        path: 'approved-submissions',
        component: ApprovedSubmissionsComponent,
        canActivate: [RouteGuardCoordinator],
      },
      {
        path: 'final-submissions',
        canActivate: [RouteGuardChairDean],
        component: FinalSubmissionsComponent,
      },
      {
        path: 'update-landing',
        canActivate: [RouteGuardThreeCombi],
        component: LandingUpdateComponent,
      },
      {
        path: 'update-companydirectory',
        canActivate: [RouteGuardThreeCombi],
        component: CompanydirectoryUpdateComponent,
      },
      {
        path: 'update-opportunities',
        canActivate: [RouteGuardThreeCombi],
        component: OpportunitiesUpdateComponent,
      },
      {
        path: 'chair',
        canActivate: [RouteGuardDean],
        component: ChairComponent,
      },
      {
        path: 'coordinators',
        component: CoordinatorComponent,
        canActivate: [RouteGuardChair],
      },
      { path: 'dean', canActivate: [RouteGuardDean], component: DeanComponent },
      {
        path: 'techprogram',
        canActivate: [RouteGuardDean],
        component: TechprogramComponent,
      },
      {
        path: 'students',
        // for  coordinator or chair
        canActivate: [RouteGuardCordChair],
        component: StudentsComponent,
      },
      {
        // dean pero nakasama track dito ayusin natin
        path: 'programs',
        component: ProgramsComponent,
      },
      {
        // for chair
        path: 'sections',
        canActivate: [RouteGuardChair],
        component: SectionsComponent,
      },
      {
        path: 'reports',
        // can activate for everybody
        component: AdminReportsComponent,
      },
      {
        path: 'events',
        // everyone except dean?
        component: AdminEventsComponent,
      },
      {
        // chair or dean?
        path: 'iso',
        component: AdminIsoComponent,
      },
      { path: 'returniso',
      canActivate: [RouteGuardCordChair],
      component: AdminReturnisoComponent,
      },
      {
        // dean
        path: 'acadyear',
        component: AdminAcadyearComponent,
      },
      {
        // everybody?
        path: 'logs',
        canActivate: [RouteGuardCordDean],
        component: AdminLogsComponent,
      },
      { path: 'updateForm/:id', component: AdminLogsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
