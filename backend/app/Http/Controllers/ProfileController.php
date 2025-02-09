<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    //
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(Request $request)
    {
        $user = $request->user();

        // Validate the update request
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
        ]);

        // Update the user's details
        $user->update($validated);

        return response()->json(['message' => 'Profile updated successfully']);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();

        // Validate the current password and the new password
        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // Check if the current password matches the stored password
        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['error' => 'Current password is incorrect.'], 400);
        }

        // Update the user's password
        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json(['message' => 'Password updated successfully.']);
    }
}
