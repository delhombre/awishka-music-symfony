<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\Music;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

final class ResolveMusicUrlsSubscriber implements EventSubscriberInterface
{
  private $storage;

  public function __construct(StorageInterface $storage)
  {
    $this->storage = $storage;
  }

  public static function getSubscribedEvents()
  {
    return [KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE]];
  }

  public function onPreSerialize(ViewEvent $event)
  {
    $controllerResult = $event->getControllerResult();
    $request = $event->getRequest();

    if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
      return;
    }

    if (!($attributes = RequestAttributesExtractor::extractAttributes($request)) || !\is_a($attributes['resource_class'], Music::class, true)) {
      return;
    }

    $musics = $controllerResult;

    if (!is_iterable($musics)) {
      $musics = [$musics];
    }

    foreach ($musics as $music) {
      if (!$music instanceof Music) {
        continue;
      }

      // dd($this->storage->resolveUri($music, 'imageFile'), $this->storage->resolveUri($music, 'songFile'));

      $music->setCoverUrl($this->storage->resolveUri($music, 'imageFile'));
      $music->setSongUrl($this->storage->resolveUri($music, 'songFile'));
    }
  }
}
