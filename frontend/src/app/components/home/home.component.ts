import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatChipInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MainService, Person } from '../../services/main.service';

function ImageURL(rollnum: string, userid: string) {
    const iitkhome = `http://home.iitk.ac.in/~${ userid }/dp`;
    const oaimage = `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${ rollnum }_0.jpg`;
    return `url("${ iitkhome }"), url("${ oaimage }")`;
}

@Component({
  selector: 'puppy-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  user$: any;
  addForm: FormGroup;

    constructor(private main: MainService,
                private fb: FormBuilder,
                private sanitizer: DomSanitizer,
                private snackbar: MatSnackBar) {

    // Create Form
    this.addForm = this.fb.group({
      contact: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log('Main component init');
    console.log(this.main.user$);
    this.user$ = this.main.user$;
    // this.doSubmit();
  }

  get url() {
    const currentUser = {
      ...this.main.user$.value
    };
    return this.sanitizer.bypassSecurityTrustStyle(ImageURL(currentUser._id, currentUser.email));
  }

  maleHearts(user) {
    return user.data.received.filter((x) => x.genderOfSender === '1');
  }

  femaleHearts(user) {
    return user.data.received.filter((x) => x.genderOfSender === '0');
  }

  add(): void {
    console.log('Adding Event');
    console.log(this.addForm.value.contact);

    const currentUser = {
      ...this.main.user$.value
    };
    console.log('User Id');
    console.log(currentUser._id)

    var event_user : Person = {
      _id : "",
      name : "",
      email : ""
    };

    if(!this.addForm.value.contact) {
      return;
    }

    // Remove spaces and remove +91
    this.addForm.value.contact = this.addForm.value.contact.replace(/\s/g,'').replace('+91', '')

    if (!isNaN(this.addForm.value.contact)) {
      if (this.addForm.value.contact.length != 10) {
        this.snackbar.open('Please enter a valid number of 10 digits', '', { duration: 3000 });
        return;
      } 
      else {
        console.log('Phone Detected')
      }
    } else {
      if (this.addForm.value.contact.indexOf('@') != -1 && this.addForm.value.contact.indexOf('.') != -1) {
        console.log('Email Detected')
        event_user.email = "true";
      }
      else {
        this.snackbar.open('Please enter a valid email', '', { duration: 3000 });
        return;
      }
    }

    if (this.addForm.value.contact !== currentUser._id && this.addForm.value.contact !== currentUser.email && !currentUser.data.choices.some((x) => x._id === this.addForm.value.contact)) {
      console.log('Push is approved');
      event_user._id = this.addForm.value.contact;
      console.log(event_user);
      currentUser.data.choices.push(event_user);
      this.main.user$.next(currentUser);
      this.snackbar.open('Added Contact', '', { duration: 3000 });
    }
    console.log(this.main.user$);
  }

  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   const currentUser = {
  //     ...this.main.user$.value
  //   };
  //   if ((value || '').trim()) {
  //     currentUser.data.choices.push({ _id: value.trim(), name: 'Foobar', email: 'foobar' });
  //     this.main.user$.next(currentUser);
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  remove(fruit: any): void {
    const currentUser = {
      ...this.main.user$.value
    };

    if (currentUser.submitted) {
      return;
    }

    const index = currentUser.data.choices.indexOf(fruit);

    if (index >= 0) {
      currentUser.data.choices.splice(index, 1);
      this.main.user$.next(currentUser);
    }
  }

  doSubmit() {
    const user = this.user$.value;
    console.log("doSubmit");
    console.log(user);
    
    if (user.submitted) {
      this.main.submit().subscribe(
        () => console.log('Autosubmission.'),
        (error) => this.snackbar.open('An error occurred: ' + error, '', { duration: 3000 })
      );
    }
  }

  onSubmit() {
    // if(!window.confirm('This will finalize your choices, you cannot change them afterwards. Proceed?')) {
    //   // If you've seen this, you can assume that you've understood all the code here.
    //   return;
    // }
    this.snackbar.open('Submitting, please wait...');
    this.main.submit().subscribe(
      () => this.snackbar.open('Submitted.', '', { duration: 3000 }),
      (error) => this.snackbar.open('An error occurred: ' + error, '', { duration: 3000 })
    );
  }

  onSave() {
    this.snackbar.open('Saving your info, please wait...');
    this.main.save().then(() => this.snackbar.open('Saved your info.', '', { duration: 3000 }));
  }

  onLogout() {
    location.reload();
  }
}
