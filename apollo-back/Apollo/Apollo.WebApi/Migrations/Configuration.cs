namespace Apollo.WebApi.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Apollo.WebApi.AuthContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "Apollo.WebApi.AuthContext";
        }

        protected override void Seed(Apollo.WebApi.AuthContext context)
        {
            SeedArtists(context);
            SeedStyles(context);
            SeedAlbums(context);
            SeedRatings(context);
        }

        private void SeedArtists(Apollo.WebApi.AuthContext context)
        {
            var artists = new Artist[]
           {
                new Artist() { Id = 1, Name = "Iron Maiden" },
                new Artist() { Id = 2, Name = "Dream Theaer" },
                new Artist() { Id = 3, Name = "The Police" },
                new Artist() { Id = 4, Name = "Alter Bridge" },
                new Artist() { Id = 5, Name = "Riverside" },
                new Artist() { Id = 6, Name = "Pink Floyd" },
                new Artist() { Id = 7, Name = "Led Zeppelin" },
                new Artist() { Id = 8, Name = "Dire Straits" },
                new Artist() { Id = 9, Name = "Eric Clapton" },
                new Artist() { Id = 10, Name = "John  Mayer" },
                new Artist() { Id = 11, Name = "Opeth" },
                new Artist() { Id = 12, Name = "Miles Davis" },
                new Artist() { Id = 13, Name = "Red Hot Chili Peppers" },
                new Artist() { Id = 14, Name = "U2" },
                new Artist() { Id = 15, Name = "Steven Wilson" }
           };

            context.Set<Artist>().AddOrUpdate(artists);
        }

        private void SeedStyles(Apollo.WebApi.AuthContext context)
        {
            var styles = new Style[]
            {
                new Style() { Id = 1, Name = "Rock" },
                new Style() { Id = 2, Name = "Hard Rock" },
                new Style() { Id = 3, Name = "Blues" },
                new Style() { Id = 4, Name = "Jazz" },
                new Style() { Id = 5, Name = "Funk" },
                new Style() { Id = 6, Name = "Progressive Rock" },
                new Style() { Id = 7, Name = "Pop" },
                new Style() { Id = 8, Name = "Metal" }
            };

            context.Set<Style>().AddOrUpdate(styles);
        }

        private void SeedAlbums(Apollo.WebApi.AuthContext context)
        {
            var albums = new Album[]
            {
                new Album() { Id = 1, ArtistId = 1, StyleId = 8, Name = "Brave New World", Year = 2000, Duration = 67, DateAdded = DateTime.Now.AddDays(-2) },
                new Album() { Id = 2, ArtistId = 1, StyleId = 8, Name = "Powerslave", Year = 1984, Duration = 53, DateAdded = DateTime.Now },
                new Album() { Id = 3, ArtistId = 1, StyleId = 8, Name = "Somewhere In Time", Year = 1986, Duration= 60, DateAdded = DateTime.Now },
                new Album() { Id = 4, ArtistId = 2, StyleId = 6, Name = "Octavarium",  Year = 2005, Duration = 80, DateAdded = DateTime.Now.AddDays(-5) },
                new Album() { Id = 5, ArtistId = 3, StyleId = 7, Name = "Ghost In The Machine", Year = 1981, Duration = 41, DateAdded = DateTime.Now.AddDays(-10)},
                new Album() { Id = 6, ArtistId = 4, StyleId = 8, Name = "Show Me A Hero", Year = 2016, Duration = 64, DateAdded = DateTime.Now },
                new Album() { Id = 7, ArtistId = 4, StyleId = 8, Name = "Fortress", Year =  2013, Duration = 69, DateAdded = DateTime.Now },
                new Album() { Id = 8, ArtistId = 5, StyleId = 6, Name = "Love, Fear And Time Machine", Year = 2015, DateAdded = DateTime.Now },
                new Album() { Id = 9, ArtistId = 5, StyleId = 6, Name = "Shrine Of New Generation Slaves", Year = 2013, Duration = 51, DateAdded = DateTime.Now },
                new Album() { Id = 10, ArtistId = 6, StyleId = 6, Name = "The Wall", Year = 1979, Duration = 154, DateAdded = DateTime.Now },
                new Album() { Id = 11, ArtistId = 6, StyleId = 6, Name = "Wish You Were Here", Year = 1975, Duration = 54, DateAdded = DateTime.Now },
                new Album() { Id = 12, ArtistId = 7, StyleId = 1, Name = "Led Zeppelin IV", Year = 1971, Duration = 42, DateAdded = DateTime.Now }
            };

            context.Set<Album>().AddOrUpdate(albums);
        }

        private void SeedRatings(Apollo.WebApi.AuthContext context)
        {
            var ratings = new Rating[]
            {
                new Rating() {Id = 1, AlbumId = 1, Rate = 9, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 2, AlbumId = 1, Rate = 4, DateAdded = DateTime.Now, UserId =  "09950b24-9ad4-45b5-a023-8904866cd27c"},
                new Rating() {Id = 3, AlbumId = 1, Rate = 5, DateAdded = DateTime.Now, UserId =  "41971c58-9f78-4fd5-88a8-42c7cbfab03e"},
                new Rating() {Id = 4, AlbumId = 1, Rate = 7, DateAdded = DateTime.Now, UserId =  "93436948-5bde-4b21-aa45-16231ef05cbc"},
                new Rating() {Id = 5, AlbumId = 1, Rate = 8, DateAdded = DateTime.Now, UserId =  "9ca40c74-6a29-4b5f-9883-95f106cf4130"},
                new Rating() {Id = 6, AlbumId = 2, Rate = 1, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 7, AlbumId = 2, Rate = 5, DateAdded = DateTime.Now, UserId =  "09950b24-9ad4-45b5-a023-8904866cd27c"},
                new Rating() {Id = 8, AlbumId = 2, Rate = 4, DateAdded = DateTime.Now, UserId =  "41971c58-9f78-4fd5-88a8-42c7cbfab03e"},
                new Rating() {Id = 9, AlbumId = 2, Rate = 3, DateAdded = DateTime.Now, UserId =  "93436948-5bde-4b21-aa45-16231ef05cbc"},
                new Rating() {Id = 10, AlbumId = 3, Rate = 9, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 11, AlbumId = 3, Rate = 10, DateAdded = DateTime.Now, UserId =  "09950b24-9ad4-45b5-a023-8904866cd27c"},
                new Rating() {Id = 12, AlbumId = 4, Rate = 7, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 13, AlbumId = 4, Rate = 7, DateAdded = DateTime.Now, UserId =  "09950b24-9ad4-45b5-a023-8904866cd27c"},
                new Rating() {Id = 14, AlbumId = 4, Rate = 6, DateAdded = DateTime.Now, UserId =  "41971c58-9f78-4fd5-88a8-42c7cbfab03e"},
                new Rating() {Id = 15, AlbumId = 4, Rate = 5, DateAdded = DateTime.Now, UserId =  "93436948-5bde-4b21-aa45-16231ef05cbc"},
                new Rating() {Id = 16, AlbumId = 4, Rate = 8, DateAdded = DateTime.Now, UserId =  "9ca40c74-6a29-4b5f-9883-95f106cf4130"},
                new Rating() {Id = 17, AlbumId = 4, Rate = 9, DateAdded = DateTime.Now, UserId =  "a4dbcad6-70f5-4fd7-98ea-a4ccb2c9d40e"},
                new Rating() {Id = 18, AlbumId = 5, Rate = 7, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 19, AlbumId = 6, Rate = 4, DateAdded = DateTime.Now, UserId =  "0603891d-02fb-46b6-aa1a-8c3b9e386c91"},
                new Rating() {Id = 20, AlbumId = 6, Rate = 10, DateAdded = DateTime.Now, UserId =  "09950b24-9ad4-45b5-a023-8904866cd27c"},
                new Rating() {Id = 21, AlbumId = 6, Rate = 5, DateAdded = DateTime.Now, UserId =  "41971c58-9f78-4fd5-88a8-42c7cbfab03e"},
            };

            context.Set<Rating>().AddOrUpdate(ratings);
        }
    }
}
