using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.ViewModels
{
    public class CommentListViewModel
    {
        public int AlbumId { get; set; }
        public string AlbumName { get; set; }
        public string ArtistName { get; set; }
        public List<CommentViewModel> Comments { get; set; }
    }
}