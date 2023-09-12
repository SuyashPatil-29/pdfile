// app/chat.tsx -- client component
'use client';

import { BotAvatar } from '@/components/app_components/avatars/BotAvatar';
import { UserAvatar } from '@/components/app_components/avatars/UserAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat/[id]',
  });

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
