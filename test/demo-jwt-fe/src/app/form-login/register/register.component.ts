import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../service/security.service';
import {SignUpForm} from '../../model/SignUpForm';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signUpForm: SignUpForm | undefined;

  constructor(private securityService: SecurityService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this.securityService.signUp(this.signUpForm).subscribe(data => {
      alert('ok');
      console.log(data);
      this.router.navigateByUrl('/');
    });
  }
}
