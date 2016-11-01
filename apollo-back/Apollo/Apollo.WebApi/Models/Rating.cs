using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Rate { get; set; }
        public DateTime DateAdded { get; set; }

        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}