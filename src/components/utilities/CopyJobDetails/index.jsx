import './style.css';
import { FiCopy } from 'react-icons/fi';
import Button from '../Button';
import { useToast, ButtonGroup } from '@chakra-ui/react';

const CopyJobDetails = ({ job }) => {
  const toast = useToast();

  const districtAndContactNo = [
    { district: 'Thiruvananthapuram', number: '04846162222, 8157840476 ' },
    { district: 'Kollam', number: '04846162222, 8157840476 ' },
    { district: 'Pathanamthitta', number: '04846162222, 8157840476 ' },
    { district: 'Alappuzha', number: '04846162222, 8157840476 ' },
    { district: 'Kottayam', number: '04846162222, 8157840476 ' },
    { district: 'Idukki', number: '04846162222, 8157840476 ' },
    { district: 'Ernakulam', number: '04846162222, 8157840476 ' },
    { district: 'Thrissur', number: '04846162222, 8157840476 ' },
    { district: 'Palakkad', number: '04846162222, 8157840476 ' },
    { district: 'Malappuram', number: '04846162222, 8157840476 ' },
    { district: 'Kozhikode', number: '04846162222, 8157840476 ' },
    { district: 'Wayanad', number: '04846162222, 8157840476 ' },
    { district: 'Kannur', number: '04846162222, 8157840476 ' },
    { district: 'Kasaragod', number: '04846162222, 8157840476 ' },
  ];

  const contactNo = districtAndContactNo.find((el) => el.district === job.district).number;

  const copyToClipboard = async (exportFull) => {
    try {
      let data =
        'Job Number:' +
        job.job_no +
        ' (The job will be expired in three days)' +
        '\nDesignation: ' +
        job.title +
        '\nJob Category : ' +
        job.job_category +
        '\nDistrict : ' +
        job.district +
        '\nLocation :' +
        job.location +
        '\nDescription : ' +
        job.description +
        '\nSalary : ' +
        job.salary +
        '\nWorking time : ' +
        job.working_time +
        '\nExperience Details : ' +
        job.experience_required +
        '\nNumber of Vacancies : ' +
        job.number_of_vacancies +
        (exportFull
          ? '\nCompany Details: ' +
            job.company_address.name +
            ', ' +
            job.company_address.city +
            ', ' +
            job.company_address.state +
            ', ' +
            job.company_address.zip +
            (job.preferred_contact_medium.byCall
              ? '\nContact No.: ' + job.contact_person.mobile_number
              : '') +
            (job.preferred_contact_medium.byWhatsapp
              ? '\nWhatsapp No.: ' + job.contact_person.whatsapp_number
              : '') +
            (job.preferred_contact_medium.byEmail ? '\nEmail: ' + job.contact_person.email_id : '')
          : '') +
        '\nPreferred Gender: ' +
        (job?.preferred_gender?.male ? 'Male, ' : '') +
        (job?.preferred_gender?.female ? 'Female, ' : '') +
        (job?.preferred_gender?.others ? 'Others' : '') +
        '\n\nJob Posted On: ' +
        new Date(job.approved_on).toLocaleDateString() +
        '\nPlacement Available: ' +
        (job?.flags?.placement ? 'Yes' : 'Not Applicable') +
        '\n\n' +
        (exportFull
          ? 'For job vacancies, subscribe www.j4joli.com'
          : 'To Apply this job, Please call [ Please note job number ]\n' +
            '\nContact No.: ' +
            contactNo +
            '\n\nFor complete details of vacancy subscribe www.j4joli.com') +
        '\nJob portal Division, Customer care : 04846162222, 8157840476\nPlacement Division : 04846162209, 8157840476\nAddress : City Tower, Bank Junction, Aluva, Ernakulam\nGSTN : 32AAXFM4883G1ZR';

      await navigator.clipboard.writeText(data);
      toast({
        title: 'Success',
        description: 'Job Details copied to Clipboard',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed',
        description: 'Could not copy details to clipboard',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const copyBg = async () => {
    try {
      let data =
        '\nDesignation: ' +
        job.title +
        '\nJob Category : ' +
        job.job_category +
        '\nDistrict : ' +
        job.district +
        '\nLocation :' +
        job.location +
        '\nDescription : ' +
        job.description +
        '\nSalary : ' +
        job.salary +
        '\nWorking time : ' +
        job.working_time +
        '\nExperience Details : ' +
        job.experience_required +
        '\nNumber of Vacancies : ' +
        job.number_of_vacancies +
        '\nPreferred Gender: ' +
        (job?.preferred_gender?.male ? 'Male, ' : '') +
        (job?.preferred_gender?.female ? 'Female, ' : '') +
        (job?.preferred_gender?.others ? 'Others' : '') +
        '\nPlacement Available: ' +
        (job?.flags?.placement ? 'Yes' : 'Not Applicable') +
        '\n\nContact: \nPlacement Division : 7034205888 , 9061204732 ,  8157840476 \n\nAddress : City Tower, Bank Junction, Aluva, Ernakulam \nGSTN : 32AAXFM4883G1ZR';

      await navigator.clipboard.writeText(data);
      toast({
        title: 'Success',
        description: 'Job Details copied to Clipboard',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed',
        description: 'Could not copy details to clipboard',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ButtonGroup isAttached className="copy-job-btns">
        <Button
          mb={4}
          onClick={() => {
            copyToClipboard(false);
          }}
          size="sm"
          variant="outline"
        >
          <FiCopy className="icon" /> W & T
        </Button>
        {job?.flags?.placement ? (
          <Button
            mb={4}
            onClick={() => {
              copyToClipboard(true);
            }}
            size="sm"
          >
            <FiCopy className="icon" />
            Full Details
          </Button>
        ) : null}
        <Button mb={4} onClick={copyBg} size="sm" variant="outline">
          <FiCopy className="icon" /> BG
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CopyJobDetails;
