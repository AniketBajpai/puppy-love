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

  @Output()
  private otp = new EventEmitter<string>();
  @Output()
  private signup = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    // Create Form
    this.otpForm = this.fb.group({
      phone: ['', Validators.required],
    });
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.compose([Validators.maxLength(1), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      authCode: ['', Validators.required],
    });
  }

  onOTP() {
    this.otp.emit(this.otpForm.value.phone);
    // this.snackBar.open(this.otpForm.value.phone, '', {duration: 3000});
  }

  onSignup() {
    const { authCode, password, email, name, gender } = this.signupForm.value;
    const roll = this.otpForm.value.phone;
    console.log("Roll: " + roll);
    

    const beginData = Crypto.fromJson({
      choices: []
    });

    const crypto = new Crypto(password);
    // const crypto2 = new Crypto(ccpass);

    const passHash = Crypto.hash(Crypto.hash(Crypto.hash(password)));

    crypto.newKey();

    // Store encrypted private key, public key, and encrypted empty data
    const body = {
      roll,
      name,
      gender,
      email,
      passHash,
      authCode,
      privKey: crypto.encryptSym(crypto.serializePriv()),
      pubKey: crypto.serializePub(),
      // savePass: crypto2.encryptSym(password),
      data: crypto.encryptSym(beginData)
    };

    this.signup.emit(body);
  }

}
