import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useToast,Button } from '@chakra-ui/react';
import './style.css';
import TextInput from '../../utilities/TextInput';
import { useHistory } from 'react-router-dom';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import SubCategoryList from '../JobSeekerHome/SubCategoryList';


const ViewJobCategory = () => {

    const [jobCategories, setJobCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(jobCategories);
    const history = useHistory();
    const toast = useToast();

    // Handle input change and filter the data
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        // console.log("value",value,jobCategories)
        // Filter logic (can filter by category, sub-category or both)
        const filtered = jobCategories.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const addJobCategory = () => {
        history.push(`/admin/dashboard/add-job-category`)
    }

    useEffect(() => {
        let isMounted = true;

        getJobCategory(isMounted);

        return () => {
            isMounted = false;
        };
    }, []);
    const handleEdit = (item) =>{
        sessionStorage.setItem("JobCategory", JSON.stringify(item));
        history.push(`/admin/dashboard/update-job-category`)
    }
    const getJobCategory = async (isMounted) =>{
        try {
            const result = await api.get('/job-category?include_hidden=false&sub_category=true');

            let jobCategoryArray = [];

            for (let i = 0; i < result.data.job_categories.length; i++) {
                jobCategoryArray.push(result.data.job_categories[i]);
            }

            if (isMounted) {

                setJobCategories([...jobCategoryArray])
                setFilteredData([...jobCategoryArray])
            };
            // if(jobCategories>0) console.log(jobCategories)
        } catch (err) {
            if (isMounted) showErrorToast(toast, err);
        }
    }
    
    const handleDelete = (item) =>{
      console.log(item)
            const ENDPOINT = '/job-category/'+item.id
            api.delete(ENDPOINT).then((res) => {
                getJobCategory(true);
                toast({
                    title: 'Deleted Successfully',
                    description: 'District has been deleted successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }).catch((err) => {
                showErrorToast(toast, err);
            });
       
    }
    
    return (
        <>
            <div className="follow-up-container">
                <div className='addUserButtoncontainer'>
                      <div> </div>
                    <button className="add-user-btn" onClick={addJobCategory}>
                        Add Categories
                    </button>
                </div>

                <div className="user-warpper" id="sub-category">
                    <Table variant="striped" colorScheme="purple" className="sub-category-table">
                        <Thead>
                            <Tr>
                                <Th>Category</Th>
                                <Th>Sub-Category</Th>
                                <Th className='action-button'>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <SubCategoryList subCategory={item.subCategories} />
                                        </Td>
                                        <Td style={{textAlign:'end'}}> 
                                             <Button onClick={() => handleEdit(item)}>Edit</Button>
                                            <Button className='deletebtn' onClick={() => handleDelete(item)}>Delete</Button>
                                        </Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="4" style={{ textAlign: 'center' }}>No Category found</Td>
                                </Tr>
                            )}




                        </Tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ViewJobCategory;