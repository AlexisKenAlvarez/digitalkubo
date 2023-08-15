import { deletePdf } from "@/lib/server-methods"
import { toast } from "react-toastify"


export const handleDelete = async ({ publicId }: { publicId: string }) => {
    const resolvePdf = new Promise(async (resolve) => {
        const data = await deletePdf(publicId);

        if (data.success) {
            resolve(data);
        }
    });

    toast.promise(resolvePdf, {
        pending: "Deleting...",
        success: "Action Plan deleted! 🎉",
        error: "Failed to delete.",
    });

    return resolvePdf;
};
