"use client";

import { useEffect, useRef, useState } from "react";

const style = {
  accessories: ["earings", "flower", "glasses", "headphone"],
  background: [
    "blue50",
    "blue60",
    "blue70",
    "darkblue30",
    "darkblue50",
    "darkblue70",
    "green50",
    "green60",
    "green70",
    "grey40",
    "grey70",
    "grey80",
    "red50",
    "red60",
    "red70",
    "yellow50",
    "yellow60",
    "yellow70",
  ],
  ears: ["default", "tilt-backward", "tilt-forward"],
  eyes: ["angry", "default", "naughty", "panda", "smart", "star"],
  hair: ["bang", "curls", "default", "elegant", "fancy", "quiff", "short"],
  leg: [
    "bubble-tea",
    "cookie",
    "default",
    "game-console",
    "tilt-backward",
    "tilt-forward",
  ],
  mouth: ["astonished", "default", "eating", "laugh", "tongue"],
  neck: ["bend-backward", "bend-forward", "default", "thick"],
};

type Style = typeof style;
type Category = keyof Style;

type State = {
  downloadLink: string;
  key: Category;
  options: {
    [K in Category]: Style[K][number];
  };
};

export default function Home() {
  const [state, setState] = useState<State>(() => ({
    downloadLink: "",
    key: "hair",
    options: getRandomStyle(),
  }));

  const canvasRef = useRef<React.ComponentRef<"canvas">>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    canvas.width = 340 * window.devicePixelRatio;
    canvas.height = 340 * window.devicePixelRatio;

    const imageObjects = Object.entries(state.options).map(([key, value]) => {
      const img = new Image();
      img.src = `/${key}/${value}.png`;

      return img;
    });

    const removedImageObjects = imageObjects.splice(4, imageObjects.length - 4);

    const img = new Image();
    img.src = `/nose.png`;

    imageObjects.push(img, ...removedImageObjects);

    const imagePromises: Promise<HTMLImageElement>[] = imageObjects.map(
      (img) =>
        new Promise((resolve) => {
          img.onload = () => resolve(img);
        }),
    );

    (async () => {
      const loadedImages = await Promise.all(imagePromises);

      loadedImages.forEach((loadedImg) => {
        context.drawImage(loadedImg, 0, 0, canvas.width, canvas.height);
      });

      setState((previousState) => ({
        ...previousState,
        downloadLink: canvas.toDataURL("image/png"),
      }));
    })();
  }, [state.options]);

  return (
    <div className="grid max-w-[50rem] gap-x-20 gap-y-12 p-2 max-md:justify-items-center md:grid-cols-2 md:grid-rows-[auto_1fr]">
      <h1 className="col-span-full text-4xl font-extrabold text-blue-950 md:text-5xl">
        ALPACA GENERATOR
      </h1>
      <div className="flex flex-col gap-8 md:row-start-2">
        <canvas ref={canvasRef} className="w-full max-w-[384px]" />

        <div className="flex gap-6 ">
          <button
            onClick={() =>
              setState((previousState) => ({
                ...previousState,
                options: getRandomStyle(),
              }))
            }
            className="inline-flex flex-1 justify-center gap-2 bg-white px-6 py-2 font-extrabold text-blue-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>
            Random
          </button>
          <a
            href={state.downloadLink}
            download="style"
            className="inline-flex flex-1 justify-center gap-2 bg-white px-6 py-2 font-extrabold text-blue-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:row-start-2">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-black text-blue-950">
            ACCESSORIZE THE style&apos;S
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(style).map((currentKey) => (
              <button
                key={currentKey}
                onClick={() => {
                  setState((previousState) => ({
                    ...previousState,
                    key: currentKey as Category,
                  }));
                }}
                className={`rounded-full px-6 py-2 capitalize ${
                  state.key === currentKey
                    ? "bg-blue-900 font-medium text-white"
                    : "border border-blue-700 text-blue-700 hover:-m-[1px] hover:border-2 hover:border-blue-800 hover:font-medium hover:text-blue-800"
                }`}
              >
                {currentKey}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-black text-blue-950">STYLE</div>

          <div className="flex flex-wrap gap-2">
            {style[state.key].map((selectedOption) => (
              <button
                key={selectedOption}
                onClick={() =>
                  setState((previousState) => ({
                    ...previousState,
                    options: {
                      ...previousState.options,
                      [state.key]: selectedOption,
                    },
                  }))
                }
                className={`rounded-full px-6 py-2 capitalize ${
                  selectedOption === state.options[state.key]
                    ? "bg-blue-900 font-medium text-white"
                    : "border border-blue-700 text-blue-700 hover:-m-[1px] hover:border-2 hover:border-blue-800 hover:font-medium hover:text-blue-800"
                }`}
              >
                {selectedOption}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRandomStyle() {
  const getRandomNumber = (length: number) =>
    Math.floor(Math.random() * length);

  return {
    background: style.background[getRandomNumber(style.background.length)],
    ears: style.ears[getRandomNumber(style.ears.length)],
    leg: style.leg[getRandomNumber(style.leg.length)],
    neck: style.neck[getRandomNumber(style.neck.length)],
    accessories: style.accessories[getRandomNumber(style.accessories.length)],
    hair: style.hair[getRandomNumber(style.hair.length)],
    eyes: style.eyes[getRandomNumber(style.eyes.length)],
    mouth: style.mouth[getRandomNumber(style.mouth.length)],
  };
}
