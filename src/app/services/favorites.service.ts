import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(public firestore: AngularFirestore) { }

  getFavorite() { 
    //return this.firestore.collection("favorites").valueChanges();
    return this.firestore.collection("favorites").snapshotChanges();
  }

  createFavorite(data: any) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("favorites")
            .add(data)
            .then(res => {resolve(res)}, err => reject(err));
    });
  }
  deleteFavorite(id: any) {
    return this.firestore
        .collection("favorites")
        .doc(id)
        .delete();
  }
}
