<?php

namespace App\Repositories;

use App\Http\Resources\DomainCollection;
use App\Models\Domain;

interface DomainRepositoryInterface
{
    public function all(): DomainCollection;
    public function find(int $id): ?Domain;
    public function create(array $data): Domain;
    public function update(Domain $domain, array $data): Domain;
    public function delete(Domain $domain): void;
}
