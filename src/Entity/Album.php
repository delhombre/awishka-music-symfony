<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\AlbumController;
use App\Repository\AlbumRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=AlbumRepository::class)
 * @ApiResource(
 *  
 *  collectionOperations={
 *      "get",
 *      "post"={
 *          "controller"=AlbumController::class,
 *          "deserialize"=false,
 *          "validation_groups"={"Default", "album:create"},
 *          "openapi_context"={
 *              "requestBody"={
 *                  "content"={
 *                      "multipart/form-data"={
 *                          "schema"={
 *                              "type"="object",
 *                              "properties"={
 *                                  "coverFile"={
 *                                      "type"="string",
 *                                      "format"="binary"
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *      }
 *  },
 * 
 *  itemOperations={
 *      "get",
 *      "put",
 *      "patch",
 *      "delete"
 *  },
 * 
 *  attributes={
 *      "order"={"createdAt":"DESC"},
 *      "pagination_client_items_per_page"=true
 *  },
 * 
 *  normalizationContext={"groups"={"album:read"}}
 * 
 * )
 * 
 * @ApiFilter(SearchFilter::class, properties={"author"="exact"})
 * 
 * @ApiFilter(OrderFilter::class)
 * 
 * @Vich\Uploadable
 */
class Album
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"music:read", "album:read", "user:read", "category:read", "album:create"})
     * @Assert\NotBlank(message="Ce champ ne peut être vide")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $cover;

    /**
     * @Assert\NotNull(groups={"album:create"}, message="Veuillez sélectionner une cover")
     * @Vich\UploadableField(mapping="album_covers", fileNameProperty="cover")
     * @var File
     */
    private $coverFile;

    /**
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     * @var string
     */
    public $coverUrl;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="albums")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"album:read", "album:create"})
     * @Assert\NotNull(message="L'album doit être associé à un artiste")
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity=Music::class, mappedBy="album")
     * @Groups({"album:read", "user:read"})
     */
    private $musics;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $countOfDownloads;

    public function __construct()
    {
        $this->musics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(string $cover): self
    {
        $this->cover = $cover;

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

    /**
     * @return Collection|Music[]
     */
    public function getMusics(): Collection
    {
        return $this->musics;
    }

    public function addMusic(Music $music): self
    {
        if (!$this->musics->contains($music)) {
            $this->musics[] = $music;
            $music->setAlbum($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        if ($this->musics->contains($music)) {
            $this->musics->removeElement($music);
            // set the owning side to null (unless already changed)
            if ($music->getAlbum() === $this) {
                $music->setAlbum(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCoverFile()
    {
        return $this->coverFile;
    }

    public function setCoverFile(File $cover = null)
    {
        $this->coverFile = $cover;

        if ($cover) {
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getDownloadCount(): int
    {
        $downloadCount = 0;

        foreach ($this->musics as $music) {
            $downloadCount += $music->getDownloadCount();
        }

        return $downloadCount;
    }

    public function getCountOfDownloads(): ?int
    {
        return $this->countOfDownloads;
    }

    public function setCountOfDownloads(?int $countOfDownloads): self
    {
        $this->countOfDownloads = $countOfDownloads;

        return $this;
    }
}
