/*
React Component for Password Input
*/
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';
const PasswordInput = ({
  idName,
  isRequired,
  isInvalid,
  LabelName,
  placeholder,
  value,
  name,
  onChange,
  errorMsg,
  onBlur,
  validate,
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
        <Input
          type="password"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onChangeCapture={validate}
          onBlur={onBlur}
        />
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default PasswordInput;
