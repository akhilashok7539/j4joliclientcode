/*
React component  Text Input
*/
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
const TextInput = ({
  idName,
  isRequired,
  isInvalid,
  LabelName,
  onChange,
  name,
  placeholder,
  value,
  onBlur,
  errorMsg,
  mt,
  mr,
  ml,
  mb,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <Input
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
        />
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default TextInput;
