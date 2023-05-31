import FlujoService from "../../services/flujo";
import { useQuery } from '@tanstack/react-query';
import NoStepDataYet from "./noDataYet";

const fetchData = (flujoId) => {
    return FlujoService.steps.getFaceIdDetails(flujoId);
}

const FaceIdDetails = ({ flujoId }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['faceidDetails', flujoId],
        queryFn: () => fetchData(flujoId),
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false
    });

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    if (!data) return <NoStepDataYet />;

    console.log(data);

    return (
        <div className="flex h-80 rounded-md">
            <div className="mx-auto flex">
                <video controls className="mx-auto rounded-md w-auto h-auto" src={data.url} />
            </div>
        </div>
    );
}

export default FaceIdDetails;