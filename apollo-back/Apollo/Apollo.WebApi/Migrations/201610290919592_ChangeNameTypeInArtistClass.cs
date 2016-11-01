namespace Apollo.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeNameTypeInArtistClass : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Artists", "Name", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Artists", "Name", c => c.Int(nullable: false));
        }
    }
}
