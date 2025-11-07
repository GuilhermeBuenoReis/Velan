<?php

namespace App\Interface;

Interface Repository
{
    public function store(array $data);
    public function show(string $id);
    public function update(array $data, string $id);
    public function destroy(string $id);
}