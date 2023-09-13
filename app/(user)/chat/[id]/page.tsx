// app/chat.tsx -- client component
'use client';

import { BotAvatar } from '@/components/app_components/avatars/BotAvatar';
import { UserAvatar } from '@/components/app_components/avatars/UserAvatar';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ToastAction } from '@radix-ui/react-toast';
import { useChat } from 'ai/react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat/[id]',
  });

  const router = useRouter()
  const params = useParams()

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<any> => {
      const res = await fetch("/api/validate");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
    onError: () => {
      toast({
        title: "Uh oh, something went wrong!",
        description: <p>There was an error loading the dashboard.</p>,
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  const isValid = user?.tutors.some((tutor: any) => tutor.id === params.id); // Use .some() to check if params.id is in the array
  
  if (!isValid) {
    redirect("/chat"); // Redirect the user to "/chat"
  }  

  return (
    <div className='w-3/5 mx-auto text-black'>
      <div className="flex flex-col gap-y-4 mb-52 mt-10">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "w-full flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div className="flex items-center gap-x-4 border border-black/20 rounded-xl pl-4 p-4">
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-md">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

      <div className="fixed inset-x-0 bottom-0 p-4 bg-background border-t shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 max-w-xl mx-auto border rounded-lg p-4 ring-offset-background focus-within:ring-2 ring-offset-2 ring-ring"
      >
        <textarea
          className="resize-none flex-1 overflow-hidden text-sm text-black font-medium focus:outline-none"
          onChange={handleInputChange}
          value={input}
          spellCheck
          rows={2}
          placeholder="Send a message..."
        />
          <Button type="submit" >
            Send{" "}
          </Button>
      </form>
    </div>
    </div>
  );
}
