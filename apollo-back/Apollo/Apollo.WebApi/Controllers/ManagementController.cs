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
    [RoutePrefix("api/management")]
    public class ManagementController : ApiController
    {
        private ManagementService _service = null;

        public ManagementController()
        {
            _service = new ManagementService();
        }

        [HttpGet]
        [Route("albums")]
        public IHttpActionResult GetAlbumsForManagement()
        {
            var albums = _service.GetAlbumsForManagement();

            return Ok(albums);
        }

        [HttpGet]
        [Route("artists")]
        public IHttpActionResult GetArtists()
        {
            var artists = _service.GetArtists();

            return Ok(artists);
        }

        [HttpDelete]
        [Route("delete")]
        public IHttpActionResult DeleteAlbum(int id)
        {
            _service.DeleteAlbum(id);

            return Ok();
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddAlbum(NewAlbumViewModel album)
        {
            _service.AddAlbum(album);

            return Ok();
        }
    }
}
