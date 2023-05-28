import { FaceIdIcon, ContactInfoIcon, DigSignatureIcon, FinishStepIcon } from "../../components/icons/icon.map";
import FaceStep from "../../components/steps/Face";
import FormStep from "../../components/steps/Form";
import SignatureStep from "../../components/steps/Signature";
import FinishFlujoStep from "../../components/steps/finish";
import { ContactInfoStepName, FaceStepName, FinishStepName, SignatureStepName } from "./types";

const finishStep = {
    key: FinishStepName,
    title: 'All done',
    component: FinishFlujoStep,
    icon: FinishStepIcon
}

const StepsManifest = {
    steps: [
        {
            key: ContactInfoStepName,
            title: 'Contact information',
            component: FormStep,
            icon: ContactInfoIcon,
        },
        {
            key: FaceStepName,
            title: 'Contact information',
            component: FaceStep,
            icon: FaceIdIcon,
        },
        {
            key: SignatureStepName,
            title: 'Contact information',
            component: SignatureStep,
            icon: DigSignatureIcon
        },
        finishStep
    ],
    finishStep,
    canUseNavigation: true,
}

export default StepsManifest;