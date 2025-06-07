<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class DomainController extends Controller
{
    public function __construct(private DomainService $service) {}

    public function index(): JsonResponse
    {
        return response()->json($this->service->list());
    }

    public function store(DomainRequest $req) : JsonResponse
    {
        $domain = $this->service->create($req->validated());
        return response()->json($domain, 201);
    }

    public function show(Domain $dominio): Domain
    {
        return $dominio; // route-model-binding
    }

    public function update(DomainRequest $req, Domain $dominio)
    {
        return $this->service->update($dominio, $req->validated());
    }

    public function destroy(Domain $dominio): Response
    {
        $this->service->delete($dominio);
        return response()->noContent();
    }
}
