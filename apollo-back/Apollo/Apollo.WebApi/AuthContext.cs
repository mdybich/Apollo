using Apollo.WebApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Apollo.WebApi
{
    public class AuthContext : IdentityDbContext<ApplicationUser>
    {
        public AuthContext() : base("AuthContext")
        { }

        public DbSet<Artist> Artists { get; set; }
        public DbSet<Style> Styles { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Message>()
                .HasRequired(m => m.SenderUser)
                .WithMany(u => u.SendMessages)
                .HasForeignKey(m => m.SenderUserId)
                .WillCascadeOnDelete(false);

            modelBuilder
               .Entity<Message>()
               .HasRequired(m => m.ReceiverUser)
               .WithMany(u => u.ReceiveMessages)
               .HasForeignKey(m => m.ReceiverUserId)
               .WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);
        }
    }
}