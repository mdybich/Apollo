using Apollo.WebApi.Services;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Apollo.WebApi.Controllers
{
    [RoutePrefix("api/Search")]
    public class SearchController : ApiController
    {
        private SearchService _service = null;

        public SearchController()
        {
            _service = new SearchService();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("Top")]
        public IHttpActionResult GetTop()
        {
            var albums = _service.GetTopAlbums();

            return Ok(albums);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("album")]
        public IHttpActionResult Search([FromUri] SearchAlbumViewModel searchData)
        {
            var albums = _service.SearchAlbum(searchData);

            return Ok(albums);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("advance/album")]
        public IHttpActionResult AdvancedSearch([FromUri] AdvancedSearchAlbumViewModel searchData)
        {
            var albums = _service.AdvancedSearchAlbum(searchData);

            return Ok(albums);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("propositions/{userId}")]
        public IHttpActionResult GetAlbumPropositions(string userId)
        {
            var albums = _service.GetAlbumPropositions(userId);

            return Ok(albums);
        }
    }
}
