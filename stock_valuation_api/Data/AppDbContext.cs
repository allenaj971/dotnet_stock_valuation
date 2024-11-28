using Microsoft.EntityFrameworkCore;
using Models.Object;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options) { }
    public DbSet<StockModel> Stocks { get; set; }
    public DbSet<DCFValuationModel> DCFValuationModels { get; set; }
    public DbSet<DDMValuationModel> DDMValuationModels { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StockModel>().HasKey(s => s.Id);
        modelBuilder.Entity<DCFValuationModel>().HasKey(s => s.Id);
        modelBuilder.Entity<DDMValuationModel>().HasKey(s => s.Id);
        modelBuilder.Entity<DCFValuationModel>().HasOne<StockModel>(i => i.Stock).WithMany(i => i.DCFValuationModels).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<DDMValuationModel>().HasOne<StockModel>(i => i.Stock).WithMany(i => i.DDMValuationModels).OnDelete(DeleteBehavior.Cascade);
    }
}