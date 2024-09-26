"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateExerciseCategory } from "@/types";
import { ExerciseCategoryEnum } from "@prisma/client";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function ExercisesFilters({
  search,
  category,
}: {
  search?: string;
  category?: ExerciseCategoryEnum;
}) {
  const [_search, setSearch] = useState<string>(search || "");
  const [_category, setCategory] = useState<ExerciseCategoryEnum | undefined>(
    category
  );

  const router = useRouter();
  const pathName = usePathname();

  function handleSearchChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    if (_search) {
      searchParams.set("search", _search.trim());
    }

    if (_category) {
      searchParams.set("category", _category);
    }

    router.push(`${pathName}?${searchParams.toString()}`);
  }

  function handleClearFilters() {
    setSearch("");
    setCategory(undefined);
    router.push(pathName);
  }

  return (
    <form
      className="w-fit flex items-end gap-2 flex-wrap"
      onSubmit={handleSearchChange}
    >
      <div className="flex-1 min-w-40">
        <Label htmlFor="search">Pesquisa</Label>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisar"
          value={_search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 min-w-40">
        <Label htmlFor="category">Categoria</Label>
        <Select
          value={_category}
          onValueChange={(v) => setCategory(v as ExerciseCategoryEnum)}
        >
          <SelectTrigger name="category" id="category" className="w-full">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ExerciseCategoryEnum).map((category) => {
              return (
                <SelectItem key={category} value={category}>
                  {translateExerciseCategory(category)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <Button className="flex-1 min-w-full md:min-w-24" type="submit">
        Pesquisar
      </Button>

      <Button
        className="flex-1 min-w-full md:min-w-24"
        variant="outline"
        onClick={handleClearFilters}
      >
        Limpar <X size={15} />
      </Button>
    </form>
  );
}
