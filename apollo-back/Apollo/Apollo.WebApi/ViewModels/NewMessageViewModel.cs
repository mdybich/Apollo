using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class NewMessageViewModel
    {
        public string Topic { get; set; }
        public string Content { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
    }
}