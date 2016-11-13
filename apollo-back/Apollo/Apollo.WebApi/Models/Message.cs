using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public DateTime SendingDate { get; set; }

        public string SenderUserId { get; set; }
        public string ReceiverUserId { get; set; }

        public virtual ApplicationUser SenderUser { get; set; }
        public virtual ApplicationUser ReceiverUser { get; set; }
    }
}