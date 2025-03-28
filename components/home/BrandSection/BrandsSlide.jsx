import bfgoodrich from "./assets/bfgoodrich.png";
import bridgestone from "./assets/bridgestone.png";
import kenda from "./assets/kenda.png";
import michellin from "./assets/michellin.png";
import nokian from "./assets/nokian.png";
import pirelli from "./assets/pirelli.png";
import prinx from "./assets/prinx.png";
import toyo from "./assets/toyo.png";
import uniroyal from "./assets/uniroyal.png";
import yokohama from "./assets/yokohama.png";

import "./animation.css";

const brands = [
  { name: "BF Goodrich", src: bfgoodrich },
  { name: "Bridgestone", src: bridgestone },
  { name: "Kenda", src: kenda },
  { name: "Michellin", src: michellin },
  { name: "Nokian Tyres", src: nokian },
  { name: "Pirelli", src: pirelli },
  { name: "Prinx", src: prinx },
  { name: "Toyo", src: toyo },
  { name: "Uniroyal", src: uniroyal },
  { name: "Yokohama", src: yokohama },
];

export function ImageSlider() {
  return (
    <article className="slider py-8">
      <ul className="slide-track flex items-center">
        {brands.map(({ src, name }) => (
          <li
            key={`track 1 - ${name}`}
            className="bg-white rounded-lg shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)] py-6 mx-4 slide md:mx-2 grid place-items-center"
          >
            <img
              src={src.src}
              alt={`image for ${name}`}
              className="w-[110px] md:w-full"
            />
          </li>
        ))}
        {brands.map(({ src, name }) => (
          <li
            key={`track 2 - ${name}`}
            className="slide bg-white rounded-lg shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)] py-6 mx-4 md:mx-2 grid place-items-center"
          >
            <img
              src={src.src}
              alt={`image for ${name}`}
              className="w-[110px] md:w-full"
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
