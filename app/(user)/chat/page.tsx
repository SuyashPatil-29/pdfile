// app/chat.tsx -- client component
'use client';

import { useChat } from 'ai/react';

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="p-4"> {/* Add padding */}
      <ul>
        {messages.map((m, index) => (
          <li
            key={index}
            className={`${
              m.role === 'user' ? 'text-blue-500' : 'text-green-500'
            } mb-2`}
          > {/* Add text color and margin bottom */}
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4"> {/* Add margin top */}
        <label className="block text-gray-700"> {/* Add label styles */}
          Say something...
          <input
            value={input}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring focus:border-blue-500 w-full"
          /> {/* Add input styles */}
        </label>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
        > {/* Add button styles */}
          Send
        </button>
      </form>
    </div>
  );
}
