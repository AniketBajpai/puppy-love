import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Crypto } from '../../crypto';

@Component({
  selector: 'puppy-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {

  otpForm: FormGroup;
  signupForm: FormGroup;

  phoneStore: any;

  @Output()
  private otp = new EventEmitter<string>();
  @Output()
  private signup = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) {
    // Create Form
    this.otpForm = this.fb.group({
      phone: [localStorage.getItem('phone'), Validators.required],
    });
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      authCode: ['', Validators.required],
    });
    this.phoneStore = localStorage.getItem('phone');
    console.log(this.phoneStore);
  }

  onOTP() {
    console.log('OTP request');
    console.log(this.otpForm.value.phone);
    if (!isNaN(this.otpForm.value.phone)) {
      if (this.otpForm.value.phone.length != 10) {
        this.snackbar.open('Please enter a valid phone number of 10 digits', '', { duration: 3000 });
        return;
      } 
    }
    else {
      this.snackbar.open('Please enter a valid phone number of 10 digits', '', { duration: 3000 });
      return;
    }
    this.otp.emit(this.otpForm.value.phone);
    localStorage.setItem('phone',this.otpForm.value.phone);
    this.phoneStore = this.otpForm.value.phone
    console.log('phoneStore');
    console.log(this.phoneStore);
  }

  onSignup() {
    const { authCode, password, email, name, gender } = this.signupForm.value;
    const roll = localStorage.getItem('phone');

    const beginData = Crypto.fromJson({
      choices: []
    });

    const crypto = new Crypto(password);
    // const crypto2 = new Crypto(ccpass);

    const passHash = Crypto.hash(Crypto.hash(Crypto.hash(password)));

    crypto.newKey();

    var code = "0";
    if(gender.toLowerCase() == 'm' || gender.toLowerCase() == 'male') {
      code = "1";
    }

    // Store encrypted private key, public key, and encrypted empty data
    const body = {
      roll,
      name,
      gender : code,
      email,
      passHash,
      authCode,
      privKey: crypto.encryptSym(crypto.serializePriv()),
      pubKey: crypto.serializePub(),
      // savePass: crypto2.encryptSym(password),
      data: crypto.encryptSym(beginData)
    };
    console.log(body);
    this.signup.emit(body);
  }

}
