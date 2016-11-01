namespace Apollo.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddApolloInitialStructure : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Albums",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Year = c.Int(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        Duration = c.Single(nullable: false),
                        ArtistId = c.Int(nullable: false),
                        StyleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Artists", t => t.ArtistId, cascadeDelete: true)
                .ForeignKey("dbo.Styles", t => t.StyleId, cascadeDelete: true)
                .Index(t => t.ArtistId)
                .Index(t => t.StyleId);
            
            CreateTable(
                "dbo.Artists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Styles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Rate = c.Int(nullable: false),
                        DateAdded = c.DateTime(nullable: false),
                        AlbumId = c.Int(nullable: false),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Albums", t => t.AlbumId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.AlbumId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Ratings", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Ratings", "AlbumId", "dbo.Albums");
            DropForeignKey("dbo.Albums", "StyleId", "dbo.Styles");
            DropForeignKey("dbo.Albums", "ArtistId", "dbo.Artists");
            DropIndex("dbo.Ratings", new[] { "UserId" });
            DropIndex("dbo.Ratings", new[] { "AlbumId" });
            DropIndex("dbo.Albums", new[] { "StyleId" });
            DropIndex("dbo.Albums", new[] { "ArtistId" });
            DropTable("dbo.Ratings");
            DropTable("dbo.Styles");
            DropTable("dbo.Artists");
            DropTable("dbo.Albums");
        }
    }
}
