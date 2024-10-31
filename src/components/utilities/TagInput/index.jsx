import React from 'react';
import SingleInput from '../SingleInput';
import DisplayTags from './DisplayTags';
import './style.css';

function TagInput({ tagArray, onChange }) {
  const handleAddTag = (value) => {
    if (tagArray.includes(value)) {
      throw new Error('Value already exist in the list');
    }
    onChange([...tagArray, value]);
  };

  const handleRemoveTag = (value) => {
    const newTagArray = tagArray.filter((tag) => tag !== value);
    onChange(newTagArray);
  };

  return (
    <div className="tag-input-container">
      <div className="display-tag">
        <DisplayTags tagArray={tagArray} onTagRemove={handleRemoveTag} />
      </div>
      <SingleInput onSubmit={handleAddTag} name="Sub-Category" />
    </div>
  );
}

export default TagInput;
