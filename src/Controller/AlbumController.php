<?php

namespace App\Controller;

use App\Entity\Album;
use App\Events\IRIDenormalizer;
use Symfony\Component\HttpFoundation\Request;

class AlbumController
{
    protected $iRIDenormalizer;

    public function __construct(IRIDenormalizer $iRIDenormalizer)
    {
        $this->iRIDenormalizer = $iRIDenormalizer;
    }

    public function __invoke(Request $request): Album
    {
        $title = $request->request->get('title');
        $coverFile = $request->files->get('coverFile');
        $author = $request->request->get('author');
        $author = $author ? $this->iRIDenormalizer->denormalize($request->request->get('author'), Album::class) : null;

        $album = new Album();

        $album->setTitle($title)
            ->setAuthor($author)
            ->setCreatedAt(new \DateTime());
        $album->setCoverFile($coverFile);

        return $album;
    }
}
