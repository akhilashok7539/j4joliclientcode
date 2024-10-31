import './style.css';
import img from '../../../images/about.svg';

const About = () => {
  return (
    <div id="about" className="section about-section ">
      <img src={img} alt="About us" className="about-img" />
      <div className="about-content">
        <h3>About Us</h3>
        <div className="content">
          <p>
            With our online platform, we provide job seekers with ease of access to various job
            vacancies according to their interest across the State of Kerala. Our Customers / Job
            seekers can access our online platform through an online registration with a nominal
            registration fee of Rs.499 (including GST). The online platform is then available for
            job seekers for 180 days with an option to renew it. Our Customers / Job seekers can
            then directly contact the business organizations offering the particular job vacancies.
          </p>
          <p>
            We act as a connecting link between employers and potential employees. We work hand in
            hand with reputed firms across Kerala to create job opportunities for appropriate
            candidates for the role.
          </p>
          <p>
            J4Joli.com is a sister concern of Mass . It is started with the aim of eliminating
            unemployment and creating job opportunities. Mass Consultancies and Services specialize
            in Staff recruitment, Placements and Outsourcing with a focus on the Banking and
            Non-Banking Sectors. Mass Consultancies and Services also supply professional clerical
            support and services predominantly in the field of banking Sector since 2011.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
