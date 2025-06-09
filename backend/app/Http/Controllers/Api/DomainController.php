<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DomainCollection;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Services\DomainService;
use App\Http\Requests\DomainRequest;
use App\Http\Resources\DomainResource;
use App\Models\Domain;

class DomainController extends Controller
{
    public function __construct(private readonly DomainService $service) {}

    public function index(): DomainCollection
    {
        return new DomainCollection($this->service->list());
    }

    public function store(DomainRequest $req): JsonResponse
    {
        $dominio = $this->service->create($req->validated());
        return response()->json(new DomainResource($dominio), 201);
    }

    public function show(Domain $dominio): DomainResource
    {
        return new DomainResource($dominio);
    }

    public function update(DomainRequest $req, Domain $dominio): DomainResource
    {
        $updated = $this->service->update($dominio, $req->validated());
        return new DomainResource($updated);
    }

    public function destroy(Domain $dominio): Response
    {
        $this->service->delete($dominio);
        print "Domain deleted successfully.\n";
        return response();
    }

}
