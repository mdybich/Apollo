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

            if (result.Succeeded)
            {
                var currentUser = _userManager.FindByName(user.UserName);
                _userManager.AddToRole(currentUser.Id, "User");
            }

            return result;
        }

        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            var user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public async Task<BasicUserViewModel> FindUserByName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var roles = await _userManager.GetRolesAsync(user.Id);

            return new BasicUserViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                Roles = roles.ToArray()
            };
        }
    }
}