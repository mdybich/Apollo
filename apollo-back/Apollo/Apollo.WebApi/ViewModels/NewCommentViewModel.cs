using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class NewCommentViewModel
    {
        public string UserId { get; set; }
        public int AlbumId { get; set; }
        public string Content { get; set; }
    }
}