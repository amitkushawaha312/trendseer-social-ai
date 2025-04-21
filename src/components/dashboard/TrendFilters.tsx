
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { platforms, categories } from "@/data/mockData";
import { FilterState } from "@/types";
import { useState } from "react";

interface TrendFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function TrendFilters({ filters, onChange }: TrendFiltersProps) {
  const timeframeOptions = [
    { value: "1d", label: "1 Day" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "growth", label: "Growth Rate" },
    { value: "sentiment", label: "Sentiment" },
  ];

  // Track filter state locally for better UX
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Handle platform toggle
  const togglePlatform = (platformId: string) => {
    const newPlatforms = localFilters.platforms.includes(platformId)
      ? localFilters.platforms.filter(id => id !== platformId)
      : [...localFilters.platforms, platformId];
    
    const newFilters = { ...localFilters, platforms: newPlatforms };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  // Handle category toggle
  const toggleCategory = (categoryId: string) => {
    const newCategories = localFilters.categories.includes(categoryId)
      ? localFilters.categories.filter(id => id !== categoryId)
      : [...localFilters.categories, categoryId];
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  // Handle timeframe change
  const changeTimeframe = (timeframe: string) => {
    const newFilters = { ...localFilters, timeframe };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  // Handle sort change
  const changeSort = (sortBy: string) => {
    const newFilters = { ...localFilters, sortBy };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Platforms */}
        <div>
          <h4 className="text-sm font-medium mb-2">Platforms</h4>
          <div className="grid grid-cols-2 gap-2">
            {platforms.map(platform => (
              <div 
                key={platform.id}
                className="flex items-center space-x-2"
              >
                <Checkbox 
                  id={`platform-${platform.id}`}
                  checked={localFilters.platforms.includes(platform.id)}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
                <Label
                  htmlFor={`platform-${platform.id}`}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <span className="mr-1">{platform.icon}</span> {platform.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium mb-2">Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <div 
                key={category.id}
                className="flex items-center space-x-2"
              >
                <Checkbox 
                  id={`category-${category.id}`}
                  checked={localFilters.categories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timeframe */}
        <div>
          <h4 className="text-sm font-medium mb-2">Timeframe</h4>
          <div className="flex flex-wrap gap-2">
            {timeframeOptions.map(option => (
              <Button
                key={option.value}
                variant={localFilters.timeframe === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => changeTimeframe(option.value)}
                className="text-xs h-7 px-2"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Sort By */}
        <div>
          <h4 className="text-sm font-medium mb-2">Sort By</h4>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map(option => (
              <Button
                key={option.value}
                variant={localFilters.sortBy === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => changeSort(option.value)}
                className="text-xs h-7 px-2"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Reset Filters */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => {
            const resetFilters = {
              platforms: [],
              categories: [],
              timeframe: "30d",
              sortBy: "popularity",
            };
            setLocalFilters(resetFilters);
            onChange(resetFilters);
          }}
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}
