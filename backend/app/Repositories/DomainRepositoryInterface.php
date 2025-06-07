<?php
namespace App\Repositories;

use App\Models\Domain;

interface DomainRepositoryInterface
{
    public function all();
    public function find(int $id): ?Domain;
    public function create(array $data): Domain;
    public function update(Domain $domain, array $data): Domain;
    public function delete(Domain $domain): void;
}
