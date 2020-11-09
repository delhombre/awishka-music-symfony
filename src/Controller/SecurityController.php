<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\Request;

class SecurityController
{
    public function __invoke(Request $request, JWTEncoderInterface $jwtEncoder, UserRepository $userRepository): User
    {
        $profileFile = $request->files->get('profileFile');

        // dd($profileFile);
        // if (!$profileFile) return false;

        $bearerToken = $request->headers->get('authorization');
        $token = substr_replace($bearerToken, "", 0, 7);

        $decodedToken = $jwtEncoder->decode($token);

        $userId = $decodedToken["id"];

        $user = $userRepository->findOneBy(["id" => $userId]);

        // $profile = new Profile();
        // $profile->setUser($user)
        //     ->setCreatedAt(new \DateTime())
        //     ->setProfileFile($profileFile);

        return $user;
    }
}
