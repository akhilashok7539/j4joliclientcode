import { Badge } from '@chakra-ui/react';

const JobBadge = ({ flags }) => {
  if (flags?.fromConsultancy === true) {
    return <Badge colorScheme="green">CONSULTANCY</Badge>;
  } else {
    return <Badge colorScheme="purple">J4JOLI PREMIUM</Badge>;
  }
};

export default JobBadge;
