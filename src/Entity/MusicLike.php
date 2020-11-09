<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MusicLikeRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MusicLikeRepository::class)
 * @ApiResource
 */
class MusicLike
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"music:read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Music::class, inversedBy="likes")
     */
    private $music;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="likes")
     * @Groups({"music:read", "category:read"})
     */
    private $author;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMusic(): ?Music
    {
        return $this->music;
    }

    public function setMusic(?Music $music): self
    {
        $this->music = $music;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }
}
