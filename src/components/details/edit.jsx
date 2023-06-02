import { useForm } from "react-hook-form";
import { InputLabel } from "../utils/input";
import FlujoService from "../../services/flujo";
import { toast } from "react-hot-toast";


const FlujoEditor = ({ flujo, onCancel, onEditSave }) => {

    const { register, formState, handleSubmit } = useForm({
        values: {
            title: flujo.title,
            description: flujo.description || ""
        }
    });

    const handleEditSubmit = (data) => {
        FlujoService.editFlujo({ ...data, id: flujo.id })
            .then(onEditSave)
            .catch(() => {
                toast.error('Cannot save flujo, please try again');
            });
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                <InputLabel text="Title" />
                <input
                    {...register('title', {
                        required: true,
                        maxLenght: 140,
                    })}
                    className="form-input-field"
                    placeholder="Title"
                />
            </div>
            <div>
                <InputLabel text="Description" />
                <textarea
                    {...register('description')}
                    className="form-input-field h-32"
                    placeholder="Description"
                />
            </div>
            <div className="flex flex-row gap-2 justify-end">
                <button disabled={!formState.isValid} className="px-5 py-2 rounded-lg font-semibold bg-accent disabled:bg-slate-400" onClick={handleSubmit(handleEditSubmit)}>Save</button>
                <button className="px-5 py-2 rounded-lg font-semibold text-white bg-slate-700 disabled:bg-slate-400" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default FlujoEditor;