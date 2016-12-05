using Apollo.WebApi.Models;
using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class CommentService : BaseService
    {
        public CommentListViewModel GetComments(int albumId)
        {
            var album = _db.Albums.SingleOrDefault(a => a.Id == albumId);

            if (album == null)
            {
                throw new Exception("Can not find album!");
            }

            var comments =
                _db.Comments
                .Where(c => c.AlbumId == albumId)
                .OrderByDescending(c => c.DateAdded)
                .ToList()
                .Select(c => new CommentViewModel()
                {
                    Id = c.Id,
                    UserFullName = $"{c.User.FirstName} {c.User.LastName}",
                    Content = c.Content,
                    DateAdded = c.DateAdded.ToShortDateString()
                });

            var commentList = new CommentListViewModel()
            {
                AlbumId = album.Id,
                AlbumName = album.Name,
                ArtistName = album.Artist.Name,
                Comments = comments.ToList()
            };

            return commentList;
        }

        public void AddNewComment(NewCommentViewModel vm)
        {
            var comment = new Comment()
            {
                UserId = vm.UserId,
                AlbumId = vm.AlbumId,
                Content = vm.Content,
                DateAdded = DateTime.Now
            };

            _db.Comments.Add(comment);

            _db.SaveChanges();
        }

        public void EditComment(EditCommentViewModel vm)
        {
            var comment = _db.Comments.SingleOrDefault(c => c.Id == vm.Id);

            if (comment == null)
            {
                throw new Exception("Can not find comment to edit!");
            }

            comment.Content = vm.Content;

            _db.SaveChanges();
        }
    }
}