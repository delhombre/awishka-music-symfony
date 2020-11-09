<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\ProfileController;
use App\Repository\ProfileRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProfileRepository::class)
 * 
 * @ApiResource(
 * iri="http://schema.org/MediaObject",
 * 
 *  collectionOperations={
 *      "get",
 *      "post"={
 *          "controller"=ProfileController::class,
 *          "deserialize"=false,
 *          "validation_groups"={"Default", "profile:create"},
 *          "openapi_context"={
 *              "requestBody"={
 *                  "content"={
 *                      "multipart/form-data"={
 *                          "schema"={
 *                              "type"="object",
 *                              "properties"={
 *                                  "profileFile"={
 *                                      "type"="string",
 *                                      "format"="binary"
 *                                  },
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
 *  normalizationContext={"groups"={"profile:read"}}
 * )
 * 
 * @Vich\Uploadable
 */
class Profile
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $profile;

    /**
     * @Assert\NotNull(groups={"profile:create"}, message="Veuillez sélectionner une photo de profil")
     * @Vich\UploadableField(mapping="profiles", fileNameProperty="profile")
     * @var File
     */
    public $profileFile;

    /**
     * @Groups({"profile:read", "user:read"})
     */
    public $profileUrl;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="profile", cascade={"persist", "remove"})
     */
    private $user;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProfile(): ?string
    {
        return $this->profile;
    }

    public function setProfile(?string $profile): self
    {
        $this->profile = $profile;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    public function getProfileFile()
    {
        return $this->profileFile;
    }

    public function setProfileFile(File $profile = null)
    {
        $this->profileFile = $profile;

        if ($profile) {
            $this->updatedAt = new \DateTime('now');
        }
    }
}
