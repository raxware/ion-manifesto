import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(
		private userService: UserService,
		private firestore: Firestore, 
		private storage: Storage,
		private auth: Auth,
	) {}

  getUserProfile() {
    const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, `users/${user!.uid}`);
		return docData(userDocRef, { idField: 'id' });
	}

	async uploadAvatarImage(cameraFile: Photo) {
		const user = this.auth.currentUser!;
		const path = `uploads/${user.uid}/profile.webp`;
		const storageRef = ref(this.storage, path);
		try {
			await uploadString(storageRef, cameraFile.base64String!, 'base64'); // sube la img como base64 a la FB Storage
			const imageUrl = await getDownloadURL(storageRef);  // baja la URL de la img 
			this.userService.setAvatarImg(imageUrl);			// setea la URL como avatar
			return imageUrl;									// devuelve la URL como resultado de la funcción
		} catch (e) { return null; }							// si hay error, devuelve null
	}

	async uploadItemImage(cameraFile: Photo) {
		const user = this.auth.currentUser!;
		const fileName = 'mnf_' + Date.now() + '.jpeg';  // construye la string 'fileName'
		const path = `uploads/${user.uid}/${fileName}`;
		const storageRef = ref(this.storage, path);
		try {
			await uploadString(storageRef, cameraFile.base64String!, 'base64'); // sube la img como base64 a la FB Storage
			const imageUrl = await getDownloadURL(storageRef);					// baja la URL de la img
			return imageUrl;													// devuelve la URL como resultado de la funcción
		} catch (e) { return null; }											// si hay error, devuelve null
	}

}

