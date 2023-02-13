using Bookinger.Data;
using Bookinger.Entities;
using Bookinger.Models;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Bookinger.Services
{
    public class CheckAvailability
    {
        private readonly BookingerContext _bookingerContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CheckAvailability(BookingerContext bookingerContext)
        {
            _bookingerContext = bookingerContext;
        }

        public bool Verify(Reservation reservation)
        {
            var a = new DateRange(reservation.StartDate, reservation.EndDate);
            if ((a.End - a.Start).TotalHours < 4)
            {
                return false;
            }
            var overlap = _bookingerContext.Reservations.Where(res => res.RoomNumber == reservation.RoomNumber).Any(res =>
            (
                a.Start < res.EndDate && res.StartDate < a.End
            ));
            if (overlap)
            {
                return false;
            }
            return true;
        }


    }
}
