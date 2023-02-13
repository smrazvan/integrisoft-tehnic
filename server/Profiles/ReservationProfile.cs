using AutoMapper;
using Bookinger.Entities;
using Bookinger.Models;

namespace Bookinger.Profiles
{
    public class ReservationProfile : Profile
    {
        public ReservationProfile()
        {
            CreateMap<AddReservationDto, Reservation>();
            CreateMap<UpdateReservationDto, Reservation>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
