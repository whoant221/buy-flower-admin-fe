import { toast } from "react-toastify";

export const toastError = (data) => {
    data.response.data.forEach(({ message }) => {
        toast.error(message);
    });
};

export const toastSuccess = data => {
    toast.success(data);
};