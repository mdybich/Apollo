using Apollo.WebApi.Models;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class RatingService : BaseService
    {
        public void RateAlbum(RateViewModel rate)
        {
            if (rate.UserId == null)
            {
                throw new Exception("User can not be null!");
            }

            if (rate.Rating < 1 || rate.Rating > 10)
            {
                throw new Exception("Rating has to be between 1 and 10!");
            }
        
            var currentRate = _db.Ratings.SingleOrDefault(r => r.AlbumId == rate.AlbumId && r.UserId == rate.UserId);

            if (currentRate == null)
            {
                var ratingToDb = new Rating()
                {
                    UserId = rate.UserId,
                    AlbumId = rate.AlbumId,
                    Rate = rate.Rating,
                    DateAdded = DateTime.Now
                };

                _db.Ratings.Add(ratingToDb);
            }
            else
            {
                currentRate.Rate = rate.Rating;
                currentRate.DateAdded = DateTime.Now;
            }

            _db.SaveChanges();
        }

        public int? GetCurrentRating(SearchRatingViewModel searchData)
        {
            var rating = 
                _db.Ratings
                .SingleOrDefault(r => r.AlbumId == searchData.AlbumId && r.UserId == searchData.UserId);

            if (rating != null)
            {
                return rating.Rate;
            } else
            {
                return null;
            }

        }
    }
}