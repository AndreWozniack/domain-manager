<?php

namespace App\Services;

use App\Repositories\DomainRepositoryInterface;
use App\Models\Domain;

class DomainService
{
    public function __construct(private DomainRepositoryInterface $repo) {}

    public function list()  { return $this->repo->all(); }
    public function create(array $data): Domain
    { return $this->repo->create($data); }
    public function update($domain, array $data): Domain
    { return $this->repo->update($domain, $data); }
    public function delete($domain): void
    { $this->repo->delete($domain); }
}
