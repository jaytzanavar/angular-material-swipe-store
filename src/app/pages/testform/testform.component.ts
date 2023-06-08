import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, NgForm, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/models/UserInfo.model';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TestformComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  registerForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    roleId: [1, Validators.required]
  })

  roles = [
    { id: 1, title: 'dev' },
    { id: 2, title: 'qa' }
    , { id: 3, title: 'test' }
  ]

  userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 0,
    passport: '',
    fullAddress: '',
    city: '',
    postCode: 0
  }

  ngOnInit(): void {
    this.registerForm.get('roleId')?.valueChanges.subscribe((val) => {

    })
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  onSubmitForm(form: NgForm) {
    console.log(form);
  }

  onSubmit() {
    console.log(this.registerForm.value);
    console.log(this.registerForm.invalid);
  }


}
