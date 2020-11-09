<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\Request;

class UserController
{
    public function __invoke($data): User
    {
        // $bearerToken = $request->headers->get('authorization');
        // $token = substr_replace($bearerToken, "", 0, 7);

        // $decodedToken = $jwtEncoder->decode($token);

        // $userId = $decodedToken["id"];

        // $user = $userRepository->findOneBy(["id" => $userId]);

        // $username = $request->request->get("username");

        // dd($request, $username);
        dd($data);
    }
}
