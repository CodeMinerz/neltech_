<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

trait CrudTrait
{
    protected $model;  // e.g., User::class
    protected $inertiaView; // e.g., 'PM/users/index'
    protected $routePrefix; // e.g., 'user'
    protected $formRequest; // e.g., UserFormRequest::class
    protected $queryWith = []; // e.g., 'roles'

    public function index(Request $request)
    {
        $searchableColumns = method_exists($this->model, 'searchable') ? $this->model::searchable() : ['name'];
        $query = $this->model::query()
            ->when($request->has('search'), function ($query) use ($request,$searchableColumns) {
                 // Customize searchable columns
                foreach ($searchableColumns as $column) {
                    $query->orWhere($column, 'like', '%' . $request->search . '%');
                }
            })
            ->latest()
            ->with($this->queryWith)
            ->paginate(10);
        return Inertia::render($this->inertiaView . '/index', [
            'record' => $query,
            'filters' => [$request->only('search'), 'placeholder' => $searchableColumns],
        ]);
    }
    public function create()
    {
        $additionalProps = method_exists($this, 'getAdditionalCreateProps') ? $this->getAdditionalCreateProps() : [];
        return Inertia::render($this->inertiaView . '/form', array_merge(['rootPrefix' => $this->routePrefix] , $additionalProps));
    }
    public function store(Request $request)
    {
        $validated = $request->validate((new $this->formRequest())->rules());
        DB::beginTransaction();
        try {
            $record = $this->model::create($validated );
            $additionalProps = method_exists($this, 'getAdditionalStoreProps') ? $this->getAdditionalStoreProps($request, $record) : [];

            DB::commit();
            return redirect()->route($this->routePrefix . '.index')->with('success', ucfirst($this->routePrefix) . ' created successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e);
            return back()->with('error', 'Failed to create ' . $this->routePrefix . '.');
        }
    }

    public function show($id)
    {
        $record = $this->model::findOrFail($id);
        $additionalProps = method_exists($this, 'getAdditionalShowProps') ? $this->getAdditionalShowProps($record) : [];
        return Inertia::render($this->inertiaView . '/form', array_merge(['record' => $record, 'isView' => true, 'rootPrefix' => $this->routePrefix], $additionalProps));
    }

    public function edit($id)
    {
        $record = $this->model::findOrFail($id);
         $additionalProps = method_exists($this, 'getAdditionalEditProps') ? $this->getAdditionalEditProps($record) : [];
        return Inertia::render($this->inertiaView . '/form', array_merge(['record' => $record, 'isEdit' => true, 'rootPrefix' => $this->routePrefix], $additionalProps));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate((new $this->formRequest())->rules());
        DB::beginTransaction();
        try {
            $record = $this->model::findOrFail($id);
            $record->update($validated);
            $additionalProps = method_exists($this, 'getAdditionalUpdateProps') ? $this->getAdditionalUpdateProps($request,$record) : [];

            DB::commit();
            return redirect()->route($this->routePrefix . '.index')->with('success', ucfirst($this->routePrefix) . ' updated successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e);
            return back()->with('error', 'Failed to update ' . $this->routePrefix . '.');
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $record = $this->model::findOrFail($id);
            $record->delete();
            DB::commit();
            return redirect()->route($this->routePrefix . '.index')->with('success', ucfirst($this->routePrefix) . ' deleted successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e);
            return back()->with('error', 'Failed to delete ' . $this->routePrefix . '.');
        }
    }
}