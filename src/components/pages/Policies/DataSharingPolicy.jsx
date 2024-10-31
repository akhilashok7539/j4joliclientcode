import { ListItem, UnorderedList } from '@chakra-ui/react';

const DataSharingPolicy = () => {
  return (
    <div>
      <div className="policy-section">
        <h3 className="policy-sub-heading">How We Share and Disclose Your Information</h3>
        <p className="policy-para">
          Your personal information may be shared or disclosed, but not limited, under the following
          entities/circumstances/purposes:
        </p>
        <UnorderedList className="policy-list">
          <ListItem className="policy-list-item">
            To affiliated and unaffiliated service providers for the sole purpose of enabling them
            to provide services to us in connection with providing our Services to you;
          </ListItem>
          <ListItem className="policy-list-item">
            Based on a good faith belief that such disclosure is necessary to investigate, prevent,
            or take action regarding illegal activities, suspected fraud, situations involving
            potential threats to the safety of any person, violation of our Policy, as evidence in
            litigation in which we are involved, or to otherwise protect the rights or safety of any
            person or entity;
          </ListItem>
          <ListItem className="policy-list-item">
            Based on a good-faith belief that disclosure is necessary to respond to judicial
            process, valid government inquiry, or is otherwise required by law;
          </ListItem>
          <ListItem className="policy-list-item">
            If we are acquired by or merged with another entity, if all or part of our assets are
            acquired, or in response to a bankruptcy proceeding, we may transfer your information to
            the acquiring entity;
          </ListItem>
          <ListItem className="policy-list-item">
            When posted by you or an authorized third-party, to our wikis, forums, blogs, message
            boards, chat rooms and other social networking environments or Sites;
          </ListItem>
          <ListItem className="policy-list-item">
            We also may share aggregate or non-personally identifiable data about users with third
            parties for marketing, advertising, research, analytics or similar purposes; and
          </ListItem>
          <ListItem className="policy-list-item">
            To other third parties for purposes you have allowed or consented to.
          </ListItem>
        </UnorderedList>
      </div>
      <div className="policy-section">
        <h3 className="policy-sub-heading"> Security</h3>
        <p className="policy-para">
          We value your trust in providing us your Personal Information, thus we are striving to use
          commercially acceptable means of protecting it. But remember that no method of
          transmission over the internet, or method of electronic storage is 100% secure and
          reliable, and we cannot guarantee its absolute security.
        </p>
      </div>
    </div>
  );
};

export default DataSharingPolicy;
