/*
React component  Number Input
*/
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

const NumInput = ({
  idName,
  isRequired,
  isInvalid,
  LabelName,
  defaultValue,
  min,
  max,
  value,
  placeholder,
  name,
  onChange,
  errorMsg,
  onBlur,
  mb,
  ml,
  mr,
  mt,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <NumberInput
          name={name}
          onBlur={onBlur}
          min={min}
          max={max}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        >
          <NumberInputField placeholder={placeholder} />
        </NumberInput>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default NumInput;
