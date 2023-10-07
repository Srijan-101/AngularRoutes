import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot } from '@angular/router';
import { CanComponentDeactivated, CanDeactivateGuard } from './can-deactive-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit , CanDeactivateGuard{
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:boolean;
  changedSaved = false;

  constructor(private serversService: ServersService,private route:ActivatedRoute,private router:Router ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
        (queryParams:Params) => {
          this.allowEdit = 
            queryParams['allowEdit'] === '1' ? true : false;
        }
    );
    this.route.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSaved = true;
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  canDeactivate(component: CanComponentDeactivated, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if(!this.allowEdit){
         return true;
      }
      if(this.serverName !== this.server.name || this.serverStatus !== this.serverStatus && !this.changedSaved){
           return confirm("Do you want to discard the changes");
      } else {
        return true;
      }
  }

}
