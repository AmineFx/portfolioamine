import { lazy, Suspense } from "react";
import LazySection from "./components/LazySection";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/services/Services"));
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"));
const Contact = lazy(() => import("./components/contact/Contact"));

const App = () => {
  return (
    <div className="container">
      <Suspense fallback={"loading..."}>
        <LazySection height="100vh" offset="-100px">
          <section id="#home">
            <Hero />
          </section>
        </LazySection>
      </Suspense>

      <Suspense fallback={"loading..."}>
        <LazySection height="100vh" offset="-100px">
          <section id="#services">
            <Services />
          </section>
        </LazySection>
      </Suspense>

      <Suspense fallback={"loading..."}>
        <LazySection height="600vh" offset="-100px">
          <Portfolio />
        </LazySection>
      </Suspense>

      <Suspense fallback={"loading..."}>
        <LazySection height="100vh" offset="-100px">
          <section id="#contact">
            <Contact />
          </section>
        </LazySection>
      </Suspense>
    </div>
  );
};

export default App;