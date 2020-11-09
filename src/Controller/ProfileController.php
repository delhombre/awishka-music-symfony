<?php

namespace App\Controller;

use App\Entity\Profile;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ProfileController
{
    public function __invoke(Request $request, JWTEncoderInterface $jwtEncoder, UserRepository $userRepository): Profile
    {
        $profileFile = $request->files->get('profileFile');

        $bearerToken = $request->headers->get('authorization');
        $token = substr_replace($bearerToken, "", 0, 7);

        $decodedToken = $jwtEncoder->decode($token);

        $userId = $decodedToken["id"];

        $user = $userRepository->findOneBy(["id" => $userId]);

        if (!$profileFile) throw new BadRequestHttpException('La photo de profil est requise');
        // dd($profileFile);

        $profile = $user->getProfile();

        // $profile = new Profile();
        $profile->setProfileFile($profileFile);

        return $profile;
    }
}
