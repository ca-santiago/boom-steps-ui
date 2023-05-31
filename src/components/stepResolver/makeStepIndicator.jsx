import { ContactInfoStepName, FaceStepName, SignatureStepName } from "../../domain/steps/types";
import { FaceIdIcon, ContactInfoIcon, DigSignatureIcon, FlujoFinishedIcon, FlujoStartedIcon, ShareLinkIcon, FlujoLockedIcon } from "../icons/icon.map";

export default function getFlujoStepIcon(type) {
  switch (type) {
    case FaceStepName: {
      return FaceIdIcon;
    }
    case ContactInfoStepName: {
      return ContactInfoIcon;
    }
    case SignatureStepName: {
      return DigSignatureIcon;
    }
    default: {
      return () => null;
    }
  }
}

export const StatusIcon = ({ status, className }) => {
  const size = 17;
  switch (status) {
    case "CREATED": {
      // TODO: Return an inline option to get a link when clicking the icon
      return <ShareLinkIcon className={className} size={18} />
    }
    case "STARTED": {
      return <FlujoStartedIcon className={className} size={size} />;
    }
    case "FINISHED": {
      return <FlujoFinishedIcon className="text-green-700" size={size} />
    }
    case "LOCKED": {
      return <FlujoLockedIcon className="text-indigo-700" size={size} />
    }
    default: {
      return undefined;
    }
  }
}
