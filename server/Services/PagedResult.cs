using Bloggr.Domain.Models;
using Bookinger.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bloggr.Infrastructure.Services
{
    public class PagedResult
    {
        public int TotalCount { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int PageNumber { get; set; }

        public List<Reservation> Result { get; set; }

        public static async Task<PagedResult> FromAsync(IQueryable<Reservation> query, PageModel pageDto)
        {
            var pagedResult = new PagedResult();
            var totalCount = await query.CountAsync();
            pagedResult.TotalCount = totalCount;

            pagedResult.Result = await Paginate(query, pageDto).ToListAsync();
            pagedResult.PageNumber = pageDto.PageNumber;
            pagedResult.PageSize = pageDto.PageSize;
            pagedResult.TotalPages = (totalCount / pagedResult.PageSize) + (totalCount % pagedResult.PageSize == 0 ? 0 : 1);

            return pagedResult;
        }

        private static IQueryable<Reservation> Paginate(IQueryable<Reservation> query, PageModel pageDto)
        {
            return query.OrderByDescending(x => x.Id).Skip((pageDto.PageNumber - 1) * pageDto.PageSize).Take(pageDto.PageSize);
        }
    }
}
