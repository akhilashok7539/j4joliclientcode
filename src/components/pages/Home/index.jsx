import About from './About';
import Contact from './Contact';
import HeroSection from './HeroSection';
import Blob1 from '../../../images/Blobs/blob1.svg';
import Blob2 from '../../../images/Blobs/blob2.svg';
import Blob3 from '../../../images/Blobs/blob3.svg';
import Blob4 from '../../../images/Blobs/blob4.svg';
import Blob5 from '../../../images/Blobs/blob5.svg';
import Blob6 from '../../../images/Blobs/blob6.svg';
import Blob7 from '../../../images/Blobs/blob7.svg';
import Blob8 from '../../../images/Blobs/blob8.svg';

import './style.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSection />
      <About />
      <Contact />
      <img src={Blob1} alt="blob1" className="blob blob-1" />
      <img src={Blob2} alt="blob2" className="blob blob-2" />
      <img src={Blob3} alt="blob3" className="blob blob-3" />
      <img src={Blob4} alt="blob4" className="blob blob-4" />
      <img src={Blob5} alt="blob5" className="blob blob-5" />
      <img src={Blob6} alt="blob6" className="blob blob-6" />
      <img src={Blob7} alt="blob6" className="blob blob-7" />
      <img src={Blob8} alt="blob6" className="blob blob-8" />
    </div>
  );
};

export default Home;
