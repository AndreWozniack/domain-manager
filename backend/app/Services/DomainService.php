<?php

namespace App\Services;

use App\Http\Resources\DomainCollection;
use App\Repositories\DomainRepositoryInterface;
use App\Models\Domain;

readonly class DomainService
{
    public function __construct(private DomainRepositoryInterface $repo) {}

    public function list(): DomainCollection
    {
        return $this->repo->all();
    }

    public function create(array $data): Domain
    {
        // regras de negócio além da validação (ex.: checar blacklist)
        return $this->repo->create($data);
    }

    public function update(Domain $domain, array $data): Domain
    {
        return $this->repo->update($domain, $data);
    }

    public function delete(Domain $domain): void
    {
        // lógica extra? (ex.: não apagar se já expirou há ≤30 dias)
        $this->repo->delete($domain);
    }
}
