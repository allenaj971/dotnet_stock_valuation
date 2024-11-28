using Microsoft.AspNetCore.Mvc;
using Models.Object;
using Models.Dtos.Converters;
using Microsoft.EntityFrameworkCore;
using Models.Dtos.DCFValuationModelDto;

namespace Controllers
{
    [Route("api/dcf")]
    [ApiController]
    public class DCFValuationControllers : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public DCFValuationControllers(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet("{DCFId}")]
        public IActionResult getDCFByDCFId([FromRoute] string DCFId)
        {
            var res = dbContext.DCFValuationModels.FirstOrDefault(x => x.Id == DCFId);
            if (res != null)
            {
                return Ok(res);
            }
            return NotFound();
        }

        [HttpGet]
        public IActionResult getDCFbyStockId([FromQuery(Name = "StockId")] string StockId)
        {
            var res = dbContext.Stocks.Where(x => x.Id == StockId).Join(dbContext.DCFValuationModels, stock => stock.Id, DCF => DCF.StockId, (stock, model) => new
            {
                CompanyName = stock.Name,
                ModelName = model.Name,
                ModelId = model.Id,
                CashFlow = model.Cashflows,
                RateReturn = model.RateReturn,
                Growth = model.Growth
            });
            if (res != null) return Ok(res);
            return NotFound();
        }

        [HttpPost]
        public IActionResult newDCF(CreateDCFValuationModelDto csd)
        {
            DCFValuationModel sm = csd.ToDCFFromCreateDCF();
            dbContext.DCFValuationModels.Add(sm);
            dbContext.SaveChanges();
            return Ok(sm);

        }
        [HttpPut("{id}")]
        public IActionResult updateDCF([FromRoute] string id, UpdateDCFValuationModelDto usd)
        {
            DCFValuationModel sm = usd.ToDCFFromUpdateDCF();
            var res = dbContext.DCFValuationModels.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                res.Cashflows = sm.Cashflows == null ? res.Cashflows : sm.Cashflows;
                res.RateReturn = sm.RateReturn == null ? res.RateReturn : sm.RateReturn;
                res.Growth = sm.Growth == null ? res.Growth : sm.Growth;
                res.Name = sm.Name == null ? res.Name : sm.Name;
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
        [HttpDelete("{id}")]
        public IActionResult removeDCF([FromRoute] string id)
        {
            var res = dbContext.DCFValuationModels.FirstOrDefault(x => x.Id == id);
            if (res != null)
            {
                dbContext.DCFValuationModels.Remove(res);
                dbContext.SaveChanges();
                return Ok();
            }
            return NotFound("id not found");
        }
    }
}