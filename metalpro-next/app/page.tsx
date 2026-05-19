import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";

// Динамические импорты для секций ниже сгиба (загружаются после гидратации)
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Advantages = dynamic(() => import('@/components/Advantages'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Services />
      <Advantages />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
}
