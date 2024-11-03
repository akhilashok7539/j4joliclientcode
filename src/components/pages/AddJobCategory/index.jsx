import React, { useState } from 'react';
import TextInput from '../../utilities/TextInput';
import TagInput from '../../utilities/TagInput';
import { useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import { validateString } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import './style.css';
import { useEffect } from 'react';

function AddJobCategory() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [categoryError, setCategoryError] = useState('');

  const options = [
    {
      "_id": "67149b2e4602d134548824de",
      "is_hidden": false,
      "name": "Computer Jobs",
      "created_at": "2024-10-20T05:54:54.864Z",
      "__v": 0
    },
    {
      "_id": "6714a6ef4602d13454882505",
      "is_hidden": false,
      "name": "software jobs",
      "created_at": "2024-10-20T06:45:03.348Z",
      "__v": 0
    },
    {
      "_id": "6714b2614602d13454882549",
      "is_hidden": false,
      "name": "test",
      "created_at": "2024-10-20T07:33:53.118Z",
      "__v": 0
    },
    {
      "_id": "6714b2634602d1345488254b",
      "is_hidden": false,
      "name": "test4",
      "created_at": "2024-10-20T07:33:55.831Z",
      "__v": 0
    },
    {
      "_id": "6714b2664602d1345488254d",
      "is_hidden": false,
      "name": "tesgt",
      "created_at": "2024-10-20T07:33:58.377Z",
      "__v": 0
    },
    {
      "_id": "6714b2684602d1345488254f",
      "is_hidden": false,
      "name": "esrsersersr",
      "created_at": "2024-10-20T07:34:00.368Z",
      "__v": 0
    },
    {
      "_id": "6714b26a4602d13454882551",
      "is_hidden": false,
      "name": "srsersrsrser",
      "created_at": "2024-10-20T07:34:02.925Z",
      "__v": 0
    },
    {
      "_id": "6714b26c4602d13454882553",
      "is_hidden": false,
      "name": "sersersrserser",
      "created_at": "2024-10-20T07:34:04.946Z",
      "__v": 0
    }
  ];

  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Chakra ui toast
  const toast = useToast();

  const handleCategorySubmit = async (e) => {
    const { result: isCategoryValid, msg: errorMessage } = validateString(
      category,
      4,
      30,
      'Category',
      true
    );

    if (!isCategoryValid) {
      setCategoryError(errorMessage);
      return;
    }

    try {
      await api.post('/job-category', {
        name: category,
        subCategories: selectedIds,
      });
      toast({
        title: 'Added Successfully',
        description: 'New Job Category has been added successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setCategory('');
      setSubCategory([]);
      setSelectedIds([])
    } catch (err) {
      showErrorToast(toast, err);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryError('');
  };

  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
  };

  useEffect(() => {
    getJobSubCatogories()
  }, []);
  const getJobSubCatogories = () => {
    api.get('/job-sub-category?include_hidden=true').then((res) => {
      setSubCategory(res.data)
      console.log("getJobSubCatogories",res.data)
    
    }).catch((err) => {
      showErrorToast(toast, err);
    });
  }

  return (
    <div className="add-job-category">
      <TextInput
        value={category}
        LabelName="Category Name"
        onChange={handleCategoryChange}
        errorMsg={categoryError}
        isInvalid={categoryError !== ''}
      />
      {/* <TagInput tagArray={subCategory} onChange={handleSubCategoryChange} /> */}

      <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
        <label htmlFor="">Choose Sub category</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '10px',
          marginTop: '10px'
        }}>
          {subCategory?.map((option) => (
            <div
              key={option._id}
              onClick={() => toggleSelection(option._id)}
              style={{
                padding: '13px',
                cursor: 'pointer',
                borderRadius: '10px',
                textAlign: 'center',
                backgroundColor: selectedIds.includes(option._id) ? '#cce5ff' : '#e9e9e9'
              }}
            >
              {option.name}
            </div>
          ))}
        </div>

        {/* <div>
                <h3>Selected IDs:</h3>
                <pre>{JSON.stringify(selectedIds, null, 2)}</pre>
            </div> */}
      </div>


      <Button onClick={handleCategorySubmit}>Submit</Button>
    </div>
  );
}
export default AddJobCategory;
