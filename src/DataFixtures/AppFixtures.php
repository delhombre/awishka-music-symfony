<?php

namespace App\DataFixtures;

use App\Entity\Album;
use App\Entity\Category;
use App\Entity\Music;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    protected $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create('fr_FR');

        $faker->addProvider(new \Mmo\Faker\PicsumProvider($faker));
        $faker->addProvider(new \Mmo\Faker\LoremSpaceProvider($faker));
        $faker->addProvider(new \Mmo\Faker\FakeimgProvider($faker));

        $user = new User();
        $user->setUsername("SomeOne")
            ->setEmail("someone@email.com")
            ->setPassword($this->encoder->encodePassword($user, "password"))
            ->setCreatedAt(new \DateTime());
        $manager->persist($user);

        for ($c = 0; $c < 6; $c++) {
            $category = new Category();
            $category->setTitle($faker->colorName());
            $manager->persist($category);
        }

        for ($a = 0; $a < 5; $a++) {
            $album = new Album();
            $album->setTitle($faker->streetName())
                ->setAuthor($user)
                ->setCover($faker->picsumUrl())
                ->setCreatedAt($faker->dateTimeBetween("-4months"))
                ->setUpdatedAt($faker->dateTimeBetween("-2 months"));
            $manager->persist($album);

            for ($m = 0; $m < 2; $m++) {
                $music = new Music();
                $music->setTitle($faker->safeColorName())
                    ->setAlbum($album)
                    ->setCategory($category)
                    ->setImage($faker->picsumUrl())
                    ->setCoverUrl($faker->picsumUrl())
                    ->setSong($faker->name())
                    ->setSongUrl("/upload/music/song/_La_Comté_(The_Shire)(256k).mp3")
                    ->setAuthor($user)
                    ->setCreatedAt($faker->dateTimeBetween('-1 month'))
                    ->setUpdatedAt($faker->dateTimeBetween('-5days'));
                $manager->persist($music);
            }
        }

        $manager->flush();
    }
}
