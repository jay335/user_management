<?php

namespace App\BOs;

use App\DAOs\UserDAO;
use Illuminate\Support\Facades\Cache;

class UserBO
{
    protected $userDAO;

    public function __construct(UserDAO $userDAO)
    {
        $this->userDAO = $userDAO;
    }

    public function createUser($data)
    {
        return $this->userDAO->createUser($data);
    }

    public function getAllUsers()
    {
        $cachedUsers = Cache::get('users');
        if (!$cachedUsers) {
            $cachedUsers = $this->userDAO->getAllUsers();
            Cache::put('users', $cachedUsers, 600);
        }
        return $cachedUsers;
    }

    public function getUserById($id)
    {
        return $this->userDAO->getUserById($id);
    }

    public function updateUser($id, $data)
    {
        $user = $this->userDAO->updateUser($id, $data);
        Cache::forget('users'); // Invalidate cache on update
        return $user;
    }
    public function deleteUser($id)
    {
        return $this->userDAO->deleteUser($id);
    }
}

?>