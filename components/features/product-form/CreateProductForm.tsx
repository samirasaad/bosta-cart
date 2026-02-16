"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { createProductSchema } from "@/lib/schemas/product";
import type { CreateProductFormValues } from "@/lib/schemas/product";
import { useRecentProductStore } from "@/lib/stores/recentProductStore";
import { useLocalProductsStore } from "@/lib/stores/localProductsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { SelectableChip } from "@/components/ui/SelectableChip";
import { CheckMark } from "@/components/ui/lotties/CheckMarkAnimation";

const iconClass = "w-5 h-5 shrink-0";

export function CreateProductForm() {
  const router = useRouter();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const createProduct = useCreateProduct();
  const setRecentProduct = useRecentProductStore((s) => s.setRecentProduct);
  const addLocalProduct = useLocalProductsStore((s) => s.addProduct);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      category: "",
      image: "",
    },
  });

  const onSubmit = async (data: CreateProductFormValues) => {
    try {
      const upperTitle = data.title.toUpperCase();
      const upperDescription = data.description.toUpperCase();

      const created = await createProduct.mutateAsync({
        title: upperTitle,
        description: upperDescription,
        price: Number(data.price),
        category: data.category,
        image: data.image,
      });
      setRecentProduct(created);
      addLocalProduct(created);
      reset();
      setTimeout(() => router.push("/products"), 1500);
    } catch {
      // Error is shown via createProduct.isError
    }
  };

  const categoryOptions = (categories as string[]).map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }));

  const selectedCategory = watch("category");

  if (createProduct.isSuccess) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-6 text-center">
        <CheckMark />
          <p className="text-lg font-medium text-foreground">
            Product created successfully. Redirecting to products...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <PlusCircleIcon className={iconClass} aria-hidden />
          Create Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<CreateProductFormValues>)}
          className="space-y-4"
          noValidate
        >
          {createProduct.isError && (
            <ErrorMessage
              message={
                createProduct.error &&
                typeof createProduct.error === "object" &&
                "message" in createProduct.error
                  ? String((createProduct.error as { message: string }).message)
                  : "Failed to create product."
              }
            />
          )}
          <Input
            label="Title"
            placeholder="Product title"
            required
            {...register("title")}
            error={errors.title?.message}
          />
          <Textarea
            label="Description"
            placeholder="Product description"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />
          <Input
            label="Price"
            type="number"
            step="0.01"
            min="1"
            placeholder="0.00"
            required
            {...register("price")}
            error={errors.price?.message}
          />
          <div>
            <p className="block text-sm font-medium text-foreground mb-1">
              Category
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Product category"
            >
              {categoryOptions.map((opt) => (
                <SelectableChip
                  key={opt.value}
                  isActive={selectedCategory === opt.value}
                  onClick={() =>
                    setValue("category", opt.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  aria-label={`Category: ${opt.label}`}
                >
                  {opt.label}
                </SelectableChip>
              ))}
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>
          <Input
            label="Image URL"
            type="url"
            placeholder="https://..."
            required
            {...register("image")}
            error={errors.image?.message}
          />
          <div className="text-xs text-muted-foreground">
            Hint: you can use this demo image URL for testing:{" "}
            <p className="font-mono break-all">
              https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting || createProduct.isPending}
              disabled={isSubmitting || createProduct.isPending || categoriesLoading}
              fullWidth
              className="inline-flex items-center justify-center gap-2"
            >
              <PlusCircleIcon className={iconClass} aria-hidden />
              Create Product
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              disabled={createProduct.isPending}
              className="inline-flex items-center justify-center gap-2"
            >
              <XMarkIcon className={iconClass} aria-hidden />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
