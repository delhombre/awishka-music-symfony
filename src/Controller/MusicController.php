<?php

namespace App\Controller;

use App\Entity\Music;
use App\Events\IRIDenormalizer;
use Symfony\Component\HttpFoundation\Request;

final class MusicController
{
    protected $iRIDenormalizer;

    public function __construct(IRIDenormalizer $iRIDenormalizer)
    {
        $this->iRIDenormalizer = $iRIDenormalizer;
    }

    public function __invoke(Request $request): Music
    {
        $title = $request->request->get('title');
        $featuring = $request->request->get('featuring');
        $imageFile = $request->files->get('imageFile');
        $songFile = $request->files->get('songFile');
        $category = $request->request->get('category');
        $category = $category ? $this->iRIDenormalizer->denormalize($request->request->get('category'), Music::class) : null;
        $album = $request->request->get('album');
        $album = $album ? $this->iRIDenormalizer->denormalize($request->request->get('album'), Music::class) : null;
        $author = $request->request->get('author');
        $author = $author ? $this->iRIDenormalizer->denormalize($request->request->get('author'), Music::class) : null;

        $music = new Music();

        $music->setTitle($title)
            ->setFeaturing($featuring)
            ->setCategory($category)
            ->setAlbum($album)
            ->setAuthor($author)
            ->setCreatedAt(new \DateTime());
        $music->setImageFile($imageFile);
        $music->setSongFile($songFile);

        return $music;
    }
}
