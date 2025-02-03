<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Diary;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $countPerPage = $request->get('per_page', 1);

        $diaries = Diary::where('user_id', auth()->id())->paginate($countPerPage);  // Only show diaries for the authenticated user

        // Return the paginated data as JSON
        return response()->json([
            'data' => $diaries->items(), // Get the actual items
            'pagination' => [
                'total' => $diaries->total(), // Total number of records
                'current_page' => $diaries->currentPage(), // Current page
                'per_page' => $diaries->perPage(), // Items per page
                'last_page' => $diaries->lastPage(), // Last page
                'next_page_url' => $diaries->nextPageUrl(), // URL for the next page
                'prev_page_url' => $diaries->previousPageUrl(), // URL for the previous page
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'summary' => 'required',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,bmp,tiff,webp,svg|max:10240', // Allow multiple image types
        ]);

        // Handle file upload if present
        $entry_date = Carbon::now()->toDateString();
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store(
                'diary_files/' . auth()->id() . '/' . $entry_date, 'public'
            );
        }

        $diary = Diary::create([
            'user_id' => auth()->id(),
            'entry_date' => $entry_date,
            'summary' => $request->summary,
            'file_path' => $filePath,
        ]);

        return response()->json($diary, 201); // Return the created diary entry with status 201
    }

    /**
     * Display the specified resource.
     */
    public function show(Diary $diary)
    {
        // Ensure the diary belongs to the authenticated user
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        return response()->json($diary);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diary $diary)
    {
        // Ensure the diary belongs to the authenticated user
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $request->validate([
            'summary' => 'required',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,bmp,tiff,webp,svg|max:10240', // Allow multiple image types
        ]);        

        $filePath = $diary->file_path; // Keep the existing file path if no new file is uploaded

        if ($request->hasFile('file')) {
            // Handle the new file upload and replace the old file
            // You can store the file in the same structure using the user ID and entry date
            $entry_date = $diary->entry_date;
            $filePath = $request->file('file')->store(
                'diary_files/' . auth()->id() . '/' . $entry_date, 'public'
            );

            // Optionally, you can delete the old file if it's no longer needed
            if ($diary->file_path && file_exists(storage_path('app/public/' . $diary->file_path))) {
                unlink(storage_path('app/public/' . $diary->file_path)); // Delete old file
            }
        }

        $diary->update([
            'summary' => $request->summary ?? $diary->summary, // Keep old value if no new summary is provided
            'file_path' => $filePath, // Update the file path if a new file was uploaded
        ]);

        return response()->json($diary);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diary $diary)
    {
        // Ensure the diary belongs to the authenticated user
        if ($diary->user_id !== auth()->id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Optionally, you can delete the old file if it's no longer needed
        if ($diary->file_path && file_exists(storage_path('app/public/' . $diary->file_path))) {
            unlink(storage_path('app/public/' . $diary->file_path)); // Delete old file
        }

        $diary->delete();
        return response()->json(['message' => 'Diary entry deleted successfully']);
    }
}
