using backend.financesApi.DTOs;
using backend.financesApi.Exceptions;
using backend.financesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.financesApi.Controllers;

/// <summary>
/// Controller responsible for managing budgets
/// </summary>
[Controller]
[Route("/api/budget")]
public class BudgetController : ControllerBase
{
    private readonly IBudgetService _service;

    public BudgetController(IBudgetService service)
    {
        _service = service;
    }

    /// <summary>
    /// Gets all available budgets
    /// </summary>
    /// <returns>A list of all budgets</returns>
    /// <response code="200">Returns the list of budgets successfully</response>
    /// <response code="204">Returns NoContent when the list of budgets is empty</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> GetBudgetsAsync()
    {
        var budgets = await _service.GetBudgetsAsync();

        if (budgets == null || !budgets.Any())
        {
            return NoContent();
        }

        return Ok(budgets);
    }

    /// <summary>
    /// Gets a specific budget by ID
    /// </summary>
    /// <param name="id">The unique identifier of the budget</param>
    /// <returns>The requested budget data</returns>
    /// <response code="200">Returns the found budget</response>
    /// <response code="404">Returns NotFound when the budget is not found or validation error occurs</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetBudgetsByIdAsync([FromRoute] Guid id)
    {
        try
        {
            var budgetResponseDTO = await _service.GetBudgetByIdAsync(id);

            return Ok(budgetResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    /// <summary>
    /// Adds a new budget
    /// </summary>
    /// <param name="addBudgetDTO">
    /// Data for the budget to be created
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>'entertainment', 'transportation', 'housing', 'food', 'education', 'shopping', 'other' </para>
    /// </param>
    /// <returns>The created budget data</returns>
    /// <response code="201">Returns Created when the budget is created successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound When a validation error occurs</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddBudgetAsync([FromBody] AddBudgetDTO addBudgetDTO)
    {
        try
        {
            var budgetResponseDTO = await _service.AddBudgetAsync(addBudgetDTO);

            return Created();
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
    /// Updates an existing budget
    /// </summary>
    /// <param name="editBudgetDTO">
    /// Updated budget data
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>'entertainment', 'transportation', 'housing', 'food', 'education', 'shopping', 'other' </para>
    /// </param>
    /// <returns>The updated budget data</returns>
    /// <response code="200">Budget updated successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound when the budget is not found or validation error occurs</response>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> EditBudgetAsync([FromBody] EditBudgetDTO editBudgetDTO)
    {
        try
        {
            var budgetResponseDTO = await _service.EditBudgetAsync(editBudgetDTO);

            return Ok(budgetResponseDTO);
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
    /// Removes a budget by ID
    /// </summary>
    /// <param name="id">The unique identifier of the budget to be removed</param>
    /// <returns>Confirmation of successful deletion</returns>
    /// <response code="200">Returns Ok when the budget is removed successfully</response>
    /// <response code="404">Returns NotFound When the budget is not found or validation error occurs</response>
    [HttpDelete]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveBudgetAsync([FromRoute] Guid id)
    {
        try
        {
            await _service.RemoveBudgetAsync(id);

            return Ok();
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }
}