
import { FaSignature } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
import { BsPersonFillAdd } from 'react-icons/bs';
import { BiLoaderCircle, BiLink } from 'react-icons/bi';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { FiExternalLink } from 'react-icons/fi';

export const CameraValidationIcon = AiFillCamera
export const ContactInfoIcon = BsPersonFillAdd
export const DigSignatureIcon = FaSignature

export const ShareLinkIcon = BiLink;
export const OpenOnNewTabIcon = FiExternalLink;

export default function MakeStepIndicatorIcon(type) {
  switch (type) {
    case "FACE": {
      return <CameraValidationIcon />;
    }
    case "PERSONAL_DATA": {
      return <ContactInfoIcon />;
    }
    case "SIGNATURE": {
      return <DigSignatureIcon />;
    }
    default: {
      return undefined;
    }
  }
}

export const StatusIcon = ({ status }) => {
  const size = 17;
  switch (status) {
    case "CREATED": {
      // TODO: Return an inline option to get a link when clicking the icon
      return <ShareLinkIcon size={18} />
    }
    case "STARTED": {
      return <BiLoaderCircle size={size} />;
    }
    case "FINISHED": {
      return <IoCheckmarkDoneOutline size={size} />
    }
    default: {
      return undefined;
    }
  }
}
