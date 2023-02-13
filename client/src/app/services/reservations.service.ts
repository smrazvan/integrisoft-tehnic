import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Reservation } from '../models/Reservation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  @Output() refreshReservations = new EventEmitter();

  baseUrl = 'http://localhost:5214/Reservations';
  create(reservation: Reservation) {
    this.http
      .post(`${this.baseUrl}/add`, reservation)
      .subscribe((responseData) => {
        console.log(responseData);
        this.snackBar.open('Reservation was added', '', {
          duration: 3000,
        });
        this.refreshReservations.emit();
      });
  }

  getAll(page: number = 1) {
    return this.http.get(`${this.baseUrl}/?page=${page}`);
  }

  getById(id: number) {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }

  edit(reservation: Reservation) {
    this.http
      .put(`${this.baseUrl}/update`, reservation)
      .subscribe((reservation) => {
        this.snackBar.open('Reservation was edited', '', {
          duration: 3000,
        });
      });
  }
}
