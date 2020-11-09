<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Vich\UploaderBundle\Storage\StorageInterface;

final class ProfileUrlResolver implements EventSubscriberInterface
{
  private $storage;

  public function __construct(StorageInterface $storage)
  {
    $this->storage = $storage;
  }

  public static function getSubscribedEvents(): array
  {
    return [
      KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
    ];
  }

  public function onPreSerialize(ViewEvent $event): void
  {
    $controllerResult = $event->getControllerResult();
    $request = $event->getRequest();

    if ($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true)) {
      return;
    }

    if (!($attributes = RequestAttributesExtractor::extractAttributes($request)) || !\is_a($attributes['resource_class'], User::class, true)) {
      return;
    }

    $users = $controllerResult;

    if (!is_iterable($users)) {
      $users = [$users];
    }

    foreach ($users as $user) {
      if (!$user instanceof User) {
        continue;
      }

      // $profile = $user->getProfile();

      // $profile->profileUrl = $this->storage->resolveUri($profile, 'profileFile');
    }
  }
}
