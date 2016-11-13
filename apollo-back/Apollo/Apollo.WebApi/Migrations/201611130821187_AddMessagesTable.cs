namespace Apollo.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMessagesTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Messages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Topic = c.String(),
                        Content = c.String(),
                        SendingDate = c.DateTime(nullable: false),
                        SenderUserId = c.String(nullable: false, maxLength: 128),
                        ReceiverUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ReceiverUserId)
                .ForeignKey("dbo.AspNetUsers", t => t.SenderUserId)
                .Index(t => t.SenderUserId)
                .Index(t => t.ReceiverUserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Messages", "SenderUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Messages", "ReceiverUserId", "dbo.AspNetUsers");
            DropIndex("dbo.Messages", new[] { "ReceiverUserId" });
            DropIndex("dbo.Messages", new[] { "SenderUserId" });
            DropTable("dbo.Messages");
        }
    }
}
