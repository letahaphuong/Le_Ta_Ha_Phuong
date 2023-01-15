import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin = false;
  name: string | null | undefined;

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkLogin = true;
      this.name = this.tokenService.getName();
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
  }

}
