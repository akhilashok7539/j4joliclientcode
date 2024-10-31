import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../../helpers/axios';
import JobCategory from './JobCategory';
import { useToast, useDisclosure } from '@chakra-ui/react';
import heroImg from '../../../images/jobseeker-hero-img.svg';
import { showErrorToast } from '../../../helpers/errorToast';
import Loading from '../../utilities/Loading';
const ExploreJobs = () => {
  // State to store list job categories
  const [jobCategories, setJobCategories] = useState([]);

  // For loading Page
  const [loading, setLoading] = useState(true);

  // For chakra ui toast
  const toast = useToast();
  /* eslint-disable */

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalCategory, setModalCategory] = useState('');
  const [modalSubCategories, setModalSubCategories] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  /* eslint-enable */
  // Api call to get both job categories and job count
  const getData = async () => {
    let jobCategoriesArray = [];
    try {
      // Api call to get all job category
      const res = await api.get('/job-category');
      res.data.job_categories.map((item) => {
        jobCategoriesArray.push({ category: item.name, count: 0, sub_category: item.sub_category });
        return ' ';
      });
      // Update state for job category
      setJobCategories([...jobCategoriesArray]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      showErrorToast(toast, err);
    }
  };

  /* eslint-enable */
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="job-seeker-home">
      <div className="welcome-section">
        <div className="img-container">
          <img src={heroImg} alt="Job Seeker" className="hero-img" />
        </div>
        <div className="content">
          <h3 style={{ textTransform: 'uppercase' }}>
            Discover Opportunities: Browse Our Job Listings
          </h3>
          <p>Browse through our categories of Jobs without Registration</p>
        </div>
        {/* <div className="sub-category-list">
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    View all Categories & Sub-categories
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <SubCategory />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div> */}
        <div className="job-category-wrapper">
          {jobCategories.map((item, index) => {
            return (
              <JobCategory
                key={index}
                CategoryName={item.category}
                count={item.count}
                exploreJobs={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreJobs;
