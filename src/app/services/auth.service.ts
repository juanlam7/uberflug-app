import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase  from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {}
  
  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async loginGoogle(): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async loginFacebook(): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
