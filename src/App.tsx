// App.tsx
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { GALLERY_ITEMS, HONORS, ICONS, NAV_LINKS, MATCHDAY_IMAGES } from './constants';

// --- Type Definitions ---
interface GalleryImage {
  src: string;
  caption: string;
  position?: string;
}

// --- Custom Hooks ---
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = sectionIds.map(id => document.getElementById(id)).filter(el => el);
      const currentSection = sections.find(el => el && el.offsetTop <= scrollPosition && el.offsetTop + el.offsetHeight > scrollPosition);
      if (currentSection) setActiveSection(currentSection.id);
      else if (window.scrollY < window.innerHeight / 2) {
        // Default to history when at the top
        setActiveSection('history');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);
  return activeSection;
};

// --- Reusable Animated Components ---
const AnimatedSection: React.FC<{ children: ReactNode; className?: string; id?: string; threshold?: number }> = ({ children, className = '', id, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { root: null, rootMargin: '0px', threshold });
    if (ref.current) observer.observe(ref.current);
    return () => { ref.current && observer.unobserve(ref.current); };
  }, []);
  return (
    <section ref={ref} id={id} className={`transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}>
      {isVisible && children}
    </section>
  );
};

// --- Section-specific Components ---
const Header: React.FC<{ isScrolled: boolean; activeSection: string }> = ({ isScrolled, activeSection }) => (
  <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/90 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
    <div className="container mx-auto px-4 flex justify-between items-center">
      <a href="#" className={`transition-all duration-300 hover:scale-110 hover:rotate-6 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>{ICONS.crbLogo}</a>
      <nav className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.substring(1);
            let linkClasses = 'relative text-lg font-semibold transition-all duration-300 uppercase tracking-wide group transform-gpu ';

            if (isScrolled) {
                 linkClasses += isActive ? 'text-crb-red' : 'text-crb-dark';
            } else {
                 linkClasses += isActive ? 'text-white scale-105' : 'text-white/80';
            }

            return (
              <a key={link.name} href={link.href} className={linkClasses}>
                <span className="transition-transform duration-300 group-hover:scale-105 group-hover:brightness-125 block">{link.name}</span>
              </a>
            );
        })}
      </nav>
    </div>
  </header>
);

const HeroSection: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center p-4 relative overflow-hidden bg-crb-dark">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('1.jpg')" }}></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Curtain Reveal */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-crb-red z-20" style={{ animation: 'curtain-reveal-left 2s forwards cubic-bezier(0.86, 0, 0.07, 1)' }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-crb-red z-20" style={{ animation: 'curtain-reveal-right 2s forwards cubic-bezier(0.86, 0, 0.07, 1)' }}></div>
      
      <div className="relative z-10 flex flex-col items-center opacity-0" style={{animation: 'reveal-up 1.5s ease-out 1s forwards'}}>
        <div className="relative w-28 h-28 md:w-36 md:h-36 mb-6">
          {ICONS.crbLogo}
        </div>
        <h1 className="font-display font-bold text-white tracking-wider uppercase leading-none drop-shadow-lg text-6xl md:text-8xl lg:text-9xl">
            <span>Chabab Riadhi</span><br/>
            <span>Belouizdad</span>
        </h1>
        <p className="text-base md:text-xl mt-6 text-white/90 tracking-[0.3em] uppercase">Forged in Freedom. Crowned in Glory.</p>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ item: typeof GALLERY_ITEMS[0]; index: number; }> = ({ item, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => { ref.current && observer.unobserve(ref.current); };
    }, []);
    
    const isEven = index % 2 === 0;

    const textContent = (
        <div className="relative p-6 bg-white rounded-lg shadow-xl border-t-4 border-crb-red text-left">
            <p className="font-display text-crb-red text-2xl font-bold">{item.year}</p>
            <h3 className="font-display text-4xl lg:text-5xl font-bold mt-2 text-crb-dark">{item.title}</h3>
            <p className="mt-4 text-crb-grey text-lg">{item.description}</p>
        </div>
    );

    const imageContent = (
         <div className="group rounded-lg">
            <img src={item.imageSrc} alt={item.title} className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"/>
        </div>
    );

    return (
        <div ref={ref} className="w-full my-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-center px-4">
            <div className={`transition-all duration-700 ease-out ${isEven ? 'md:col-start-3' : 'md:col-start-1'} md:row-start-1 ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? 'translate-x-10' : '-translate-x-10'}`}`}>
               {textContent}
            </div>

            <div className="hidden md:block md:col-start-2 md:row-start-1 justify-self-center">
                <div className="bg-crb-red rounded-full w-6 h-6 z-10 border-4 border-crb-light-grey shadow-md"></div>
            </div>
            
            <div className={`mt-8 md:mt-0 transition-all duration-700 ease-out ${isEven ? 'md:col-start-1' : 'md:col-start-3'} md:row-start-1 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                {imageContent}
            </div>
        </div>
    );
};

const HistorySection: React.FC = () => (
    <AnimatedSection id="history" className="py-20 md:py-32 bg-crb-light-grey text-crb-dark overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="text-center mb-20 md:mb-32">
                <h2 className="font-display text-6xl md:text-8xl font-bold leading-tight">The Red Thread of <span className="underline-header text-crb-red">History</span></h2>
                <p className="text-xl text-crb-grey mt-2">A Legacy Forged in Every Era</p>
            </div>
            <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-crb-red/20 -translate-x-1/2 rounded-full hidden md:block"></div>
                <div className="relative flex flex-col">
                    {GALLERY_ITEMS.map((item, index) => (
                       <TimelineItem key={item.year} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const collageStyles = [
  { top: '5%', left: '10%', transform: 'rotate(-8deg)', width: '30%', zIndex: 1 },
  { top: '15%', left: '55%', transform: 'rotate(5deg)', width: '35%', zIndex: 2 },
  { top: '40%', left: '2%', transform: 'rotate(4deg)', width: '38%', zIndex: 3 },
  { top: '50%', left: '45%', transform: 'rotate(-5deg)', width: '28%', zIndex: 4 },
  { top: '35%', left: '75%', transform: 'rotate(8deg)', width: '25%', zIndex: 1 },
  { top: '65%', left: '25%', transform: 'rotate(-3deg)', width: '33%', zIndex: 2 },
];
const MatchdayMomentsSection: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    return (
        <AnimatedSection id="moments" className="py-20 md:py-32 bg-crb-light-grey overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="font-display text-6xl md:text-8xl font-bold leading-tight text-crb-dark">Matchday <span className="underline-header text-crb-red">Moments</span></h2>
                    <p className="text-xl text-crb-grey mt-2">A cinematic reel of passion, fight, and glory.</p>
                </div>
                <div className="relative w-full h-[50vh] md:h-[80vh] mt-16 group">
                    {MATCHDAY_IMAGES.map((img, index) => (
                        <div
                            key={index}
                            className="absolute transition-all duration-500 ease-in-out group-hover:scale-95 hover:!scale-110 hover:!z-20 shadow-2xl rounded-lg cursor-pointer aspect-video"
                            style={collageStyles[index]}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img src={img.src} alt={img.caption} className="w-full h-full object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                               <p className="text-white text-lg font-bold text-center font-display tracking-wider uppercase drop-shadow-lg opacity-0 translate-y-4 hover:opacity-100 hover:translate-y-0 transition-all duration-300 delay-100">{img.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={selectedImage.src} alt={selectedImage.caption} />
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>&times;</button>
                        <div className="lightbox-caption">{selectedImage.caption}</div>
                    </div>
                </div>
            )}
        </AnimatedSection>
    );
};

const StatCard: React.FC<{ title: string; value: string; isFeatured?: boolean; }> = ({ title, value, isFeatured }) => (
    <div className={`relative p-8 bg-black/80 backdrop-blur-md rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-white/10 ${isFeatured ? 'md:scale-110' : ''}`}>
        <h3 className="text-xl font-bold text-gray-300 uppercase tracking-wider">{title}</h3>
        <p className={`font-display font-bold text-white mt-2 ${isFeatured ? 'text-7xl' : 'text-6xl'}`}>{value}</p>
    </div>
);
const StadiumSection: React.FC = () => (
    <AnimatedSection id="stadium" className="py-20 md:py-32 bg-crb-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('12.jpg')", filter: 'grayscale(50%) brightness(0.4)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-crb-dark via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-display text-6xl md:text-8xl font-bold leading-tight text-white">Stade du <span className="text-crb-red">20 Août 1955</span></h2>
            <p className="text-2xl text-gray-300 mt-2">Our Fortress. Our Home.</p>
            <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard title="Capacity" value="20,000" />
                <StatCard title="Location" value="Algiers" isFeatured />
                <StatCard title="Constructed" value="1930" />
            </div>
        </div>
    </AnimatedSection>
);

const HonorsSection: React.FC = () => (
    <AnimatedSection id="honors" className="py-20 md:py-32 bg-crb-white text-crb-dark">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-6xl md:text-8xl font-bold leading-tight">Gallery of <span className="underline-header text-crb-red">Silver</span></h2>
            <p className="text-xl text-crb-grey mt-2">A Legacy of Victory</p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {HONORS.map(honor => (
                    <div key={honor.title} className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-b-4 border-transparent hover:border-crb-red">
                        <div className="text-crb-grey transition-colors duration-300 group-hover:text-crb-red">{ICONS.trophy}</div>
                        <p className="font-display text-8xl font-bold mt-4">{honor.count}</p>
                        <h3 className="text-2xl font-semibold text-crb-grey mt-2 tracking-wider uppercase">{honor.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </AnimatedSection>
);

const IdentitySection: React.FC = () => (
    <AnimatedSection className="py-20 md:py-32 bg-crb-white text-crb-dark overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative">
            <div className="relative flex items-center justify-center h-80 md:h-full">
                 <span className="absolute font-display font-black text-[25rem] text-gray-100 opacity-80 leading-none select-none">62</span>
                 <div className="relative w-64 h-64 md:w-80 md:h-80 z-10 transition-transform duration-500 hover:scale-110 hover:rotate-[-5deg]">{ICONS.crbLogo}</div>
            </div>
             <div className="text-left">
                <h2 className="font-display text-6xl md:text-8xl font-bold leading-tight"><span className="underline-header text-crb-red">The Spirit</span> of Belouizdad</h2>
                <div className="w-24 h-1.5 bg-crb-red mt-4 mb-8"></div>
                <div className="text-lg text-crb-grey space-y-6 max-w-2xl text-justify">
                    <p>Founded in 1962, in the wake of Algeria's independence, CR Belouizdad is more than a football club; it is a symbol of resilience, pride, and national identity.</p>
                    <p>The red and white are not just colors; they are the blood and soul of our supporters. We play with the heart of a nation, for the glory of our city, carrying a legacy that began in freedom and strives for greatness.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const Footer: React.FC = () => (
    <footer className="bg-crb-light-grey text-crb-dark py-12 border-t border-black/10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
                <div className="w-20 h-20 mb-4">{ICONS.crbLogo}</div>
                <p className="text-sm text-crb-grey max-w-xs">Chabab Riadhi Belouizdad © 2025. A Digital Fortress of Glory.</p>
            </div>
            <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Explore</h3>
                <ul className="mt-4 space-y-2">
                    {NAV_LINKS.map(link => (
                        <li key={link.name}><a href={link.href} className="text-crb-grey hover:text-crb-red transition-colors">{link.name}</a></li>
                    ))}
                </ul>
            </div>
             <div className="flex flex-col items-center md:items-start">
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider">Follow Us</h3>
                <div className="flex space-x-6 text-crb-grey mt-4">
                    <a href="#" aria-label="Facebook" className="hover:text-crb-red transition-colors duration-300 transform hover:scale-110">{ICONS.facebook}</a>
                    <a href="#" aria-label="Instagram" className="hover:text-crb-red transition-colors duration-300 transform hover:scale-110">{ICONS.instagram}</a>
                </div>
            </div>
        </div>
    </footer>
);

// --- Main App Component ---
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = NAV_LINKS.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-crb-white" style={{ animation: 'fadeIn 1s ease-out' }}>
      <Header isScrolled={isScrolled} activeSection={activeSection} />
      <main>
        <HeroSection />
        <HistorySection />
        <MatchdayMomentsSection />
        <HonorsSection />
        <StadiumSection />
        <IdentitySection />
      </main>
      <Footer />
    </div>
  );
}

export default App;