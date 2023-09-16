"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CodeGenerator } from "@prisma/client";
import { ErrorAlert } from "@/components/app_components/alerts/ErrorAlert";
import { SearchAlert } from "@/components/app_components/alerts/SearchAlert";
import { ListCard } from "@/components/app_components/cards/ListCard";
import { EmptyAlert } from "@/components/app_components/alerts/EmptyAlert";
import { LoadingCards } from "@/components/app_components/cards/LoadingCard";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a Language",
  }),
});

export default function SelectForm() {
  const [search, setSearch] = useState("");
  const { data: codeGenerators, isLoading: codeGeneratorsLoading } = useQuery({
    queryKey: ["codeGenerators"],
    queryFn: async (): Promise<CodeGenerator[]> => {
      const res = await fetch("/api/codegenerator");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
    onError: () => {
      toast({
        title: "Uh oh, something went wrong!",
        description: <p>There was an error loading your AI codeGenerators.</p>,
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/codegenerator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const responseData = await response.json();
      const codeGeneratorId = responseData.id; // Assuming the API response contains the ID of the newly created tutor
      toast({
        title: "Success",
        description: "Module Created Successfully!",
        variant: "default",
      });
      router.push(`/codegenerator/${codeGeneratorId}`);
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

  return (
    <div className="flex-1 px-4 py-10 md:py-16 max-w-5xl xl:max-w-6xl mx-auto w-full flex flex-col">
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold">Code Generator</h1>
        <p className="text-muted-foreground font-medium">
          Select a language and start creating your AI code generator.
        </p>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <div className="flex space-x-2">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search Files"
            className="lg:min-w-[840px]"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 relative"
            >
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                <SelectTrigger className="w-20 md:min-w-[180px]" >
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                </FormControl>
                      <SelectContent>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="JavaScript">JavaScript</SelectItem>
                        <SelectItem value="C++">C++</SelectItem>
                        <SelectItem value="C#">C#</SelectItem>
                        <SelectItem value="Ruby">Ruby</SelectItem>
                        <SelectItem value="Swift">Swift</SelectItem>
                        <SelectItem value="Kotlin">Kotlin</SelectItem>
                        <SelectItem value="PHP">PHP</SelectItem>
                        <SelectItem value="Go">Go</SelectItem>
                        <SelectItem value="TypeScript">TypeScript</SelectItem>
                        <SelectItem value="Rust">Rust</SelectItem>
                        <SelectItem value="Perl">Perl</SelectItem>
                        <SelectItem value="Scala">Scala</SelectItem>
                        <SelectItem value="Haskell">Haskell</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button className=" absolute md:left-[190px] left-[90px] bottom-[2px]" type="submit">Submit</Button>
      </form>
          </Form>
        </div>
      </div>
      <div className="mt-6">
        {codeGeneratorsLoading ? (
          <LoadingCards />
        ) : codeGenerators ? (
          codeGenerators.length === 0 || codeGenerators.length === undefined ? (
            <EmptyAlert />
          ) : (
            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
              {codeGenerators.filter((codeGenerator: any) =>
                codeGenerator.language.toLowerCase().includes(search.toLowerCase())
              ).length !== 0 ? (
                codeGenerators
                  .filter((codeGenerator: any) =>
                    codeGenerator.language.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((codeGenerator: any) => (
                    <ListCard
                      key={codeGenerator.id}
                      title={codeGenerator.language}
                      link={`/codegenerator/${codeGenerator.id}`}
                      itemType="CodeGenerator"
                      date={new Date(codeGenerator.createdAt)}
                    />
                  ))
              ) : (
                <SearchAlert />
              )}
            </div>
          )
        ) : (
          <ErrorAlert />
        )}
      </div>
    </div>
  );
}
