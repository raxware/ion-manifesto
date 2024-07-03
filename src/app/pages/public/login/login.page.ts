import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonNote, IonButton, IonCardContent, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonCheckbox } from '@ionic/angular/standalone';
import { AlertController, ToastController, LoadingController } from '@ionic/angular'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonLabel, IonCol, IonRow, IonGrid, IonCard, IonCardContent, IonButton, IonNote, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
	credentials!: FormGroup;

	@Input() isFlipped: boolean = false;
 
	@Output() flipCard = new EventEmitter<boolean>();

	constructor(
		private fb: FormBuilder,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private authService: AuthService,
		private router: Router
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['test', [Validators.required, Validators.email]],
			password: ['test', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {

		console.log('registreing')

		//const loading = await this.loadingController.create();
		//	await loading.present();

		const user = await this.authService.register(this.credentials.value);
		//	await loading.dismiss();

		console.log('registered')
		console.log('credentials', this.credentials.value);

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
			//this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			//this.showAlert('Registration failed', 'Please try again!');
			console.log('Registration failed', 'Please try again!');
		}
	}

	async login() {
		//const loading = await this.loadingController.create();
		//await loading.present();

		const user = await this.authService.login(this.credentials.value);
		//await loading.dismiss();

		console.log('credentials', this.credentials.value);
		console.log('user', user);
		console.log('user', user?.user.email);

		if (user) {
			this.router.navigateByUrl('/', { replaceUrl: true });
			//this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			//this.showAlert('Login failed', 'Please try again!');
			console.log('Login failed', 'Please try again!');
		}

	}
	/*
	async showAlert(header: string, message: string) {
		const alert = await this.alertController.create({
		header,
		message,
		buttons: ['OK']
	});
		await alert.present();
	}
	*/

	flip() {
		this.isFlipped = !this.isFlipped;
		this.flipCard.emit(this.isFlipped);
	}
	
	doSmthng(direction: any){
		console.log(direction)
		/*
		if(direction === 'up'){
		  console.log('Smthng', direction);
		} else if(direction === 'down'){
		  console.log('Smthng', direction);
		}
		*/
	}

}
