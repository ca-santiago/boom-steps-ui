import StepsManifest from "./manifest";
import { FinishStepName } from "./types";

export const getApplicableSteps = (flujoSteps = []) => {
  return StepsManifest.steps.filter(t => flujoSteps.includes(t.key) || t.key === FinishStepName);
}

export const getFlujoStatus = (completed = [], flujoSteps = []) => {
  const filteredManifesSteps = getApplicableSteps(flujoSteps);
  return {
    applicableSteps: filteredManifesSteps,
    currStep: filteredManifesSteps.find(st => !completed.includes(st.key)) || StepsManifest.finishStep,
  };
}
