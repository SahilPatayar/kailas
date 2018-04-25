import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedBackForm: FormGroup;
  feedBack: Feedback;
  contactType = ContactType;

  formErrors = {
    firstName: '',
    lastName: '',
    email: '',
    telNum: ''
  };

  validationMessages = {
    firstName: {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    lastName: {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    telNum: {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    email: {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    }
  };

  constructor(private formBuilder: FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedBackForm = this.formBuilder.group({
      firstName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ] ],
      telNum: ['', [ Validators.required, Validators.pattern("^[0-9]*$") ] ],
      email: ['', [ Validators.required, Validators.email ] ],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedBackForm.valueChanges.subscribe(data => this.onValueChange(data));
    this.onValueChange();
  }

  onValueChange(data?: any): void {
    if(!this.feedBackForm) {
      return;
    }

    const form = this.feedBackForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

  }

  onSubmit(formDirective: FormGroupDirective): void {
    this.feedBack = this.feedBackForm.value;
    console.log(this.feedBack);
    this.feedBackForm.reset();
    formDirective.resetForm();
  }

}
