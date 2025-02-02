<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diary extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural of the model name
    protected $table = 'diaries';

    // Specify which attributes can be mass-assigned (fillable)
    protected $fillable = [
        'user_id',
        'entry_date',
        'summary',
        'file_path',
    ];

    // Define the relationship between a diary entry and a user
    public function user()
    {
        return $this->belongsTo(User::class); // Assuming 'User' model is used for authentication
    }

    // If you are using file uploads, you can also define a method to retrieve the file path or URL
    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }

    // If you want to use some default values for the model's attributes
    protected $attributes = [
        'file_path' => null,  // Default value for entry_date
    ];
}
