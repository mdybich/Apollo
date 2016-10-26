using Apollo.WebApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi
{
    public class AuthContext : IdentityDbContext<ApplicationUser>
    {
        public AuthContext() : base("AuthContext")
        {

        }
    }
}