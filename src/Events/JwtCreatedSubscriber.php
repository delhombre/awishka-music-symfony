<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
  public function updateJwtData(JWTCreatedEvent $event)
  {
    $user = $event->getUser();
    $data = $event->getData();
    $data['username'] = $user->getUsername();
    $data['id'] = $user->getId();
    $data['email'] = $user->getEmail();
    $data['albums'] = $user->getAlbums();
    $data['musics'] = $user->getMusics();
    $data['profile'] = $user->getProfile();
    $event->setData($data);
  }
}
