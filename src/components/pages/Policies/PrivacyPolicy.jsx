import DataSharingPolicy from './DataSharingPolicy';
import { ListItem, UnorderedList } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <div id="privacy-policy">
      <h2 className="policy-heading">Privacy Policy</h2>
      <div className="policy-section">
        <h3 className="policy-sub-heading">Types of Data collected</h3>
        <p className="policy-para">
          Among the types of Personal Data that App collects, by itself or through third parties,
          there are: Contacts permission; Camera permission; Microphone permission; Social media
          accounts permission; Approximate location permission (continuous); Cookies; Usage Data;
          email address; password; unique device identifiers for advertising (Google Advertiser ID
          or IDFA, for example). Complete details on each type of Personal Data collected are
          provided in the dedicated sections of this privacy policy or by specific explanation texts
          displayed prior to the Data collection. Personal Data may be freely provided by the User,
          or, in case of Usage Data, collected automatically when using this Application. Unless
          specified otherwise, all Data requested by this Application is mandatory and failure to
          provide this Data may make it impossible for this Application to provide its services. In
          cases where this Application specifically states that some Data is not mandatory, Users
          are free not to communicate this Data without consequences to the availability or the
          functioning of the Service. Users who are uncertain about which Personal Data is mandatory
          are welcome to contact the Owner. Any use of Cookies – or of other tracking tools – by
          this Application or by the owners of third-party services used by this Application serves
          the purpose of providing the Service required by the User, in addition to any other
          purposes described in the present document and in the Cookie Policy, if available. Users
          are responsible for any third-party Personal Data obtained, published or shared through
          this Application and confirm that they have the third party's consent to provide the Data
          to the Owner.
        </p>
      </div>
      <div className="policy-section">
        <h3 className="policy-sub-heading">How we collect information?</h3>
        <UnorderedList>
          <ListItem className="policy-list-item">
            Directly from you through registration process.
          </ListItem>
          <ListItem className="policy-list-item">
            Information collected through users data.
          </ListItem>
        </UnorderedList>
      </div>
      <div className="policy-section">
        <h3 className="policy-sub-heading">How we use this information?</h3>
        <p className="policy-para">
          We use information we collect to conduct our business and improve our app and services,
          develop new products and services, provide information and support, to better understand
          your needs and interests, personalize communications and advertising, and generally
          promote a quality experience for you. For example, we may use your information, including
          your personal information, to:
        </p>
        <UnorderedList>
          <ListItem className="policy-list-item">
            Communicate, interact and build our relationship with you;
          </ListItem>
          <ListItem className="policy-list-item">
            Customize the content, products and services that are offered to you;
          </ListItem>
          <ListItem className="policy-list-item">
            Contact you with information about App and affiliated third-parties;
          </ListItem>
          <ListItem className="policy-list-item">
            Process, fulfill and follow up on transactions and requests for products, services,
            support, and information;
          </ListItem>
          <ListItem className="policy-list-item">
            Verify your authority to enter and use our Services;
          </ListItem>
          <ListItem className="policy-list-item">Engage in market research and analysis;</ListItem>
          <ListItem className="policy-list-item">
            Measure, analyze and improve our products and services, the effectiveness of our
            websites, and our advertising and marketing;
          </ListItem>
          <ListItem className="policy-list-item">Consider your employment application;</ListItem>
          <ListItem className="policy-list-item">Comply with legal requirements;</ListItem>
          <ListItem className="policy-list-item">Provide targeting advertising;</ListItem>
          <ListItem className="policy-list-item">
            Send you marketing materials, for example, via email, including our newsletter, and to
            notify you about products and services that we believe would be of interest to you; or
          </ListItem>
          <ListItem className="policy-list-item">
            Deter, detect, and prevent fraud and other prohibited or illegal activities.
          </ListItem>
          <ListItem className="policy-list-item">
            We may link information we collect from multiple sources to provide better service to
            you and to improve our products and services.
          </ListItem>
        </UnorderedList>
      </div>
      <DataSharingPolicy />
    </div>
  );
};

export default PrivacyPolicy;
