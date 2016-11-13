using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace Apollo.WebApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Rating> Ratings { get; set; }
        public virtual ICollection<Message> SendMessages { get; set; }
        public virtual ICollection<Message> ReceiveMessages { get; set; }
    }
}