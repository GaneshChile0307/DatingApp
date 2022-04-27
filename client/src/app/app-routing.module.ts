import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [

  {path:"" , component:HomeComponent},
  {path:"members" , component:MemberListComponent, canActivate:[AuthGuard]},
  {path:"members/:username" , component:MemberDetailComponent, canActivate:[AuthGuard]},
  {path:"member/edit" , component:MemberEditComponent, canActivate:[AuthGuard] ,canDeactivate:[PreventUnsavedChangesGuard]},
  {path:"lists" , component:ListsComponent, canActivate:[AuthGuard]},
  {path:"messages" , component:MessagesComponent, canActivate:[AuthGuard]},
  

  {path:"errors" , component:TestErrorsComponent, canActivate:[AuthGuard]},
  {path:"not-found" , component:NotFoundComponent, canActivate:[AuthGuard]},
  {path: 'server-error', component: ServerErrorComponent, canActivate:[AuthGuard]},
  {path:"**" , component:HomeComponent ,pathMatch:"full"},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
