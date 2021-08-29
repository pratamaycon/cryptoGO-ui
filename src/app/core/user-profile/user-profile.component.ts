import { Component, OnInit } from '@angular/core';

import { LogoutService } from './../../security/services/logout.service';
import { AuthService } from './../../security/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService, private logoutService: LogoutService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout().subscribe((_) => {
      this.router.navigate(['/login'])
    },
    ((erro: any) => console.log(erro))
    )
  }

}
