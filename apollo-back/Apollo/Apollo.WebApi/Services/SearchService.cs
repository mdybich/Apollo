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
                .Where(r => r.Album.IsDeleted == false)
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
                .OrderByDescending(a => a.TotalRating);

            return albums;
        }

        public IEnumerable<AlbumViewModel> SearchAlbum(SearchAlbumViewModel searchData)
        {
            var albums =
                _db.Albums
                .Where(a => (a.Name.Contains(searchData.SearchPhrase) || a.Artist.Name.Contains(searchData.SearchPhrase)) && a.IsDeleted == false)
                .Select(a => new AlbumViewModel()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Artist = a.Artist.Name,
                    Duration = a.Duration,
                    Style = a.Style.Name,
                    Year = a.Year,
                    TotalRating = a.Ratings.Any() ? (float)a.Ratings.Average(r => r.Rate) : 0
                });

            return albums;
        }

        public IEnumerable<AlbumViewModel> AdvancedSearchAlbum(AdvancedSearchAlbumViewModel searchData)
        {
            var albums =
                _db.Albums
                .Where(
                    a =>
                    (a.IsDeleted == false) &&
                    (searchData.StyleId != null ? a.StyleId == searchData.StyleId : true) &&
                    (searchData.Name != null ? a.Name.Contains(searchData.Name) : true) &&
                    (searchData.Artist != null ? a.Artist.Name.Contains(searchData.Artist) : true) &&
                    (searchData.YearTo != null && searchData.YearFrom != null ? (a.Year >= searchData.YearFrom && a.Year <= searchData.YearTo) : true) &&
                    (searchData.YearTo != null && searchData.YearFrom == null ? a.Year <= searchData.YearTo : true) &&
                    (searchData.YearTo == null && searchData.YearFrom != null ? a.Year >= searchData.YearFrom : true) &&
                    (searchData.RatingFrom != null && searchData.RatingTo != null ? (a.Ratings.Any() ? a.Ratings.Average(r => r.Rate) >= searchData.RatingFrom && a.Ratings.Average(r => r.Rate) <= searchData.RatingTo : false) : true) &&
                    (searchData.RatingFrom != null && searchData.RatingTo == null ? (a.Ratings.Any() ? a.Ratings.Average(r => r.Rate) >= searchData.RatingFrom : false) : true) &&
                    (searchData.RatingFrom == null && searchData.RatingTo != null ? (a.Ratings.Any() ? a.Ratings.Average(r => r.Rate) <= searchData.RatingTo : true) : true)
                    )
                .Select(a => new AlbumViewModel()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Artist = a.Artist.Name,
                    Duration = a.Duration,
                    Style = a.Style.Name,
                    Year = a.Year,
                    TotalRating = a.Ratings.Any() ? (float)a.Ratings.Average(r => r.Rate) : 0
                })
                .OrderByDescending(a => a.TotalRating);

            return albums;
        }

        public IEnumerable<AlbumViewModel> GetAlbumPropositions(string userId)
        {
            var albumsIdAlreadyRated =
                _db.Ratings
                .Where(r => r.UserId == userId)
                .Select(r => r.AlbumId);

            var users =
                _db.Users
                .Where(u => u.Id != userId && u.Ratings.Any(r => albumsIdAlreadyRated.Contains(r.AlbumId)))
                .Select(u => u.Id)
                .Distinct()
                .ToList();

            var albumsIdRatedByOtherUsers =
                _db.Ratings
                .Where(u => u.UserId != userId && users.Contains(u.UserId))
                .Select(r => r.AlbumId)
                .Distinct()
                .ToList();

            var albumsId = albumsIdRatedByOtherUsers.Except(albumsIdAlreadyRated);

            var albums = 
                _db.Albums
                .Where(a => albumsId.Contains(a.Id) && a.IsDeleted == false)
                .Select(a => new AlbumViewModel()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Artist = a.Artist.Name,
                    Duration = a.Duration,
                    Style = a.Style.Name,
                    Year = a.Year,
                    TotalRating = a.Ratings.Any() ? (float)a.Ratings.Average(r => r.Rate) : 0
                });


            return albums;

        }
    }
}