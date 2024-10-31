/*
React Component Email Input

*/
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
const EmailInput = ({
  idName,
  isRequired,
  isInvalid,
  LabelName,
  placeholder,
  value,
  name,
  onChange,
  onBlur,
  errorMsg,
  mt,
  ml,
  mr,
  mb,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <Input
          type="email"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default EmailInput;
