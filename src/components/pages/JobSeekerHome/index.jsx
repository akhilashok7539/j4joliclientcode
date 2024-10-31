import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../../helpers/axios';
import JobCategory from './JobCategory';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';
import heroImg from '../../../images/jobseeker-hero-img.svg';
import { showErrorToast } from '../../../helpers/errorToast';
import Loading from '../../utilities/Loading';
import SubCategory from './SubCategory';
import { Link, useHistory } from 'react-router-dom';
const JobSeekerHome = () => {
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

  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);
  /* eslint-enable */
  // Api call to get both job categories and job count
  const getData = async () => {
    let jobCategoriesArray = [];
    try {
      // Api call to get all job category
      const res = await api.get('/job-category/job-category-for-home?sub_category=true');
      // Api call to get all job count
      const jobCount = await api.get('/job-category/job-count');
      // Map trough all job category and push all category name and set count as 0
      res.data.job_categories.map((item) => {
        jobCategoriesArray.push({ category: item.name, count: 0, sub_category: item.sub_category });
        return ' ';
      });
      // Map through all job count and correct all count value in list
      jobCount.data.jobCount.map((item) => {
        let id = item._id;
        let count = item.count;
        for (let i = 0; i < jobCategoriesArray.length; i++) {
          if (jobCategoriesArray[i].category === id) jobCategoriesArray[i].count = count;
        }

        return ' ';
      });
      // Update state for job category
      setJobCategories([...jobCategoriesArray]);
    } catch (err) {
      setLoading(false);
      showErrorToast(toast, err);
    }
  };

  useEffect(() => {
    api
      .get('/job-category/job-count')
      .then((res) => {
        let jobCategoryArray = [];
        for (let i = 0; i < res.data.jobCount.length; i++) {
          jobCategoryArray.push({
            category: res.data.jobCount[i]._id,
            count: res.data.jobCount[i].count,
          });
        }

        setJobCategories([...jobCategoryArray]);
        setLoading(false);
      })
      /* eslint-disable */
      .catch((err) => {
        showErrorToast(toast, err);
      });
  }, []);

  const showPopup = (item) => {
    setModalCategory(item);
    setModalSubCategories(getSubCategories(item));
    onOpen();
  };

  const getSubCategories = (categoryName) => {
    const subCategories = jobCategories.filter((item) => item.category === categoryName)[0]
      .sub_category;
    return subCategories;
  };
  /* eslint-enable */
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="job-seeker-home">
      <div className="category-prompt">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You are applying in {modalCategory} category</ModalHeader>
            {modalSubCategories.length > 0 ? (
              <ModalBody>
                The following jobs will be available in this category <br />
                <OrderedList>
                  {modalSubCategories.map((item) => {
                    return <ListItem>{item}</ListItem>;
                  })}
                </OrderedList>
              </ModalBody>
            ) : null}

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Link to={`job-seeker/register/${modalCategory}`} className="continue-btn">
                Continue to Registration
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="welcome-section">
        <div className="img-container">
          <img src={heroImg} alt="Job Seeker" className="hero-img" />
        </div>
        <div className="content">
          <h3>CHOOSE A JOB YOU LIKE</h3>
          <p>Hurry and start the registration by picking the category you like.</p>
        </div>
        <div className="sub-category-list">
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
        </div>
        <div>
          <Stack spacing={3}>
            <Alert status="warning" className="note">
              <AlertIcon />
              <AlertTitle mr={2}>Note:</AlertTitle>
              <AlertDescription>
                You cannot change Job Categories after registration
              </AlertDescription>
            </Alert>
          </Stack>
        </div>
        <div className="job-category-wrapper">
          {jobCategories.map((item, index) => {
            return (
              <JobCategory
                key={index}
                CategoryName={item.category}
                count={item.count}
                callBack={showPopup}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerHome;
