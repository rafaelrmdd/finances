using backend.financesApi.DTOs;
using backend.financesApi.Exceptions;
using backend.financesApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.financesApi.Controllers;

/// <summary>
/// Controller responsible for managing users
/// </summary>
[Controller]
[Route("/api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }

    /// <summary>
    /// Gets all available users
    /// </summary>
    /// <returns>A list of all users</returns>
    /// <response code="200">Returns the list of users successfully</response>
    /// <response code="204">Returns NoContent when the list of users is empty</response>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> GetUsersAsync()
    {
        var users = await _service.GetUsersAsync();

        if (users == null || !users.Any())
        {
            return NoContent();
        }

        return Ok(users);
    }

    /// <summary>
    /// Gets a specific user by ID
    /// </summary>
    /// <param name="id">The unique identifier of the user</param>
    /// <returns>The requested user data</returns>
    /// <response code="200">Returns the found user</response>
    /// <response code="404">Returns NotFound when the user is not found or validation error occurs</response>
    [Authorize]
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetUserByIdAsync([FromRoute] Guid id)
    {
        try
        {
            var userResponseDTO = await _service.GetUserByIdAsync(id);

            return Ok(userResponseDTO);
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }

    /// <summary>
    /// Adds a new budget
    /// </summary>
    /// <param name="addUserDTO">
    /// Data for the user to be created
    /// </param>
    /// <returns>The created user data</returns>
    /// <response code="201">Returns Created when the user is created successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound When a validation error occurs</response>
    [Authorize]
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddBudgetAsync([FromBody] AddUserDTO addUserDTO)
    {
        try
        {
            var userResponseDTO = await _service.AddUserAsync(addUserDTO);

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
    /// Updates an existing user
    /// </summary>
    /// <param name="id"> 
    /// Id of the 'user' to be updated
    /// </param>
    /// <param name="editUserDTO">
    /// Updated user data
    /// </param>
    /// <returns>The updated user data</returns>
    /// <response code="200">User updated successfully</response>
    /// <response code="400">Returns BadRequest when the provided data is invalid</response>
    /// <response code="404">Returns NotFound when the user is not found or validation error occurs</response>
    [Authorize]
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> EditBudgetAsync([FromRoute] Guid id, [FromBody] EditUserDTO editUserDTO)
    {
        try
        {
            var budgetResponseDTO = await _service.EditUserAsync(id, editUserDTO);

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
    /// Removes a user by ID
    /// </summary>
    /// <param name="id">The unique identifier of the user to be removed</param>
    /// <returns>Confirmation of successful deletion</returns>
    /// <response code="200">Returns Ok when the user is removed successfully</response>
    /// <response code="404">Returns NotFound When the user is not found or validation error occurs</response>
    [Authorize]
    [HttpDelete]
    [Route("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveUserAsync([FromRoute] Guid id)
    {
        try
        {
            await _service.RemoveUserAsync(id);

            return Ok();
        }
        catch (ValidationException e)
        {
            return NotFound(e);
        }
    }
}