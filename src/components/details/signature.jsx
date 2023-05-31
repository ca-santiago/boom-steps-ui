import React from "react";
import FlujoService from "../../services/flujo";
import { useQuery } from '@tanstack/react-query';
import NoStepDataYet from "./noDataYet";

const fetchData = (flujoId) => {
    return FlujoService.steps.getSignatureDetails(flujoId);
}

const SignatureDetails = ({ flujoId }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['signatureDetails', flujoId],
        queryFn: () => fetchData(flujoId),
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false
    });

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    if (!data) return <NoStepDataYet />;

    return (
        <div className="flex items-center justify-center">
            <img className="h-auto w-auto border rounded" src={data.url} />
        </div>
    );
}

export default React.memo(SignatureDetails);