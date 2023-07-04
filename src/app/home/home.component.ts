import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";


const DEMO_PARAMS = {
	EMAIL: 'admin@gmail.com',
	PASSWORD: 'admin'
};
@Component({
	selector: 'kt-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
	// encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit,OnDestroy {


	loading = false;

	isFeatures = true;
	isAbout = true;
	isServices = true;
	isPricing = true;
	isContact = true;
	isHero = true;
	unsubscribe: Subject<any>;
	private returnUrl: any;

	private authStatus: any;

	constructor(
		private router: Router,
		//private authService: AuthService,
	//	private authNoticeService: AuthNoticeService,
		//private translate: TranslateService,
	//	private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		//private encryptionService: EncryptionService
	) {
		this.unsubscribe = new Subject();
	}
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
			this.authStatus = params.authService || undefined;
			if (this.authStatus != undefined) {
				// if (this.authStatus == "unavailable") {
				// 	this.authNoticeService.setNotice("Service Unavailable", 'danger')
				// } else {
				// 	this.authNoticeService.setNotice("Session Expired", 'danger')
				// }

			}
		});
	}

	ShowHideForHome() {
		this.isFeatures = true;
		this.isAbout = true;
		this.isServices = true;
		this.isPricing = true;
		this.isContact = true;
		this.isHero = true;
	}

	ShowHideForFeatures() {
		console.log("hello")
		this.isHero = false;
		this.isFeatures = true;
		this.isAbout = false;
		this.isServices = false;
		this.isPricing = false;
		this.isContact = false;
	}

	ShowHideForAbout() {
		this.isHero = false;
		this.isFeatures = false;
		this.isAbout = true;

		this.isServices = false;
		this.isPricing = false;
		this.isContact = false;
	}

	ShowHideForExam() {
		this.isHero = false;
		this.isFeatures = false;
		this.isAbout = false;
		this.isServices = true;
		this.isPricing = false;
		this.isContact = false;
	}

	ShowHideForPricing() {
		this.isHero = false;
		this.isFeatures = false;
		this.isAbout = false;
		this.isServices = false;
		this.isPricing = true;
		this.isContact = false;
	}

	ShowHideForContact() {
		this.isHero = false;
		this.isFeatures = false;
		this.isAbout = false;
		this.isServices = false;
		this.isPricing = false;
		this.isContact = true;
	}

	loginForm: FormGroup;
	initLoginForm() {
		// demo message to show		

		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				//Validators.email,
				// Validators.minLength(3),
				// Validators.maxLength(320),				
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				// Validators.minLength(3),
				// Validators.maxLength(20),
				//Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$")
			])
			]
		});
	}

	loginUser() {
	// 	const controls = this.loginForm.controls;
	// 	/** check form */
	// 	if (this.loginForm.invalid) {
	// 		Object.keys(controls).forEach(controlName =>
	// 			controls[controlName].markAsTouched()
	// 		);
	// 		return;
	// 	}

	// 	const authData = {
	// 		address: "",
	// 		createdBy: 0,
	// 		createdDate: "",
	// 		deleted: "N",
	// 		deletedDate: "",
	// 		deteledBy: 0,
	// 		email: controls.email.value,
	// 		// password: this.encryptionService.encrypt(controls.password.value)
	// 		password: controls.password.value,
	// 		fname: "",
	// 		gender: "",
	// 		id: 0,
	// 		lastName: "",

	// 		phone: "",
	// 		updatedBy: 0,
	// 		updatedDate: ""

	// 	};

	// 	this.authService
	// 		.login(authData)
	// 		.pipe(
	// 			tap(user => {
	// 				if (user['status']) {
	// 					localStorage.isLoggedIn = true;
	// 					let userData = user["userList"][0];
	// 					localStorage.userName = userData.email;
	// 					localStorage.userId = userData.id;
	// 					localStorage.password = userData.password;
	// 					localStorage.roles = userData.roles.id;
	// 					// this.store.dispatch(new Login({authToken: user.accessToken}));											
	// 					this.router.navigate(['/dashboard']); // Main page
	// 					// this.router.navigate(this.returnUrl);
	// 				} else {
	// 					localStorage.isLoggedIn=false;
	// 					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
	// 				}
	// 			}),

	// 			takeUntil(this.unsubscribe),
	// 			finalize(() => {
	// 				this.loading = false;
	// 				this.cdr.markForCheck();
	// 			})
	// 		)
	// 		.subscribe((response) => { }, (error: ErrorModel) => {

	// 			for (let index = 0; index < error.errorCodes.length; index++) {
	// 				this.authNoticeService.setNotice(this.translate.instant(error.getErrorCodeKey(index)), 'danger');
	// 			}
	// 		});
	// }

	// isControlHasError(controlName: string, validationType: string): boolean {
	// 	const control = this.loginForm.controls[controlName];
	// 	if (!control) {
	// 		return false;
	// 	}
	// 	const result = control.hasError(validationType) && (control.dirty || control.touched);
	// 	return result;
	}

	ngOnDestroy() {
        this.unsubscribe.forEach(sb => sb.unsubscribe());
    }

}