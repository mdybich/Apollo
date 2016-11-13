using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class MessageViewModel
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public string SendingDate { get; set; }
        public string SenderUser { get; set; }
    }
}