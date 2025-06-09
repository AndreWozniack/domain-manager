<?php

namespace App\Repositories;

use App\Http\Resources\DomainCollection;
use App\Models\Domain;

class DomainRepository implements DomainRepositoryInterface
{
    public function all(): DomainCollection
    {
        return new DomainCollection(Domain::all());
    }

    public function find(int $id): ?Domain
    {
        return Domain::find($id);
    }

    public function create(array $data): Domain
    {
        return Domain::create($data);
    }

    public function update(Domain $domain, array $data): Domain
    {
        $domain->update($data);
        return $domain;
    }

    public function delete(Domain $domain): void
    {
        $domain->delete();
    }
}
