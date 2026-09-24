import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import MenuHighlights from "@/components/MenuHighlights";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Cursor />
      <Loader />
      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Gallery />
          <MenuHighlights />
          <Events />
          <Testimonials />
          <InstagramFeed />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
