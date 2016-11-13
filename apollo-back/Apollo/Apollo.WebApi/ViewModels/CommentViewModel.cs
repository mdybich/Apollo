using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string DateAdded { get; set; }
        public string UserFullName { get; set; }
    }
}