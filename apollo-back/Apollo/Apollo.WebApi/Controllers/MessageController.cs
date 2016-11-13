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
    [RoutePrefix("api/Message")]
    public class MessageController : ApiController
    {
        private MessageService _service = null;

        public MessageController()
        {
            _service = new MessageService();
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get/{userId}")]
        public IHttpActionResult GetMessages(string userId)
        {
            var messages = _service.GetMessages(userId);

            return Ok(messages);
        }

        [HttpGet]
        [Route("receivers/{userId}")]
        public IHttpActionResult GetReceivers(string userId)
        {
            var receivers = _service.GetReceivers(userId);

            return Ok(receivers);
        }

        [HttpPost]
        [Route("send")]
        public IHttpActionResult SendMessage(NewMessageViewModel message)
        {
            _service.SendMessage(message);

            return Ok();
        }

    }
}
