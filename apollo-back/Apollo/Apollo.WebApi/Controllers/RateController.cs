using Apollo.WebApi.Services;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Apollo.WebApi.Controllers
{
    [RoutePrefix("api/Rate")]
    public class RateController : ApiController
    {
        private RatingService _service = null;

        public RateController()
        {
            _service = new RatingService();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("album")]
        public IHttpActionResult RateAlbum(RateViewModel vm)
        {
            _service.RateAlbum(vm);

            return Ok();
        }

        [HttpGet]
        [Route("current")]
        public  IHttpActionResult GetCurrentRating([FromUri] SearchRatingViewModel searchData)
        {
            var rating = _service.GetCurrentRating(searchData);

            return Ok(rating);
        }
    }
}
