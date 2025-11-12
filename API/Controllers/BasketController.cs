using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extentions;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();
        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket();
        
        // create one
        if (basket == null) basket = CreateBasket();
        // get product
        var product = await context.Products.FindAsync(productId);

        if (product == null) return BadRequest("Problem adding item to basket");

        // add item to basket
        basket.AddItem(product, quantity);
        // save changes
        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        return BadRequest("Problem updating basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        // get basket
        var basket = await RetrieveBasket();
        if (basket == null) return BadRequest("unable to retrieve basket");
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding item to basket");

        // remove item or reduce quantity
        basket.RemoveItem(productId, quantity);
        // save changes
        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();
        
        return BadRequest("Problem updating basket");
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
        .Include(x => x.Items)
        .ThenInclude(p => p.Product)
        .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
}
