using Apollo.WebApi.Models;
using Apollo.WebApi.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class AuthService : BaseService, IDisposable
    {
        private UserManager<ApplicationUser> _userManager;

        public AuthService()
        {
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_db));
        }

        public async Task<IdentityResult> RegisterUser(RegisterUserViewModel user)
        {
            var userToDb = new ApplicationUser
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            var result = await _userManager.CreateAsync(userToDb, user.Password);

            return result;
        }

        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            var user = await _userManager.FindAsync(userName, password);

            return user;
        }
    }
}