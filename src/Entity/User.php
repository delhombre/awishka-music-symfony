<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\UserController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * 
 * @UniqueEntity(fields={"email"}, message="Cette adresse email est déjà utilisée")
 * 
 * @ApiResource(
 * 
 *  normalizationContext={
 *      "groups"={"user:read"}
 *  },
 * 
 *  collectionOperations={
 *      "get",
 *      "post"
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
 * )
 * 
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"music:read", "category:read", "album:read", "user:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide")
     * @Assert\Email(message="Ce champ doit contenir une adresse email valide")
     * @Groups({"music:read", "category:read", "album:read", "user:read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"music:read", "category:read", "album:read", "user:read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide")
     * @Assert\Length(min=8, minMessage="Le mot de passe doit faire minimum 8 caractères")
     */
    private $password;

    /**
     * @Assert\EqualTo(propertyPath="password", message="Vous n'avez pas tapé le même mot de passe")
     */
    private $confirm_password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide")
     * @Groups({"music:read", "category:read", "album:read", "user:read"})
     * @ApiProperty(iri="http://schema.org/username")
     */
    private $username;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"music:read", "category:read", "album:read", "user:read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Album::class, mappedBy="author")
     * @Groups({"music:read", "user:read"})
     */
    private $albums;

    /**
     * @ORM\OneToMany(targetEntity=Music::class, mappedBy="author")
     * @Groups({"album:read", "user:read"})
     */
    private $musics;

    /**
     * @ORM\OneToMany(targetEntity=MusicLike::class, mappedBy="author")
     */
    private $likes;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\OneToOne(targetEntity=Profile::class, mappedBy="user", cascade={"persist", "remove"})
     * @Groups({"user:read"})
     */
    private $profile;

    public function __construct()
    {
        $this->roles = ['ROLE_USER'];
        $this->createdAt = new DateTime();
        $this->albums = new ArrayCollection();
        $this->musics = new ArrayCollection();
        $this->likes = new ArrayCollection();
        $this->profile = new Profile();
        $this->profile->setUser($this);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function setRoles(array $roles)
    {
        if (!in_array('ROLE_USER', $roles)) {
            $roles[] = 'ROLE_USER';
        }
        foreach ($roles as $role) {
            if (substr($role, 0, 5) !== 'ROLE_') {
                throw new \InvalidArgumentException("Chaque rôle doit commencer par 'ROLE_'");
            }
        }
        $this->roles = $roles;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getConfirmPassword(): string
    {
        return (string) $this->confirm_password;
    }

    public function setConfirmPassword(string $confirm_password): self
    {
        $this->confirm_password = $confirm_password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    /**
     * @return Collection|Album[]
     */
    public function getAlbums(): Collection
    {
        return $this->albums;
    }

    public function addAlbum(Album $album): self
    {
        if (!$this->albums->contains($album)) {
            $this->albums[] = $album;
            $album->setAuthor($this);
        }

        return $this;
    }

    public function removeAlbum(Album $album): self
    {
        if ($this->albums->contains($album)) {
            $this->albums->removeElement($album);
            // set the owning side to null (unless already changed)
            if ($album->getAuthor() === $this) {
                $album->setAuthor(null);
            }
        }

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
            $music->setAuthor($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): self
    {
        if ($this->musics->contains($music)) {
            $this->musics->removeElement($music);
            // set the owning side to null (unless already changed)
            if ($music->getAuthor() === $this) {
                $music->setAuthor(null);
            }
        }

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
            $like->setAuthor($this);
        }

        return $this;
    }

    public function removeLike(MusicLike $like): self
    {
        if ($this->likes->contains($like)) {
            $this->likes->removeElement($like);
            // set the owning side to null (unless already changed)
            if ($like->getAuthor() === $this) {
                $like->setAuthor(null);
            }
        }

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getProfile(): ?Profile
    {
        return $this->profile;
    }

    public function setProfile(?Profile $profile): self
    {
        $this->profile = $profile;

        // set (or unset) the owning side of the relation if necessary
        $newUser = null === $profile ? null : $this;
        if ($profile->getUser() !== $newUser) {
            $profile->setUser($newUser);
        }

        return $this;
    }
}
