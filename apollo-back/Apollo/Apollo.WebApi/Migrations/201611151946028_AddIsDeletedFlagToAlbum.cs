namespace Apollo.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddIsDeletedFlagToAlbum : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Albums", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Albums", "IsDeleted");
        }
    }
}
