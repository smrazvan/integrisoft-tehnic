using System.ComponentModel.DataAnnotations;

namespace Bookinger.Models
{
    public class UpdateReservationDto
    {
        [Required]
        public int Id { get; set; }

        [StringLength(20, MinimumLength = 3, ErrorMessage = "Numele este prea mic")]
        public string? FirstName { get; set; }

        [StringLength(20, MinimumLength = 1, ErrorMessage = "Numele necesita cel putin initiala")]
        public string? LastName { get; set; }

        [RegularExpression(@"^[1-9]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d|5[0-2]|99)(00[1-9]|0[1-9]\d|[1-9]\d\d)\d$", ErrorMessage = "CNP-ul nu este valid.")]
        public string? CNP { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }

        [Range(1, 200)]
        public int? RoomNumber { get; set; }

        public DateTimeOffset? StartDate { get; set; }

        public DateTimeOffset? EndDate { get; set; }
    }
}
