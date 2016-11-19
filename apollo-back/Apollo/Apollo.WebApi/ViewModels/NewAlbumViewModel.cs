using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class NewAlbumViewModel
    {
        public string Name { get; set; }
        public string ArtistName { get; set; }
        public int? ArtistId { get; set; }
        public int Year { get; set; }
        public int StyleId { get; set; }
        public float Duration { get; set; }
    }
}