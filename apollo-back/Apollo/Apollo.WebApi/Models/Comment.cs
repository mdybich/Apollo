using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateAdded { get; set; }

        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}