
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './app-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-reslover.service';


const AppRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent ,children : [
       { path: ':id/:name', component: UserComponent }
    ]},
    { path: 'servers',canActivateChild:[AuthGuard],component: ServersComponent, children : [
       { path: ':id', component: ServerComponent , resolve : {server : ServerResolver}},
       { path: ':id/edit', component: EditServerComponent , canDeactivate : [CanDeactivateGuard]}
    ]},
   //   {path:'not-found',component:PageNotFoundComponent},
     {path:'not-found',component:ErrorPageComponent,data : {message : 'page not found'}},
     {path:'**',redirectTo:'/not-found'},
  ];
  
  @NgModule({
    imports : [
        RouterModule.forRoot(AppRoutes)
    ],
    exports : [RouterModule]
  })  

  export class AppRoutingModule{

  }