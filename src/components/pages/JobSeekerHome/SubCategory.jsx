import React, { useState, useEffect } from 'react';
import './subCategory.css';
import api from '../../../helpers/axios';
import { Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import SubCategoryList from './SubCategoryList';

const SubCategory = () => {
  //state to store list job categories
  const [jobCategories, setJobCategories] = useState([]);
  //chakra ui toast
  const toast = useToast();
  useEffect(() => {
    api
      .get('/job-category?sub_category=true')
      .then((res) => {
        let jobCategoryArray = [];
        for (let i = 0; i < res.data.job_categories.length; i++) {
          jobCategoryArray.push(res.data.job_categories[i]);
        }
        console.log(res)
        setJobCategories([...jobCategoryArray]);
      })
      /* eslint-disable */
      .catch((err) => {
        toast({
          title: 'Failed to Process order',
          description: err.response.data.error.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  }, []);
  /* eslint-enable */
  console.log("jobCategories",jobCategories)
  return (
    <div className=" sub-category-wrapper" id="sub-category">
      <Table variant="striped" colorScheme="purple" className="sub-category-table">
        <Thead>
          <Tr>
            <Th>Category name</Th>
            <Th>Sub categories</Th>
          </Tr>
        </Thead>
        <Tbody>
          {jobCategories.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>
                  <SubCategoryList subCategory={item.subCategories} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
};

export default SubCategory;
