using Apollo.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Apollo.WebApi.Services
{
    public class StyleService : BaseService
    {
        public IEnumerable<StyleViewModel> GetStyles()
        {
            var styles = _db.Styles.Select(s => new StyleViewModel()
            {
                Id = s.Id,
                Name = s.Name
            });

            return styles;
        } 
    }
}