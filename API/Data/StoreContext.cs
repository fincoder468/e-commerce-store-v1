using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "47b6c5d8-e31d-4d5e-a982-f88b9814090b", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Id = "0e71dadd-3027-4ef0-8287-83b5e148b38d", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}
