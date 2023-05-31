import React from "react";
import FlujoService from "../../services/flujo";
import { useQuery } from '@tanstack/react-query';
import { InlineLabelText } from "../utils/labelText";
import NoStepDataYet from "./noDataYet";

const getContactInfoDetails = (flujoId) => {
    return FlujoService.steps.getContactInfoDetails(flujoId);
}

const ContactInfoDetails = ({ flujoId }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['contactInfoDetails', flujoId],
        queryFn: () => getContactInfoDetails(flujoId),
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false
    });

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    if (!data) return <NoStepDataYet />;

    return (
        <div className="flex flex-col gap-1">
            <InlineLabelText label="Fullname" text={data.fullName} />
            <InlineLabelText label="Email" text={data.email} />
            <InlineLabelText label="Phone" text={data.phoneNumber} />
            <InlineLabelText label="Born place" text={data.bornPlace} />
            <InlineLabelText label="Birth date" text={data.birthDate} />
        </div>
    );
}

export default React.memo(ContactInfoDetails);