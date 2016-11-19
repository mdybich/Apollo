using Apollo.WebApi.Models;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Apollo.WebApi.Services
{
    public class ManagementService : BaseService
    {
        public IEnumerable<ManagementAlbumViewModel> GetAlbumsForManagement()
        {
            var albums =
                _db.Albums
                .Where(a => a.IsDeleted == false)
                .OrderByDescending(a => a.DateAdded)
                .ToList()
                .Select(a => new ManagementAlbumViewModel()
                {
                    Id = a.Id,
                    Name = a.Name,
                    Artist = a.Artist.Name,
                    DateAdded = a.DateAdded.ToShortDateString()
                });

            return albums;
        }

        public IEnumerable<ArtistViewModel> GetArtists()
        {
            var artists =
                _db.Artists
                .OrderBy(a => a.Name)
                .Select(a => new ArtistViewModel()
                {
                    Id = a.Id,
                    Name = a.Name
                });

            return artists;
        }

        public void DeleteAlbum(int albumId)
        {
            var albumToDelete =
                _db.Albums
                .SingleOrDefault(a => a.Id == albumId && a.IsDeleted == false);

            if (albumToDelete == null)
            {
                throw new Exception("Album to delete can not be found");
            }

            albumToDelete.IsDeleted = true;

            _db.SaveChanges();
        }

        public void AddAlbum(NewAlbumViewModel newAlbum)
        {
            if (newAlbum.ArtistId == null && string.IsNullOrEmpty(newAlbum.ArtistName))
            {
                throw new Exception("Artist has to be specified!");
            }

            var albumToDb = new Album()
            {
                Name = newAlbum.Name,
                Year = newAlbum.Year,
                Duration = newAlbum.Duration,
                StyleId = newAlbum.StyleId,
                IsDeleted = false,
                DateAdded = DateTime.Now
            };

            if (newAlbum.ArtistId != null)
            {
                albumToDb.ArtistId = (int)newAlbum.ArtistId;
            }
            else
            {
                var newArtist = new Artist()
                {
                    Name = newAlbum.ArtistName
                };

                albumToDb.Artist = newArtist;
            }

            _db.Albums.Add(albumToDb);
            _db.SaveChanges();
        }
    }
}