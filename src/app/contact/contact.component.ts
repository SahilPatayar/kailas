import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) { 
    this.createForm()
  }

  ngOnInit() {
  }

  createForm(): void {
    this.feedBackForm = this.formBuilder.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      telNum: ['', Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contactType: 'None',
      message: ''
    });
  }

  onSubmit(): void {
    this.feedBack = this.feedBackForm.value;
    console.log(this.feedBack);
    this.feedBackForm.reset();
  }

}
