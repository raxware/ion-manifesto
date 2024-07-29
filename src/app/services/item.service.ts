import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { itemData } from '../model/interfaces';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private firestore: Firestore, private auth: Auth){}

    getThings(): Observable<itemData[]> {
      const itemsRef = collection(this.firestore, 'myThings');
      const q = query(itemsRef, where('user', '==', this.auth.currentUser!.uid) );
      return collectionData(q, { idField: 'id'}) as Observable<itemData[]>;
    }
    getThingById(id: string): Observable<itemData> {
      const itemDocRef = doc(this.firestore, `myThings/${id}`);
      return docData(itemDocRef, { idField: 'id' }) as Observable<itemData>;
    }
    setThing(thingUnit: itemData) {
      thingUnit.user = this.auth.currentUser?.uid;
      const itemsRef = collection(this.firestore, 'myThings');
      return addDoc(itemsRef, thingUnit);
    }
    editThing(reDefinedThing: itemData){
      console.log('id of reDefinedThing: ', reDefinedThing.id);
      const itemsRef = doc(this.firestore, `myThings/${reDefinedThing.id}`);
      return updateDoc(itemsRef, { ...reDefinedThing });
    }
    thingKicker(id: string) {
      const itemDocRef = doc(this.firestore, `myThings/${id}`);
      return deleteDoc(itemDocRef);
    } 
}