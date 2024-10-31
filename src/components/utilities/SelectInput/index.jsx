import { Select, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const SelectInput = ({
  dataList,
  idName,
  isRequired,
  isInvalid,
  value,
  onChange,
  onBlur,
  name,
  mt,
  mb,
  ml,
  mr,
  LabelName,
  errorMsg,
  needPlaceholder = true,
}) => {

  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <Select
          placeholder={needPlaceholder && 'Select option'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        >
          {dataList.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </Select>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default SelectInput;
