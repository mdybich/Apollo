using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Models
{
    public class Album
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public DateTime DateAdded { get; set; }
        public float Duration { get; set; }

        public int ArtistId { get; set; }
        public virtual Artist Artist { get; set; }

        public int StyleId { get; set; }
        public virtual Style Style { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}