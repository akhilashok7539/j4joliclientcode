import React, { useEffect, useState } from 'react';
import TextInput from '../../utilities/TextInput';
import TagInput from '../../utilities/TagInput';
import { useToast } from '@chakra-ui/react';
import Button from '../../utilities/Button';
import { validateString } from '../../../helpers/validate';
import api from '../../../helpers/axios';
import { showErrorToast } from '../../../helpers/errorToast';
import './UpdateJobCategory.css';
import { useHistory } from 'react-router-dom';

function UpdateJobCategory() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedIDAdd, setSelectedIdsAdd] = useState('');
  const [selectedIDRemove, setSelectedIdsRemove] = useState('');
  const [subCategoriesSelectedList, setsubCategoriesSelectedList] = useState('');
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

  const [action, setAction] = useState('add'); // Default selection

  const history = useHistory();
  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSelectedIdsAdd((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectionRemove = (id) => {
    setSelectedIdsRemove((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  };


  // Chakra ui toast
  const toast = useToast();

  const handleCategoryUpdate = async (e) => {
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
      console.log(selectedIDAdd)
      console.log(selectedIDRemove)

      const apiEndpoint = '/job-category/' + categoryId
      await api.patch(apiEndpoint, {
        name: category,
        action: action,
        subCategoryIds: action === 'add' ? selectedIDAdd :selectedIDRemove,
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
      history.push(`/admin/dashboard/view-job-category`)
    } catch (err) {
      showErrorToast(toast, err);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCategoryError('');
  };

  const handleChange = (event) => {
    setAction(event.target.value);

  };
  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
  };
  useEffect(() => {
    getJobSubCatogories()
  }, []);
  useEffect(() => {
    // Only runs once when the component mounts
    const list = JSON.parse(sessionStorage.getItem("JobCategory"));
    setCategory(list.name)
    setCategoryId(list.id)
    setsubCategoriesSelectedList(list.subCategories)
    if (list && list.subCategories) {
      const selectedItemsList = list.subCategories.map((x) => x._id);
      setSelectedIds(selectedItemsList);

    }
  }, []); // Empty dependency array


  const getJobSubCatogories = () => {
    api.get('/job-sub-category?include_hidden=true').then((res) => {
      setSubCategory(res.data)
    }).catch((err) => {
      showErrorToast(toast, err);
    });
  }
  const alreadySelected = (name) => {
    toast({
      title: 'Already Selected',
      description: `Already Selected ${name},Please choose action as remove `,
      status: 'success',
      duration: 2000,
      isClosable: true,
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


      <div className='actionContainers'>
        <h2 className='label'>Select Action</h2>
        <div className='radio-buttonContainers'>
          <label>
            <input
              type="radio"
              value="add"
              checked={action === 'add'}
              onChange={handleChange}
            />
            Add
          </label>
          <label>
            <input
              type="radio"
              value="remove"
              checked={action === 'remove'}
              onChange={handleChange}
            />
            Remove
          </label>
        </div>


      </div>
      <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
        <label htmlFor="">Choose Sub category</label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '10px',
          marginTop: '10px'
        }}>
          {action === 'add' && (
            subCategory.map((option) => (
              <div
                key={option._id}
                onClick={() =>  toggleSelection(option._id)}
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
            ))
          )}


          {action === 'remove' && (
            subCategoriesSelectedList.length > 0 ? (
              subCategoriesSelectedList.map((option) => (
                <div
                  key={option._id}
                  onClick={() => toggleSelectionRemove(option._id)}
                  style={{
                    padding: '13px',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    textAlign: 'center',
                    backgroundColor: selectedIDRemove.includes(option._id) ? '#e9e9e9' : '#cce5ff'
                  }}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <> </>
            )
          )}


        </div>


      </div>


      <Button onClick={handleCategoryUpdate}>Update</Button>
    </div>
  );
}
export default UpdateJobCategory;