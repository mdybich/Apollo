using Microsoft.AspNet.Identity.EntityFramework;

namespace Apollo.WebApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}