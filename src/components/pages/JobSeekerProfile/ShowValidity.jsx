import { ListItem, UnorderedList } from '@chakra-ui/react';
import { FcCalendar, FcExpired } from 'react-icons/fc';
import { validTill } from '../../../helpers/dateDifference';
import InitiatePayment from './InitiatePayment';

const ShowValidity = ({ validity }) => {
  const validityObj = validTill(validity);

  return (
    <>
      <h3>Validity</h3>
      <div
        className={validityObj.validity ? 'valid-till' : 'valid-till in-valid'}
        id="validity-card"
      >
        <div className="heading-wrapper">
          {validityObj.validity ? <FcCalendar className="icon" /> : <FcExpired className="icon" />}
          <h4>{validityObj.heading}</h4>
        </div>
        <UnorderedList>
          <ListItem>{validityObj.para}</ListItem>
          <ListItem>You need to pay an amount &#8377; 499 (including GST)</ListItem>
          <ListItem>
            Every payment will add <strong>180 days</strong> validity to your account
          </ListItem>
        </UnorderedList>
        <InitiatePayment buttonText={validityObj.button_text} />
      </div>
    </>
  );
};

export default ShowValidity;
