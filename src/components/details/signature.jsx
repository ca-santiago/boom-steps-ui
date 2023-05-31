import React from "react";
import FlujoService from "../../services/flujo";
import { useQuery } from '@tanstack/react-query';

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

    if (!data) return <p>Woops, no data</p>;

    console.log(data);

    return (
        <div className="flex items-center justify-center">
            <img className="h-auto w-auto border rounded" src={data.url} />
        </div>
    );
}

export default React.memo(SignatureDetails);