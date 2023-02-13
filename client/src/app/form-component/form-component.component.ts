import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { dateValidator } from '../custom-validators/date-validator';
import { ReservationService } from '../services/reservations.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})
export class FormComponentComponent implements OnInit {
  constructor(private reservationService: ReservationService) {}

  reservationForm: FormGroup;

  public date: moment.Moment;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  minStartDate: moment.Moment = moment();
  minEndDate: moment.Moment = (() => {
    let minEnd = new Date();
    minEnd.setHours(minEnd.getHours() + 4);
    return moment(minEnd.toString());
  })();
  maxDate: moment.Moment;
  public color: ThemePalette = 'primary';

  ngOnInit(): void {
    this.reservationForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ]),
        cnp: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/
          ),
        ]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
        ]),
        roomNumber: new FormControl(null, [Validators.required]),
        startDate: new FormControl(this.minStartDate, [Validators.required]),
        endDate: new FormControl(this.minEndDate, [Validators.required]),
      },
      dateValidator
    );
  }
  onSubmit() {
    const data = {
      ...this.reservationForm.value,
      startDate: this.reservationForm.value.startDate.toDate(),
      endDate: this.reservationForm.value.endDate.toDate(),
    };
    console.log(data);
    console.log(this.reservationForm);
    this.reservationService.create(data);
  }
}
