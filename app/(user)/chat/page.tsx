"use client";
import { useForm,Form ,Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tutor } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorAlert } from "@/components/app_components/alerts/ErrorAlert";
import { SearchAlert } from "@/components/app_components/alerts/SearchAlert";
import { EmptyAlert } from "@/components/app_components/alerts/EmptyAlert";
import { ListCard } from "@/components/app_components/cards/ListCard";
import { LoadingCards } from "@/components/app_components/cards/LoadingCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Your title must be at least 5 characters." })
    .max(50, { message: "Your title must be less than 50 characters." }),
  description: z
    .string()
    .min(5, { message: "Your description must be at least 5 characters." })
    .max(200, { message: "Your title must be less than 200 characters." }),
  source: z
    .string()
    .min(5, { message: "Your source must be at least 5 characters." })
    .max(200, { message: "Your source must be less than 200 characters." }),
});

export default function TutorsPage() {
  const router = useRouter();

  const defaultValues = {
    title: "",
    description: "",
    source: "",
  };

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      router.push("/dashboard");
    } else {
      try {
        const responseData = await response.json();
        const errorMessage = responseData.error;
  
        toast({
          title: "Error!",
          description: errorMessage,
          variant: "destructive",
          action: (
            <ToastAction altText="Login">
              <Link href="/signin">Login</Link>
            </ToastAction>
          ),
        });
      } catch (error) {
        // Handle the case where the response is not valid JSON
        toast({
          title: "Error!",
          description: "An unexpected error occurred.",
          variant: "destructive",
          action: (
            <ToastAction altText="Login">
              <Link href="/signin">Login</Link>
            </ToastAction>
          ),
        });
      }
    }
  };
  const [search, setSearch] = useState("");

  const { data: tutors, isLoading: tutorsLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async (): Promise<Tutor[]> => {
      const res = await fetch("/api/chat");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
    onError: () => {
      toast({
        title: "Uh oh, something went wrong!",
        description: <p>There was an error loading your AI tutors.</p>,
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  return (
    <div className="flex-1 px-4 py-10 md:py-16 max-w-5xl xl:max-w-6xl mx-auto w-full flex flex-col">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold">File Chat</h1>
        <p className="text-muted-foreground font-medium">
          Create and manage your Files.
        </p>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Files"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white w-[200px]">Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="title"
                        className="col-span-3"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="description"
                        className="col-span-3"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source" className="text-right">
                    Source
                  </Label>
                  <Controller
                    name="source"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="source"
                        className="col-span-3"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        {tutorsLoading ? (
          <LoadingCards />
        ) : tutors ? (
          tutors.length === 0 || tutors.length === undefined ? (
            <EmptyAlert />

          ) : (
            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
              {tutors
                .filter((tutor) =>
                  tutor.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((tutor) => (
                  <ListCard
                    key={tutor.id}
                    title={tutor.title}
                    description={tutor.description}
                    link={`/tutors/${tutor.id}`}
                    itemType="Tutor"
                    date={new Date(tutor.createdAt)}
                  />
                ))}
            </div>
          )
        ) : (
          <ErrorAlert />
        )}
      </div>
    </div>
  );
}
