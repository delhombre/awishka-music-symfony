<?php

namespace App\Controller;

use App\Repository\AlbumRepository;
use App\Repository\MusicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/home", name="home")
 */
class HomeController extends AbstractController
{
    /**
     * @Route("/musics", name="home_musics", methods={"GET"})
     */
    public function musics(MusicRepository $musicRepository)
    {
        return $this->json(($musicRepository->findByLimitedNumber(6)), 200, [], ['groups' => "music:read"]);
    }

    /**
     * @param AlbumRepository $albumRepository
     * @return void
     * 
     * @Route("/albums", name="home_albums", methods={"GET"})
     */
    public function albums(AlbumRepository $albumRepository)
    {
        return $this->json(($albumRepository->findByLimitedNumber(8)), 200, [], ["groups" => "album:read"]);
    }
}
