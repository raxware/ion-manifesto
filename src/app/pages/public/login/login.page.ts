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
  imports: [ IonImg, IonInput, IonCheckbox, IonLabel, IonCol, 
	IonRow, IonGrid, IonCard, IonCardContent, IonButton, IonNote, 
	IonItem, IonContent, IonHeader, IonTitle, IonToolbar, 
	FormsModule, ReactiveFormsModule, IonInputPasswordToggle
	]
})
export class LoginPage implements OnInit {
	@Output() flipCard = new EventEmitter<boolean>();
	@Input() isFlipped: boolean = false;
	@Input() isHidden: boolean = true;

	credentials!: FormGroup;

	constructor(
		public alertService: AlertService,
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
	) {}

	get email() { return this.credentials.get('email'); }
	get password() { return this.credentials.get('password'); }

	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
	async signup() {
		const user = await this.authService.register(this.credentials.value);
		if (user) { this.router.navigateByUrl('/', { replaceUrl: true });} 
		else { this.alertDummy('Sign up failed', '', 'Please try again!', 'Ok');}
	}
	async signin() {
		const user = await this.authService.login(this.credentials.value);
		if (user) { this.router.navigateByUrl('/', { replaceUrl: true }); } 
		else { this.alertDummy('Sign in failed', '', 'Please try again!', 'Ok'); }
	}
	flip(face: string) {
		let cardFace = face;
		if(cardFace === 'back'){
			this.alertDummy('DISCLAIMER', 
				'',
				'Please provide a valid email address to make sure your profile is recoverable. All your data may become unreachable, otherwise.', ['Ack'],
			);
		}
		this.isFlipped = !this.isFlipped;
		this.flipCard.emit(this.isFlipped);
	}

	alertDummy(ttl: string, subttl: string, msg: string, btn: any){
		setTimeout(() => {
			this.alertService.basicAlert(ttl, subttl, msg, [{text: btn}]);
		}, 500);
	}

	doSmthng(direction: any){
		console.log(direction)
	}

}
