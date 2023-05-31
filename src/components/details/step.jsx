import React from "react";
import { ContactInfoStepName, FaceStepName, SignatureStepName } from "../../domain/steps/types";
import Card from "../shared/card";
import ContactInfoDetails from "./contactInfo";
import SignatureDetails from "./signature";
import StepsManifest from "../../domain/steps/manifest";
import FaceIdDetails from "./face";

const StepDetails = ({ flujoId, stepName }) => {
    let StepComponent = null;

    switch (stepName) {
        case FaceStepName: {
            StepComponent = FaceIdDetails;
            break;
        }
        case SignatureStepName: {
            StepComponent = SignatureDetails;
            break;
        }
        case ContactInfoStepName: {
            StepComponent = ContactInfoDetails;
            break;
        }
    }

    if(!StepComponent) return null;

    return (
        <div>
            <p className="py-1 pl-1 font-semibold text-zinc-600 text-lg select-none" >{StepsManifest.texts[stepName].stepDetails.title}</p>
            <Card>
                <StepComponent flujoId={flujoId} />
            </Card>
        </div>
    );
}

export default StepDetails;
