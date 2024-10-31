import { Switch, FormControl, FormLabel } from '@chakra-ui/react';

const SwitchChoice = ({
  mt,
  size,
  leftChoiceText,
  rightChoiceText,
  onChange,
  value,
  name,
  isRequired
}) => {
  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel 
          mt={mt} 
          mr="1rem">
          { leftChoiceText }
        </FormLabel>
        <Switch 
          mt={mt} 
          size={size}
          onChange={onChange}
          value={value}
          name={name}
          isRequired={isRequired}
        />
        <FormLabel mt={mt} ml="1rem">
          { rightChoiceText }
        </FormLabel>
      </FormControl>
    </>
  );
};

export default SwitchChoice;
