import React, { useState } from 'react';
import { FormControl, FormLabel, Select, FormErrorMessage } from '@chakra-ui/react';

function CustomSelect({ 
    idName, 
    isRequired, 
    isInvalid, 
    LabelName, 
    mt, 
    mb, 
    ml, 
    mr, 
    needPlaceholder, 
    dataList, 
    errorMsg 
}) {
    const [selectedValue, setSelectedValue] = useState(''); // State for selected value

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
            <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
                {LabelName}
            </FormLabel>
            <Select
                placeholder={'Select option'}
                value={selectedValue} // Bind state value here
                onChange={handleSelectChange} // Update state on change
            >
                {dataList.map((item, index) => (
                    <option key={index} value={item.value || item.name}> {/* Ensure value prop matches dataList structure */}
                        {item.name}
                    </option>
                ))}
            </Select>
            <FormErrorMessage>{errorMsg}</FormErrorMessage>
        </FormControl>
    );
}

export default CustomSelect;
