<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DomainCollection extends ResourceCollection
{
    /**
     * @return array<int, array>   @phpstan-return array<array-key, mixed>
     */
    public function toArray($request): array
    {
        return $this->collection
            ->map(fn ($domain) => (new DomainResource($domain))->toArray($request))
            ->all();
    }
}
