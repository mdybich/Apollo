using Apollo.WebApi.Services;
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
    }
}
