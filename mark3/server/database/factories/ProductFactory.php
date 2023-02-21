<?php

namespace Database\Factories;

use App\Models\Product;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(5),
            'price' => $this->faker->numberBetween(1, 100),
            'image' => 'https://previews.123rf.com/images/fabrikacrimea/fabrikacrimea1709/fabrikacrimea170907191/85988451-cool-fashion-casual-men-outfit-on-wooden-table.jpg',
            'updated_at' => date(now())

        ];
    }
}
