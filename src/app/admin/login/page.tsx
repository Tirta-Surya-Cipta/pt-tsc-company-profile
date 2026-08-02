"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/server/validators/auth.validator";
import { Container } from "@/components/shared/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setSubmitting(true);
    try {
      const response = await axios.post("/api/admin/login", data);
      if (response.data.success) {
        toast.success("Authentication successful! Welcome to the industrial dashboard.");
        router.push("/admin/dashboard");
      } else {
        toast.error(response.data.error || "Invalid email or password");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Invalid credentials. Please verify your data.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="flex items-center justify-center min-h-[70vh] py-12">
      <Card className="w-full max-w-md bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary w-fit">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            PT TSC Admin Panel
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-2">
            Authorized Personnel Only
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Email Address</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Secure Password</label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" disabled={submitting} className="w-full mt-2">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Access Admin Space
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
