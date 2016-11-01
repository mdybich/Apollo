using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class SearchService : BaseService
    {
        public IEnumerable<AlbumViewModel> GetTopAlbums()
        {
            var albums =
                _db.Ratings
                .GroupBy(r => r.Album)
                .Select(gr => new AlbumViewModel()
                {
                    Id = gr.Key.Id,
                    Artist = gr.Key.Artist.Name,
                    Duration = gr.Key.Duration,
                    Name = gr.Key.Name,
                    Style = gr.Key.Style.Name,
                    Year = gr.Key.Year,
                    TotalRating = (float)gr.ToList().Average(st => st.Rate)
                })
                .OrderByDescending(a => a.TotalRating)
                .Take(10);

            return albums;
        }
    }
}