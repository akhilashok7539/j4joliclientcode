/*
React component for Phone Number Input 
*/
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  Input,
} from '@chakra-ui/react';
const PhoneNumberInput = ({
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
  ml,
  mb,
  mt,
  mr,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>
        <InputGroup>
          <InputLeftAddon children="+91" />
          <Input
            type="phone"
            borderLeftRadius="0"
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            // inputmode="numeric"
            pattern="[0-9]*"
          />
        </InputGroup>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};
export default PhoneNumberInput;
