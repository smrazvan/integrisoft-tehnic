import { Reservation } from './Reservation';

export class PagedResult {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  result: Reservation[];
}
