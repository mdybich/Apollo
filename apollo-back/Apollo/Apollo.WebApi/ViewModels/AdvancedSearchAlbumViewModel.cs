using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class AdvancedSearchAlbumViewModel
    {
        public string Name { get; set; }
        public string Artist { get; set; }
        public int? StyleId { get; set; }
        public int? YearFrom { get; set; }
        public int? YearTo { get; set; }
        public int? RatingFrom { get; set; }
        public int? RatingTo { get; set; }
    }
}