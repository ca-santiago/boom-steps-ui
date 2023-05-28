import { ContactInfoStepName, FaceStepName, SignatureStepName } from "../../domain/steps/types";
import { FaceIdIcon, ContactInfoIcon, DigSignatureIcon, FlujoFinishedIcon, FlujoStartedIcon, ShareLinkIcon } from "../icons/icon.map";

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

export const StatusIcon = ({ status }) => {
  const size = 17;
  switch (status) {
    case "CREATED": {
      // TODO: Return an inline option to get a link when clicking the icon
      return <ShareLinkIcon size={18} />
    }
    case "STARTED": {
      return <FlujoStartedIcon size={size} />;
    }
    case "FINISHED": {
      return <FlujoFinishedIcon size={size} />
    }
    default: {
      return undefined;
    }
  }
}
