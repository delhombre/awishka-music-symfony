<?php

namespace App\Events;

use ApiPlatform\Core\Serializer\ItemNormalizer;

final class IRIDenormalizer extends ItemNormalizer
{
  public function denormalize($data, $class, $format = null, array $context = [])
  {
    if (is_string($data) && !isset($context[ItemNormalizer::OBJECT_TO_POPULATE])) {
      return $this->iriConverter->getItemFromIri($data, $context + ['fetch_data' => true]);
    }

    return parent::denormalize($data, $class, $format, $context);
  }
}
