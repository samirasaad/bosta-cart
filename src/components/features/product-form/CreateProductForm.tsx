"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
}

export function CreateProductForm() {
  const router = useRouter();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const createProduct = useCreateProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!title.trim()) next.title = "Title is required.";
    if (!description.trim()) next.description = "Description is required.";
    const priceNum = parseFloat(price);
    if (price === "" || isNaN(priceNum))
      next.price = "Price must be a number.";
    else if (priceNum <= 0) next.price = "Price must be greater than 0.";
    if (!category) next.category = "Category is required.";
    if (!image.trim()) next.image = "Image URL is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [title, description, price, category, image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createProduct.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        image: image.trim(),
      });
      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setErrors({});
      setTimeout(() => router.push("/products"), 1500);
    } catch {
      // Error is shown via createProduct.isError
    }
  };

  const categoryOptions = categories.map((c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1),
  }));

  if (success) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-6 text-center">
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
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product title"
            error={errors.title}
            required
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
              rows={4}
              className={`w-full px-3 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${
                errors.description ? "border-destructive" : "border-input"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-destructive" role="alert">
                {errors.description}
              </p>
            )}
          </div>
          <Input
            label="Price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            error={errors.price}
            required
          />
          <Select
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
            disabled={categoriesLoading}
            error={errors.category}
          />
          <Input
            label="Image URL"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            error={errors.image}
            required
          />
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={createProduct.isPending}
              disabled={createProduct.isPending || categoriesLoading}
              fullWidth
            >
              Create Product
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push("/products")}
              disabled={createProduct.isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
