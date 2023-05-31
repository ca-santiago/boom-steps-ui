import { FaceIdIcon, ContactInfoIcon, DigSignatureIcon, FinishStepIcon } from "../../components/icons/icon.map";
import FaceStep from "../../components/steps/Face";
import FormStep from "../../components/steps/Form";
import SignatureStep from "../../components/steps/Signature";
import FinishFlujoStep from "../../components/steps/finish";
import { ContactInfoStepName, FaceStepName, FinishStepName, SignatureStepName, StatusCreatedName, StatusFinishedName, StatusLockedName, StatusStartedName } from "./types";

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
            title: 'Face id',
            component: FaceStep,
            icon: FaceIdIcon,
        },
        {
            key: SignatureStepName,

            title: 'Signature',
            component: SignatureStep,
            icon: DigSignatureIcon
        },
        finishStep
    ],
    finishStep,
    canUseNavigation: true,
    texts: {
        [FaceStepName]: {
            readiness: {
                title: "Camera Validation - Record a short video of your face.",
                subtext: "It'll only take a moment, we promise!"
            },
            stepDetails: {
                title: "Face validation"
            }
        },
        [ContactInfoStepName]: {
            readiness: {
                title: "Contact Information - Stay connected with us.",
                subtext: "Share your basic contact details with us, so we can keep in touch."
            },
            stepDetails: {
                title: "Contact information"
            },
        },
        [SignatureStepName]: {
            readiness: {
                title: "Digital Signature - Sign with ease.",
                subtext: "We need your digital signature.It's just a simple step to finalize the process."
            },
            stepDetails: {
                title: "Signature"
            }
        }
    },
    flujoStatus: {
        text: {
            [StatusStartedName]: 'Started',
            [StatusCreatedName]: 'Created',
            [StatusFinishedName]: 'Finished',
            [StatusLockedName]: 'Locked',
        }
    }
}

export default StepsManifest;