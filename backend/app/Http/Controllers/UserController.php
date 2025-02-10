<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $countPerPage = $request->get('per_page', 5);

        $users = User::paginate($countPerPage);  // Only show user for the authenticated user

        // Return the paginated data as JSON
        return response()->json([
            'data' => $users->items(), // Get the actual items
            'pagination' => [
                'total' => $users->total(), // Total number of records
                'current_page' => $users->currentPage(), // Current page
                'per_page' => $users->perPage(), // Items per page
                'last_page' => $users->lastPage(), // Last page
                'next_page_url' => $users->nextPageUrl(), // URL for the next page
                'prev_page_url' => $users->previousPageUrl(), // URL for the previous page
            ]
        ]);
    }


    public function destroy(User $user)
    {

        if ($user->id !== auth()->id() && $user->is_admin) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        if (User::count() === 1) {
            return response()->json(['error' => 'Cannot delete the only remaining user'], 403);
        }

        // Optionally, you can delete the old file if it's no longer needed

        $user->delete();
        return response()->json(['message' => 'User entry deleted successfully']);
    }
}
