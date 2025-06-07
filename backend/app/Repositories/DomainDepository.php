<?php

namespace App\Repositories;

use App\Models\Domain;
use Illuminate\Database\Eloquent\Collection;

class DomainRepository implements DomainRepositoryInterface
{
    public function all(): Collection
    { return Domain::all(); }
    public function find(int $id): ?Domain
    { return Domain::find($id); }
    public function create(array $d): Domain
    { return Domain::create($d); }
    public function update(Domain $d, array $data): Domain
    { $d->update($data); return $d; }
    public function delete(Domain $d): void
    { $d->delete(); }
}
