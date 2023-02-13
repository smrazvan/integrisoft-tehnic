namespace Bookinger.Models
{
    public class DateRange
    {
        public DateTimeOffset Start { get; set; }
        public DateTimeOffset End { get; set; }


        public DateRange(DateTimeOffset start, DateTimeOffset end)
        {
            Start = start;
            End = end;
        }
    }
}
