<?php

namespace App\Controller;

use App\Entity\Music;
use App\Entity\MusicDownload;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Handler\DownloadHandler;

/**
 * @Route("/api/music", name="api_music")
 */
class ApiMusicController extends AbstractController
{
    /**
     * @Route("/download/{id}", name="api_music_download")
     */
    public function download(Music $music, DownloadHandler $downloadHandler, EntityManagerInterface $manager)
    {
        $download = new MusicDownload();
        $download->setMusic($music);
        $manager->persist($download);
        $manager->flush();
        $music->setDownloadCount(count($music->getDownloads()));
        $manager->persist($music);
        $manager->flush();
        $musicAlbum = $music->getAlbum();
        if ($musicAlbum) {
            $musicAlbum->setCountOfDownloads($musicAlbum->getDownloadCount());
            $manager->persist($musicAlbum);
        }
        $manager->flush();
        return $downloadHandler->downloadObject($music, 'songFile', null, null, true);
    }
}
