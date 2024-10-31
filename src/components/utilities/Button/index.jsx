
import { Button as ChakraButton } from '@chakra-ui/react';

const Button = ({ children, ...props }) => (
  <ChakraButton
    mt="1rem"
    colorScheme="primaryColor"
    variant="solid"
    fontWeight="bold"
    pt=".7rem"
    pb=".7rem"
    pl="2rem"
    pr="2rem"
    borderRadius="7px"
    height="auto"
    {...props}
  >
    {children}
  </ChakraButton>
);

export default Button;
