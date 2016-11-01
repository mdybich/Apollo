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
    }
}