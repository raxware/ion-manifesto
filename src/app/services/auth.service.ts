import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public emailUser: string = '';

  constructor(private auth: Auth) {}

  async register({ email, password }: {email: string; password: string}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: {email: string; password: string}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
        this.emailUser = user.user.email!;
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    this.emailUser = '';
    return signOut(this.auth);
  }

  setEmailUser(emailUser: string){
    this.emailUser = emailUser;
  }

}