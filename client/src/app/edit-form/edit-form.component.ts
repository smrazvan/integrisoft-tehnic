import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { dateValidator } from '../custom-validators/date-validator';
import { ReservationService } from '../services/reservations.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/Reservation';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent {
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  id = this.route.snapshot.paramMap.get('id');
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
    if (this.id) {
      this.reservationService
        .getById(+this.id)
        .subscribe((reservation: Reservation) => {
          console.log(reservation);
          this.reservationForm = new FormGroup(
            {
              firstName: new FormControl(reservation.firstName, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(20),
              ]),
              lastName: new FormControl(reservation.lastName, [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(20),
              ]),
              cnp: new FormControl(reservation.cnp, [
                Validators.required,
                Validators.pattern(
                  /^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$/
                ),
              ]),
              phoneNumber: new FormControl(reservation.phoneNumber, [
                Validators.required,
                Validators.maxLength(10),
              ]),
              roomNumber: new FormControl(reservation.roomNumber, [
                Validators.required,
              ]),
              startDate: new FormControl(moment(reservation.startDate), [
                Validators.required,
              ]),
              endDate: new FormControl(moment(reservation.endDate), [
                Validators.required,
              ]),
            },
            dateValidator
          );
          console.log(this.reservationForm);
        });
    }
    //this.reservationService.getById();
  }
  onSubmit() {
    const data = {
      ...this.reservationForm.value,
      id: this.id,
      startDate: this.reservationForm.value.startDate.toDate(),
      endDate: this.reservationForm.value.endDate.toDate(),
    };
    this.reservationService.edit(data);
  }
}
