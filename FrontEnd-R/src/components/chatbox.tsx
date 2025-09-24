import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import type { Message } from '../App';

// Simple Button component (shadcn/ui style)
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
  }
>(({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

// Simple Input component (shadcn/ui style)
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

// TypeScript interfaces


interface ChatMessageBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  socket: React.MutableRefObject<any>;
  name: string | null;
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
  maxLength = 500,
  socket,
  name
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect( () => {
    if(message.trim() && name && message.length) {
      socket.current.emit('typing',name)
    }
  },[message]);


  const isMessageValid = message.trim().length > 0 && message.length <= maxLength;

  return (
    <div className="p-4">
      {/* Message input area */}
      <div className="flex  gap-2 p-4 rounded-lg shadow-lg border-2" style={{ backgroundColor: 'var(--primary-cream)', borderColor: 'var(--primary-orange)' }}>
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white placeholder:text-gray-600"
            style={{ color: '#4F200D' }}
          />
          {maxLength && (
            <div className="text-xs mt-1 text-right" style={{ color: '#4F200D' }}>
              {message.length}/{maxLength}
            </div>
          )}
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!isMessageValid || disabled}
          size="sm"
          className="text-black hover:opacity-80 transition-opacity"
          style={{ backgroundColor: '#FFD93D' }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

interface ChatBoxProps {
  name: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: React.MutableRefObject<any>;
}
// Demo component to show the chat message box in action
const ChatBox: React.FC<ChatBoxProps> = ( { name, messages, setMessages, socket }) => {
 
  const [typing, setTyping] = useState<string>('');

  useEffect(() => {
    if (!socket.current) return;  
    socket.current.on('typing', (userName: string) => {
      setTyping((prev) => [...new Set([userName, ...prev.split(', ')])].join(', '));  
      setTimeout(() => setTyping(''), 2000); // Clear after 2 seconds
    });

    return () => {
      socket.current.off('typing');
    };  
  }, [socket]);

  const handleSendMessage = (messageText: string) => {

    const t = messageText.trim();
    if (!t) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: t,
      timestamp: new Date(),
      sender: name
    };
    
    setMessages(prev => [...prev, newMessage]);
    socket.current.emit('chatMessage', newMessage);
  
  };

  return (
    <div style={{ position: 'relative', minHeight: '550px', backgroundColor: 'var(--primary-orange)'  }} 
        className='pt-2 w-[500px] mx-auto rounded-lg shadow-lg  h-[650px]'>
      {/* Background with the centered chat box */}
      <div className="p-1 min-h-8/10" style={{ backgroundColor: 'var(--primary-gray)' }}>
        <div className="flex items-center gap-4 bg-white p-6  outline outline-black/5 dark:bg-gray-800">
            <span className="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">
                <svg className="size-6 stroke-pink-700 dark:stroke-pink-500">ssdsd</svg>
            </span>
            <div>
                <p className="text-gray-700 dark:text-gray-400">
                  Signed in as 
                <span className="font-medium text-gray-950 dark:text-white"> {name}</span>
                </p>
               { typing &&
                <span className="mt-1 block text-gray-500 text-sm text-gray">{typing} is typing...</span>
                }
            </div>
            </div>
        
        {/* Messages display area */}
        <div className="rounded-lg shadow-lg border-2 mb-2 max-h-96 overflow-y-auto" style={{ backgroundColor: 'var(--primary-cream)', borderColor: 'var(--primary-orange)' }}>
          <div className="p-4 space-y-4">
            {messages.map((msg) => {
              const mine = msg.sender === name;
              return (
                 <div
                    key={msg.id}
                    className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        mine
                          ? 'text-black'
                          : 'text-black'
                      }`}
                      style={{
                        backgroundColor: mine ? '#FFD93D' : 'var(--primary-orange)'
                      }}
                    >
                      <p className="text-sm">{msg.sender}: {msg.text}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {msg.timestamp ? String(msg.timestamp) : ''}
                      
                      </p>
                    </div>
                  </div>
                  )
                }             
            )}
          </div>
        </div>
      </div>
      
      {/* Chat message box - centered */}
      <div className='min-h-1/10'>
        <ChatMessageBox
            onSendMessage={handleSendMessage}
            placeholder="Type your message here..."
            maxLength={500}
            socket={socket}
            name={name}
        />
        </div>
    </div>
  );
};

export default ChatBox;