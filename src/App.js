import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);
const sections = [
  { title: "Title 1", subtitle: "Subtitle 1" },
  { title: "Title 2", subtitle: "Subtitle 2" },
  { title: "Title 3", subtitle: "Subtitle 3" }
];
function App() {
  const [background, setBackground] = useState("#262645");
  const headerRef = useRef(null);
  const clipRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];
  const toggleBackground = () => {
    const color = background !== "#262645" ? "#5A7D95" : "#1B4943";
    setBackground(color);
  };
  useEffect(() => {
    gsap.to(headerRef.current, {
      duration: 1,
      backgroundColor: background,
      ease: "none"
    });
  }, [background]);
  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".front-page",
        start: "top",
        end: "9%",
        scrub: "true",
        pin: true,
        markers: true,
        // toggleActions: "play none none reverse",
      },
    }).fromTo(clipRef.current,
      {
        clipPath: "circle(5%)",
      },
      {
        clipPath: "circle(75%)",
        duration: 2,
      }
    );
  });

  useEffect(() => {
    gsap.from(headerRef.current, {
      duration: 2,
      autoAlpha: 0,
      ease: "none",
      delay: 1
    });
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          duration: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=100",
            toggleActions: "play none none reverse",
            markers: true
          }
        }
      );
    });
  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
    console.log(revealRefs.current);
  };
  return (
    <div className="App">
      <header ref={headerRef} className="App-header">
        <div ref={clipRef} className="front-page">
          <button onClick={() => toggleBackground()}>toggle</button>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
            voluptas explicabo, ipsum laboriosam mollitia repellat neque numquam
            tenetur facilis sint natus dicta ducimus recusandae magni fuga odit
            at aperiam voluptatem dolorum totam? Doloremque expedita quos, omnis
            similique ad beatae aliquid reprehenderit incidunt temporibus
            voluptatum iste aspernatur, odio ducimus. Error, accusantium.
          </p>
        </div>
      </header>
      <main className="App-main">
        {sections.map(({ title, subtitle }) => {
          return (
            <div key={title} className="App-section" ref={addToRefs}>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
