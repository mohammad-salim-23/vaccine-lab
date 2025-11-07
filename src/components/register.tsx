"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signUp } from "@/actions/auth/sign-up";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp(data);

      if (result.error) {
        setError(result.error);
        return;
      }

      // Redirect to dashboard or home page on success
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>

      <h3 className="text-center text-lg font-semibold text-foreground dark:text-foreground">
        Create an Account
      </h3>
      <p className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
        Please fill in the details below to create an account.
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/10 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <Label
            htmlFor="name"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Full Name
          </Label>
          <Input
            type="text"
            id="name"
            autoComplete="name"
            placeholder="John Doe"
            className="mt-2"
            disabled={isLoading}
            {...form.register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
              maxLength: { value: 50, message: "Name must be less than 50 characters" }
            })}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="ephraim@blocks.so"
            className="mt-2"
            disabled={isLoading}
            {...form.register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              },
              minLength: { value: 5, message: "Email must be at least 5 characters" },
              maxLength: { value: 100, message: "Email must be less than 100 characters" }
            })}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="**************"
            className="mt-2"
            disabled={isLoading}
            {...form.register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 32, message: "Password must be less than 32 characters" }
            })}
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="mt-4 w-full py-2 font-medium" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
        Do you have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90"
        >
          Sign in
        </Link>
      </p>

    </>
  );
}

export default Register;
