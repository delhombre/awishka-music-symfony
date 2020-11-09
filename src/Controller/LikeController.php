<?php

namespace App\Controller;

use App\Entity\Music;
use App\Entity\MusicLike;
use App\Repository\MusicLikeRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/like", name="like")
 */
class LikeController extends AbstractController
{
    /**
     * @Route("/index/{id}", name="like_index")
     */
    public function index(Music $music, MusicLikeRepository $musicLikeRepository, EntityManagerInterface $manager, Request $request, JWTEncoderInterface $jwtEncoder, UserRepository $userRepository)
    {
        $bearerToken = $request->headers->get('authorization');

        if (!$bearerToken) return $this->json([
            'code' => '403',
            'message' => 'Désole il faut être connecté'
        ], 403);

        $token = substr_replace($bearerToken, "", 0, 7);

        $decodedToken = $jwtEncoder->decode($token);

        $userId = $decodedToken["id"];

        $user = $userRepository->findOneBy(["id" => $userId]);


        // dd($token, $userId);

        if ($music->isLikedByUser($user)) {

            $like = $musicLikeRepository->findOneBy([
                'music' => $music,
                'author' => $user
            ]);

            $manager->remove($like);

            $manager->flush();

            $music->setLikesCount($musicLikeRepository->count(['music' => $music]));
            $manager->persist($music);

            $manager->flush();

            return $this->json([
                'message' => 'Like bien delete',
                'likes' => $musicLikeRepository->count(['music' => $music]),
            ], 200);
        }

        $like = new MusicLike();
        $like->setMusic($music)
            ->setAuthor($user);

        $manager->persist($like);

        $manager->flush();

        $music->setLikesCount($musicLikeRepository->count(['music' => $music]));
        $manager->persist($music);

        $manager->flush();

        return $this->json([
            'code' => '200',
            'message' => 'Like bien ajouté',
            'likes' => $musicLikeRepository->count(['music' => $music]),
        ], 200);
    }
}
