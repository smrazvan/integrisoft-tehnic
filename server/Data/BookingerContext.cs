using Bookinger.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bookinger.Data
{
    public class BookingerContext : DbContext
    {
        public BookingerContext(DbContextOptions<BookingerContext> options) : base(options)
        {

        }

        public DbSet<Reservation> Reservations { get; set; }
    }
}
