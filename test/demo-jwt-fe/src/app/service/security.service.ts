import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from '../model/SignInForm';
import {JwtResponse} from '../model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private API_SIGNUP = environment.API_LOCAL + '/signup';
  private API_SIGNIN = environment.API_LOCAL + '/signin';

  constructor(private http: HttpClient) {
  }

  signUp(signUpForm: SignUpForm): Observable<any> {
    return this.http.post(this.API_SIGNUP, signUpForm);
  }

  signIn(signInForm: SignInForm): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.API_SIGNIN, signInForm);
  }
}
