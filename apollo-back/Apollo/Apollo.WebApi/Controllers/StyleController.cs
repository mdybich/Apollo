using Apollo.WebApi.Services;
using System.Web.Http;

namespace Apollo.WebApi.Controllers
{
    [RoutePrefix("api/styles")]
    public class StyleController : ApiController
    {
        private StyleService _service = null;

        public StyleController()
        {
            _service = new StyleService();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get")]
        public IHttpActionResult GetStyles()
        {
            var styles = _service.GetStyles();

            return Ok(styles);
        }
    }
}
