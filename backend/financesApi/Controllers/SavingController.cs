using backend.financesApi.DTOs;
using backend.financesApi.Exceptions;
using backend.financesApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.financesApi.Controllers;

/// <summary>
/// Controller responsible for managing savings
/// </summary>
[Controller]
[Route("/api/saving")]
public class SavingController : ControllerBase
{
    private readonly ISavingService _service;

    public SavingController(ISavingService service)
    {
        _service = service;
    }

    /// <summary>
    /// Gets all available savings
    /// </summary>
    /// <returns>A list of all savings</returns>
    /// <response code="200">Returns the list of savings successfully</response>
    /// <response code="204">Returns NoContent when the list of savings is empty</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> GetSavingsAsync()
    {
        var savings = await _service.GetSavingsAsync();

        if (savings == null || !savings.Any())
        {
            return NoContent();
        }

        return Ok(savings);
    }

    /// <summary>
    /// Gets a specific saving by ID
    /// </summary>
    /// <param name="id">The unique identifier of the saving</param>
    /// <returns>The requested saving data</returns>
    /// <response code="200">Returns the found saving</response>
    /// <response code="404">Returns NotFound when the saving is not found or validation error occurs</response>
    [HttpGet]
    [Authorize]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetSavingsByIdAsync([FromRoute] Guid id)
    {
        try
        {
            var savingResponseDTO = await _service.GetSavingByIdAsync(id);

            return Ok(savingResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    /// <summary>
    /// Gets saving(s) by userid
    /// </summary>
    /// <param name="id">The userid of the saving(s)</param>
    /// <returns>The requested saving data</returns>
    /// <response code="200">Returns the found saving</response>
    /// <response code="404">Returns NotFound when the saving is not found or validation error occurs</response>
    [HttpGet]
    [Authorize]
    [Route("userid/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetSavingsByUserIdAsync([FromRoute] Guid id)
    {
        try
        {
            var savingResponseDTO = await _service.GetSavingByUserIdAsync(id);

            return Ok(savingResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    /// <summary>
    /// Adds a new saving
    /// </summary>
    /// <param name="addsavingDTO">
    /// Data for the saving to be created
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>
    /// 'emergency', 'vacation', 'housing', 'car', 'wedding', 'retirement', 'education',
    /// 'business', 'investment', 'health', 'technology', 'other'
    /// </para>
    /// </param>
    /// public enum SavingsCategoriesEnum
    /// <returns>The created saving data</returns>
    /// <response code="201">saving created successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound when a validation error occurs</response>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddSavingAsync([FromBody] AddSavingDTO addsavingDTO)
    {
        try
        {
            var savingResponseDTO = await _service.AddSavingAsync(addsavingDTO);

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
    /// Updates an existing saving
    /// </summary>
    /// <param name="id"> 
    /// Id of the 'saving' to be updated
    /// </param>
    /// <param name="editsavingDTO">
    /// Updated saving data
    /// <para> Parameter 'category' must be one of these: </para>
    /// <para>'entertainment', 'transportation', 'housing', 'food', 'education', 'shopping', 'other' </para>
    /// </param>
    /// <returns>The updated saving data</returns>
    /// <response code="200">saving updated successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound when the saving is not found or validation error occurs</response>
    [HttpPut]
    [Authorize]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> EditSavingAsync([FromRoute] Guid id, [FromBody] EditSavingDTO editsavingDTO)
    {
        try
        {
            var savingResponseDTO = await _service.EditSavingAsync(id, editsavingDTO);

            return Ok(savingResponseDTO);
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
    /// Removes a saving by ID
    /// </summary>
    /// <param name="id">The unique identifier of the saving to be removed</param>
    /// <returns>Confirmation of successful deletion</returns>
    /// <response code="200">Returns Ok when the saving is removed successfully</response>
    /// <response code="404">Returns NotFound when the saving is not found or validation error occurs</response>
    [HttpDelete]
    [Authorize]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveSavingAsync([FromRoute] Guid id)
    {
        try
        {
            await _service.RemoveSavingAsync(id);

            return Ok();
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }
}