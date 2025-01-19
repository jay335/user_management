<?php

namespace App\Services;

use App\BOs\UserBO;

class UserService
{
    protected $userBO;

    public function __construct(UserBO $userBO)
    {
        $this->userBO = $userBO;
    }

    public function createUser($data)
    {
        return $this->userBO->createUser($data);
    }

    public function getAllUsers()
    {
        return $this->userBO->getAllUsers();
    }

    public function getUserById($id)
    {
        return $this->userBO->getUserById($id);
    }

    public function updateUser($id, $data)
    {
        return $this->userBO->updateUser($id, $data);
    }
    public function deleteUser($id)
    {
        return $this->userBO->deleteUser($id);
    }
}

?>