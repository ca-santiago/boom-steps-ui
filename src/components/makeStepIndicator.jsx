
import {
  FaIdCard,
  FaFileSignature,
  FaCamera,
  FaCheck
} from 'react-icons/fa';


export default function MakeStepIndicatorIcon(type) {
  switch(type) {
    case "FACE": {
      return <FaCamera />;
    }
    case "PERSONAL_DATA": {
      return <FaIdCard />;
    }
    case "SIGNATURE": {
      return <FaFileSignature />;
    }
    default: {
      return undefined;
    }
  }
}

export function MakeStatusIcon(status) {
  switch(status) {
    case "ACTIVE": {
      return <FaCheck />;
    }
    case "LOCKED": {
      return <FaIdCard />;
    }
    default: {
      return undefined;
    }
  }
}