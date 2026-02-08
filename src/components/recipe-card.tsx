"use client";

import { ChefHat, Clock, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface RecipeCardProps {
  title?: string;
  description?: string;
  ingredients?: Ingredient[];
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  originalServings?: number;
}

export default function RecipeCard({
  title,
  description,
  ingredients,
  prepTime = 0,
  cookTime = 0,
  originalServings,
}: RecipeCardProps) {
  const [servings, setServings] = useState(originalServings || 1);

  const scaleFactor = servings / (originalServings || 1);

  const handleServingsChange = (newServings: number) => {
    if (newServings > 0) {
      setServings(newServings);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const totalTime = prepTime + cookTime;

  return (
    <div className="bg-white max-w-md rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatTime(totalTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{servings} servings</span>
          </div>
          {prepTime > 0 && (
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              <span>Prep: {formatTime(prepTime)}</span>
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Adjust Servings:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleServingsChange(servings - 1)}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                disabled={servings <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg min-w-[3rem] text-center">
                {servings}
              </span>
              <button
                onClick={() => handleServingsChange(servings + 1)}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Ingredients
          </h3>
          <ul className="space-y-2">
            {ingredients?.map((ingredient, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                <span className="font-medium text-gray-900">
                  {(ingredient.amount * scaleFactor).toFixed(
                    (ingredient.amount * scaleFactor) % 1 === 0 ? 0 : 1,
                  )}
                </span>
                <span className="text-gray-600">{ingredient.unit}</span>
                <span className="text-gray-800">{ingredient.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}