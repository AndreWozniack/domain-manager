<?php

namespace App\Repositories;

use App\Models\Domain;
use Illuminate\Database\Eloquent\Collection;

class DomainRepository implements DomainRepositoryInterface
{
    public function all(): Collection
    {
        return Domain::all();
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
