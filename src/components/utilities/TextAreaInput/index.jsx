/*
React Component for Text Area
*/
import { FormControl, FormLabel, FormErrorMessage, Textarea } from '@chakra-ui/react';

const TextAreaInput = ({
  idName,
  isRequired,
  LabelName,
  placeholder,
  value,
  name,
  onChange,
  onBlur,
  isInvalid,
  errorMsg,
  ml,
  mr,
  mb,
  mt,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <Textarea
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
export default TextAreaInput;
