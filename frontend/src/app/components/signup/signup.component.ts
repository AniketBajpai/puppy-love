import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Crypto } from '../../crypto';

const passwordMatchValidator: ValidatorFn = (g: FormGroup) => {
   return g.get('password').value === g.get('password1').value ? null : { mismatch: true };
};

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
      password: ['', Validators.required],
      password1: ['', Validators.required],
      authCode: ['', Validators.required],
    }, { validator: passwordMatchValidator });
  }

  onOTP() {
    this.otp.emit(this.otpForm.value.phone);
    // this.snackBar.open(this.otpForm.value.phone, '', {duration: 3000});
  }

  onSignup() {
    const { authCode, password, email, name } = this.signupForm.value;
    const roll = this.otpForm.value.phone;

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
