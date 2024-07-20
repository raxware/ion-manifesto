import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonNote, IonButton, 
	IonCardContent, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonCheckbox, IonInput, 
	IonImg, IonInputPasswordToggle
} from '@ionic/angular/standalone';
import { AlertService } from 'src/app/services/alert-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonImg, IonInput, IonCheckbox, IonLabel, IonCol, IonRow, IonGrid, IonCard, IonCardContent, IonButton, IonNote, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, ReactiveFormsModule, IonInputPasswordToggle]
})
export class LoginPage implements OnInit {
	credentials!: FormGroup;

	@Input() isFlipped: boolean = false;
	@Input() isHidden: boolean = true;
	@Input() pwdSatusLabel: string = 'Show password';
 
	@Output() flipCard = new EventEmitter<boolean>();
	@Output() showPwd = new EventEmitter<boolean>();

	constructor(
		public alertService: AlertService,
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
	) {}

	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

	ngOnInit() {
		let pwd: string;
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async register() {

		console.log('registering')

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
			this.alertDummy('Login failed', '', 'Please try again!', 'Ok');
			//console.log('Registration failed', 'Please try again!');
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
			this.alertDummy('Login failed', '', 'Please try again!', 'Ok');
			//console.log('Login failed', 'Please try again!');
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

	flip(face: string) {
		let cardFace = face;
		console.log(cardFace);
		if(cardFace === 'back'){
			this.alertDummy('DISCLAIMER', 
				'', 
				'Please provide a valid email address to make sure your profile is recoverable. All your data may become unreachable, otherwise.', 
				'Ack',
			);
		}
		this.isFlipped = !this.isFlipped;
		this.flipCard.emit(this.isFlipped);
	}

	alertDummy(ttl: string, subttl: string, msg: string, btn: string){
		setTimeout(() => {
			this.alertService.basicAlert(ttl, subttl, msg, [{text: btn}]);
		}, 500);
	}

	doSmthng(direction: any){
		console.log(direction)
		
	}
}
