using backend.financesApi.DTOs;
using backend.financesApi.Exceptions;
using backend.financesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.financesApi.Controllers;

/// <summary>
/// Controller responsible for managing transactions
/// </summary>
[Controller]
[Route("/api/transactions")]
public class FinancesController : ControllerBase
{
    private readonly ITransactionService _service;

    public FinancesController(ITransactionService service)
    {
        _service = service;
    }

    /// <summary>
    /// Gets all available transactions
    /// </summary>
    /// <returns>A list of all transactions</returns>
    /// <response code="200">Returns the list of transactions successfully</response>
    /// <response code="404">When a validation error occurs</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
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

    /// <summary>
    /// Gets a specific transaction by ID
    /// </summary>
    /// <param name="id">The unique identifier of the transaction</param>
    /// <returns>The requested transaction data</returns>
    /// <response code="200">Returns the found transaction</response>
    /// <response code="404">When the transaction is not found or validation error occurs</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetTransactionsByIdAsync([FromRoute] Guid id)
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

    /// <summary>
    /// Adds a new transaction
    /// </summary>
    /// <param name="addTransactionDTO">
    /// Data for the transaction to be created
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>'entertainment', 'transportation', 'housing', 'food', 'education', 'other' </para>
    /// <para> Parameter 'type' must be one of these: </para>
    /// <para>'income', 'expense' </para>
    /// </param>
    /// <returns>The created transaction data</returns>
    /// <response code="200">Transaction created successfully</response>
    /// <response code="400">When the provided data is invalid</response>
    /// <response code="404">When a validation error occurs</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddTransactionAsync([FromBody] AddTransactionDTO addTransactionDTO)
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
        catch (InvalidDataException e)
        {
            return BadRequest(e);
        }
    }

    /// <summary>
    /// Updates an existing transaction
    /// </summary>
    /// <param name="editTransactionDTO">
    /// Updated transaction data
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>'entertainment', 'transportation', 'housing', 'food', 'education', 'other' </para>
    /// </param>
    /// <returns>The updated transaction data</returns>
    /// <response code="200">Transaction updated successfully</response>
    /// <response code="400">When the provided data is invalid</response>
    /// <response code="404">When the transaction is not found or validation error occurs</response>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> EditTransactionAsync([FromBody] EditTransactionDTO editTransactionDTO)
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
        catch (InvalidDataException e)
        {
            return BadRequest(e);
        }
    }

    /// <summary>
    /// Removes a transaction by ID
    /// </summary>
    /// <param name="id">The unique identifier of the transaction to be removed</param>
    /// <returns>Confirmation of successful deletion</returns>
    /// <response code="200">Transaction removed successfully</response>
    /// <response code="404">When the transaction is not found or validation error occurs</response>
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveTransactionAsync([FromBody] Guid id)
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