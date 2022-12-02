<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)->create([
            'username' => 'akujoko',
            'role' => 'admin',
        ]);
        User::factory(1)->create([
            'username' => 'akujoki',
            'role' => 'admin',
        ]);
        User::factory(1)->create([
            'username' => 'akujoka',
            'role' => 'admin',
        ]);
    }
}
