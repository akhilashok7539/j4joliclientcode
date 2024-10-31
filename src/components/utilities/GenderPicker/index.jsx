import {
  Radio,
  RadioGroup,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';

const GenderPicker = ({
  idName,
  isRequired,
  isInvalid,
  mt,
  mb,
  ml,
  mr,
  LabelName,
  onChange,
  onClick,
  value,
  name,
  direction,
  errorMsg,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired} isInvalid={isInvalid}>
        <FormLabel fontSize=".8rem" mt={mt} mb={mb} ml={ml} mr={mr}>
          {LabelName}
        </FormLabel>

        <RadioGroup onChange={onChange} value={value} name={name} onClick={onClick}>
          <Stack direction={direction}>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{errorMsg}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default GenderPicker;
