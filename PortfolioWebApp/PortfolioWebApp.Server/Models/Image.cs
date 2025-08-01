﻿
using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public int ProjectId { get;set; }
        public string ImagePath { get; set; } = null!;

        public Project? Project { get; set; }

    }
}
