<?php

namespace App\Http\Repositories;

use App\Interface\Repository;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements Repository {
    protected Model $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function store(array $data) {
        return $this->model->create($data);
    }

    public function show(string $id){
        return $this->model->findOrFail($id);
    }

    public function update(array $data, string $id){
        $user = $this->show($id);

        $user->update($data);

        return $user->fresh();
    }

    public function destroy(string $id) {
        $this->show($id)->delete();
    }
}