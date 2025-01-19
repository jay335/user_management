<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(UserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        if ($user) {
            // Clear the old cache
            Cache::forget('users');

            // Cache the updated user list with the new user included
            Cache::remember('users', 60, function () {
                return $this->userService->getAllUsers();
            });

            return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
        }
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = $this->userService->getUserById($id);
        return response()->json($user, 200);
    }

    public function update(UserRequest $request, $id)
    {
        $user = $this->userService->updateUser($id, $request->validated());
        return response()->json($user, 200);
    }

    public function deleteUser($id)
    {
        $deleted = $this->userService->deleteUser($id);
        if ($deleted) {
            // Clear the cache after deletion
            Cache::forget('users');

            // Re-cache the updated list of users (without the deleted user)
            Cache::remember('users', 60, function () {
                return $this->userService->getAllUsers();
            });

            return response()->json(['message' => 'User deleted successfully'], 200);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}

?>
