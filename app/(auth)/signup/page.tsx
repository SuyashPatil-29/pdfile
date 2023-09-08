import React from 'react';
import SignUpForm from '@/components/app_components/SignUpForm';

export default function DemoCreateAccount() {
  return (
    <div className="min-h-screen min-w-screen bg-black flex flex-col items-center justify-center gap-10"
    style={{backgroundImage: "url(/assets/docs-right.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left"}}
    >
      <SignUpForm />
    </div>
  );
}