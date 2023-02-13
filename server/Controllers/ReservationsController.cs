using AutoMapper;
using Bloggr.Domain.Models;
using Bloggr.Infrastructure.Services;
using Bookinger.Data;
using Bookinger.Entities;
using Bookinger.Models;
using Bookinger.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Bookinger.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly CheckAvailability _checkAvailability;
        private readonly IMapper _mapper;
        private readonly BookingerContext _bookingerContext;

        public ReservationsController(IMapper mapper, BookingerContext bookingerContext, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _bookingerContext = bookingerContext;
            _checkAvailability = new CheckAvailability(_bookingerContext);
        }

        [HttpGet]
        public async Task<ActionResult<Reservation>> Get([FromQuery] int page = 1)
        {
            var reservations = _bookingerContext.Reservations.AsQueryable();
            var pageDto = new PageModel {
                PageNumber = page,
                PageSize = 10,
            };
            var pagedResult = await PagedResult.FromAsync(reservations, pageDto);
            return Ok(pagedResult);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetById(int id)
        {
            var result = await _bookingerContext.Reservations.FindAsync(id);
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<ActionResult<Reservation>> Create([FromBody] AddReservationDto reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mappedReservation = _mapper.Map<Reservation>(reservation);
            mappedReservation.StartDate.AddHours(2);
            mappedReservation.EndDate.AddHours(2);

            if (!_checkAvailability.Verify(mappedReservation))
            {
                ModelState.AddModelError("availability", "The period for the room is not available");
                return BadRequest(ModelState);
            }

            _bookingerContext.Reservations.Add(mappedReservation);
            await _bookingerContext.SaveChangesAsync();
            return Ok(mappedReservation);
        }

        [HttpPut("update")]
        public async Task<ActionResult<Reservation>> Update([FromBody] UpdateReservationDto reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existing = await _bookingerContext.Reservations.FindAsync(reservation.Id);
            var res = _mapper.Map<Reservation>(reservation);
            res.StartDate.AddHours(2);
            res.EndDate.AddHours(2);
            if (!_checkAvailability.Verify(res))
            {
                ModelState.AddModelError("availability", "The period for the room is not available");
                return BadRequest(ModelState);
            }
            _mapper.Map<UpdateReservationDto, Reservation>(reservation, existing);
            //_bookingerContext.Entry(existing).CurrentValues.SetValues(reservation);
            await _bookingerContext.SaveChangesAsync();
            return existing;
        }
    }
}