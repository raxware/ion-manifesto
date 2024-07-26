import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userEmail: string = '';

  constructor(
    private auth: Auth, 
    private userService: UserService
  ) {}

  async register({ email, password }: {email: string; password: string}) {
    try {
      const user: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      this.setUserEmail(user.user.email!);
      await this.userService.saveUser(user.user);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: {email: string; password: string}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('user', user);
      this.userEmail = user.user.email!;
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    this.userEmail = '';
    return signOut(this.auth);
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail() {
    return this.userEmail;
  }

}
