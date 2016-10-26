using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public abstract class BaseService : IDisposable
    {
        protected AuthContext _db;

        public BaseService()
        {
            _db = new AuthContext();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}