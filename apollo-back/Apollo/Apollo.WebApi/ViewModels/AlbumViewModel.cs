using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class AlbumViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Duration { get; set; }
        public int Year { get; set; }
        public float TotalRating { get; set; }
        public string Style { get; set; }
        public string Artist { get; set; }
    }
}