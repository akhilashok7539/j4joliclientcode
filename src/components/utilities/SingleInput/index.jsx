import React, { useState } from 'react';
import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

function SingleInput({ name = 'Tag', onSubmit }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleInputSubmit = () => {
    if (value !== '') {
      try {
        onSubmit(value);
      } catch (err) {}
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      handleInputSubmit();
    }
  };

  const handleOnChange = (e) => {
    setError('');
    const newValue = e.target.value;
    if (newValue[newValue.length - 1] !== ',') {
      setValue(e.target.value);
    }
  };

  return (
    <>
      <InputGroup>
        <Input
          isInvalid={error !== ''}
          placeholder={`Add a ${name} and press Enter`}
          value={value}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement>
          <IconButton
            onClick={handleInputSubmit}
            colorScheme="purple"
            aria-label="Search database"
            icon={<SmallAddIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </>
  );
}

export default SingleInput;
