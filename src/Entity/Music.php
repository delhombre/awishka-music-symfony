<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\MusicController;
use App\Repository\MusicRepository;
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
 * @ApiResource(
 *  iri="http://schema.org/MediaObject",
 * 
 *  collectionOperations={
 *      "get",
 *      "post"={
 *          "controller"=MusicController::class,
 *          "deserialize"=false,
 *          "validation_groups"={"Default", "music:create"},
 *          "openapi_context"={
 *              "requestBody"={
 *                  "content"={
 *                      "multipart/form-data"={
 *                          "schema"={
 *                              "type"="object",
 *                              "properties"={
 *                                  "imageFile"={
 *                                      "type"="string",
 *                                      "format"="binary"
 *                                  },
 *                                  "songFile"={
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
 *  normalizationContext={"groups"={"music:read"}},
 * )
 * 
 * @ApiFilter(SearchFilter::class, properties={"title":"partial", "author.username":"partial"})
 * 
 * @ApiFilter(OrderFilter::class)
 * 
 * @ORM\Entity(repositoryClass=MusicRepository::class)
 * 
 * @Vich\Uploadable
 */
class Music
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
     * @Groups({"music:read", "album:read", "user:read", "category:read", "music:create"})
     * @Assert\NotBlank(message="Ce champ est obligatoire")
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"music:read", "album:read", "user:read", "category:read", "music:create"})
     */
    private $featuring;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @Assert\NotNull(groups={"music:create"}, message="Veuillez sélectionner une cover")
     * @Vich\UploadableField(mapping="music_images", fileNameProperty="image")
     * @var File
     */
    public $imageFile;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $song;

    /**
     * @Assert\NotNull(groups={"music:create"}, message="Veuillez sélectionner un fichier audio")
     * @Vich\UploadableField(mapping="music_files", fileNameProperty="song")
     * @var File
     */
    private $songFile;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Album::class, inversedBy="musics")
     * @Groups({"music:read", "category:read", "music:create"})
     */
    private $album;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="musics")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Sélectionnez une catégorie")
     * @Groups({"music:read", "album:read", "user:read", "music:create"})
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="musics")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotNull(message="Sélectionnez l'artiste")
     * @Groups({"music:read", "category:read", "music:create"})
     */
    private $author;

    /**
     * @ORM\OneToMany(targetEntity=MusicLike::class, mappedBy="music")
     * @Groups({"music:read", "album:read", "category:read"})
     */
    private $likes;

    /**
     * @Groups({"music:read", "album:read", "category:read", "user:read"})
     */
    public $coverUrl;

    /**
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    public $songUrl;

    /**
     * @ORM\OneToMany(targetEntity=MusicDownload::class, mappedBy="music")
     */
    private $downloads;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $downloadCount;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"music:read", "album:read", "user:read", "category:read"})
     */
    private $likesCount;

    public function __construct()
    {
        $this->likes = new ArrayCollection();
        $this->downloads = new ArrayCollection();
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

    public function getFeaturing(): ?string
    {
        return $this->featuring;
    }

    public function setFeaturing(?string $featuring): self
    {
        $this->featuring = $featuring;

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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getImageFile()
    {
        return $this->imageFile;
    }

    public function setImageFile(File $image = null)
    {
        $this->imageFile = $image;

        if ($image) {
            $this->updatedAt = new \DateTime('now');
        }
    }

    public function getSong(): ?string
    {
        return $this->song;
    }

    public function setSong(string $song): self
    {
        $this->song = $song;

        return $this;
    }

    public function getSongFile()
    {
        return $this->songFile;
    }

    public function setSongFile(File $song = null)
    {
        $this->songFile = $song;

        if ($song) {
            $this->updatedAt = new \DateTime('now');
        }
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

    public function getAlbum(): ?Album
    {
        return $this->album;
    }

    public function setAlbum(?Album $album): self
    {
        $this->album = $album;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
     * @return Collection|MusicLike[]
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(MusicLike $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setMusic($this);
        }

        return $this;
    }

    public function removeLike(MusicLike $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getMusic() === $this) {
                $like->setMusic(null);
            }
        }

        return $this;
    }

    /**
     * Permet de savoir si une Music est likée par un utilisateur
     * @param User $user
     * @return boolean
     */
    public function isLikedByUser(User $user): bool
    {
        foreach ($this->likes as $like) {
            if ($like->getAuthor() === $user) return true;
        }

        return false;
    }

    public function getCoverUrl(): ?string
    {
        return $this->coverUrl;
    }

    public function setCoverUrl(string $coverUrl): self
    {
        $this->coverUrl = $coverUrl;

        return $this;
    }

    public function getSongUrl(): ?string
    {
        return $this->songUrl;
    }

    public function setSongUrl(string $songUrl): self
    {
        $this->songUrl = $songUrl;

        return $this;
    }

    /**
     * @return Collection|MusicDownload[]
     */
    public function getDownloads(): Collection
    {
        return $this->downloads;
    }

    public function addDownload(MusicDownload $download): self
    {
        if (!$this->downloads->contains($download)) {
            $this->downloads[] = $download;
            $download->setMusic($this);
        }

        return $this;
    }

    public function removeDownload(MusicDownload $download): self
    {
        if ($this->downloads->contains($download)) {
            $this->downloads->removeElement($download);
            // set the owning side to null (unless already changed)
            if ($download->getMusic() === $this) {
                $download->setMusic(null);
            }
        }

        return $this;
    }

    public function getDownloadCount(): ?int
    {
        return $this->downloadCount;
    }

    public function setDownloadCount(?int $downloadCount): self
    {
        $this->downloadCount = $downloadCount;

        return $this;
    }

    public function getLikesCount(): ?int
    {
        return $this->likesCount;
    }

    public function setLikesCount(?int $likesCount): self
    {
        $this->likesCount = $likesCount;

        return $this;
    }
}
