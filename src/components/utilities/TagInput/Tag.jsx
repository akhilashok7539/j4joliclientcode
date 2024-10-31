import React  from 'react';
import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react';

function Tag({ value, onRemove }) {
  return (
    <ChakraTag className="tag" size="lg" borderRadius="full" variant="subtle" colorScheme="purple">
      <TagLabel>{value}</TagLabel>
      <TagCloseButton onClick={() => onRemove(value)} />
    </ChakraTag>
  );
}

export default Tag;
