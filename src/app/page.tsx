'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';

export default function Page() {
  const router = useRouter()
  const greeting = "Hai, Anindyaaa...";
  const heartfeltMessage = "Semoga hari-harimu dipenuhi cinta, kebahagiaan, dan yang kamu impikan secepatnya dikabulkan, Amin...";

  return (
    <div>
      <h3 className="justify-center text-center text-xl text-white text-wrap">
        <TypewriterComponent
          onInit={(typewriter) => {
            typewriter.typeString(greeting)
              .callFunction(() => {
                console.log('String typed out!');
              })
              .pauseFor(3500)
              .deleteAll()
              .typeString(heartfeltMessage)
              .pauseFor(3500)
              .deleteAll()
              .callFunction(() => {
                console.log('All strings were deleted');
                router.push('/hbd-anindya')
              })
              .start();
          }}
        />
      </h3>


    </div>
  );
}
