using Apollo.WebApi.Services;
using Apollo.WebApi.ViewModels;
using System.Web.Http;

namespace Apollo.WebApi.Controllers
{
    [RoutePrefix("api/comment")]
    public class CommentController : ApiController
    {
        private CommentService _service = null;

        public CommentController()
        {
            _service = new CommentService();
        }

        [HttpGet]
        [Route("get/{id}")]
        public IHttpActionResult GetComments(int id)
        {
            var comments = _service.GetComments(id);

            return Ok(comments);
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddComment(NewCommentViewModel vm)
        {
            _service.AddNewComment(vm);

            return Ok();
        }
    }
}
