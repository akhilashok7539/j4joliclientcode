/*
React Component for CheckBox
*/
import { FormControl, Checkbox } from '@chakra-ui/react';
const CheckBoxInput = ({
  idName,
  name,
  isRequired,
  isChecked,
  isInvalid,
  text,
  onChange,
  mt,
  mr,
  ml,
  mb,
}) => {
  return (
    <>
      <FormControl id={idName} isRequired={isRequired}>
        <Checkbox
          name={name}
          isInvalid={isInvalid}
          mt={mt}
          mb={mb}
          ml={ml}
          mr={mr}
          isChecked={isChecked}
          onChange={onChange}
        >
          {text}
        </Checkbox>
      </FormControl>
    </>
  );
};
export default CheckBoxInput;
