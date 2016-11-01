namespace Apollo.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeNameTypeInStyleClass : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Styles", "Name", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Styles", "Name", c => c.Int(nullable: false));
        }
    }
}
