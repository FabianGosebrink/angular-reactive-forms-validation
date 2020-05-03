import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Room } from './rooms';
import { AbstractControl } from '@angular/forms';
import { RoomOver18Validator } from './room-over-18.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'forms-cross-field-validation';
  profileForm: FormGroup;

  rooms: Room[] = [
    { text: 'room 1', value: 'room-1' },
    { text: 'room 2', value: 'room-2' },
    { text: 'room 3', value: 'room-3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private roomOver18Validator: RoomOver18Validator
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', [Validators.required, NoNegativeNumbers]],
        room: [{}, Validators.required],
      },
      {
        validators: [this.roomOver18Validator.onlyAccessRoomsOver18(18)],
        updateOn: 'blur',
      }
    );
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}

export function NoNegativeNumbers(control: AbstractControl) {
  return control.value < 0 ? { negativeNumber: true } : null;
}
