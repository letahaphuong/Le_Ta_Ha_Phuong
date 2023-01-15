import {Component, OnInit} from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {SecurityService} from '../../service/security.service';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  signInForm: SignInForm | undefined;
  statusRole = '';

  constructor(private securityService: SecurityService,
              private tokenService: TokenService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    this.securityService.signIn(this.signInForm).subscribe(data => {
      console.log('data -----> ', data);
      if (data.token !== undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setRole(data.roles);
        this.router.navigateByUrl('/');
      }
      // @ts-ignore
      if (data.status === 202) {
        console.log('login Failed!');
      }
    });
  }
}
