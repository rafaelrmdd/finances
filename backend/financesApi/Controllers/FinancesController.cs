using backend.financesApi.DTOs;
using backend.financesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.financesApi.Controllers;

[Controller]
[Route("/api/")]
public class FinancesController : ControllerBase
{
    private readonly ITransactionService _service;

    public FinancesController(ITransactionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult> GetTransactionsAsync()
    {
        try
        {
            var transactionsResponseDTO = await _service.GetTransactionsAsync();

            return Ok(transactionsResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    [HttpGet]
    public async Task<ActionResult> GetTransactionsByIdAsync(Guid id)
    {
        try
        {
            var transactionResponseDTO = await _service.GetTransactionByIdAsync(id);

            return Ok(transactionResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddTransactionAsync(AddTransactionDTO addTransactionDTO)
    {
        try
        {
            var transactionResponseDTO = await _service.AddTransactionAsync(addTransactionDTO);

            return Ok(transactionResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    [HttpPut]
    public async Task<ActionResult> EditTransactionAsync(EditTransactionDTO editTransactionDTO)
    {
        try
        {
            var transactionResponseDTO = await _service.EditTransactionAsync(editTransactionDTO);

            return Ok(transactionResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveTransactionAsync(Guid id)
    {
        try
        {
            await _service.RemoveTransactionAsync(id);

            return Ok();
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }
}