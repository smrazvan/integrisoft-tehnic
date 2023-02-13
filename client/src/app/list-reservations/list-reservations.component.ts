import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservations.service';
import { PagedResult } from '../models/PagedResult';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css'],
})
export class ListReservationsComponent implements OnInit {
  constructor(private reservationService: ReservationService) {}

  loadedData: PagedResult;

  pageEvent: PageEvent;
  pageIndex: number = 0;
  page: number = this.pageIndex + 1;

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.fetchPosts(e.pageIndex + 1);
    console.log(e);
  }

  ngOnInit(): void {
    this.fetchPosts(this.page);
    this.reservationService.refreshReservations.subscribe(() => {
      this.fetchPosts(this.page);
    });
  }
  fetchPosts(page: number) {
    console.log('FETCH');
    this.reservationService.getAll(page).subscribe((data) => {
      this.loadedData = data as PagedResult;
    });
  }
}
