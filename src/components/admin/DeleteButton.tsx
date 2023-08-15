import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { handleDelete } from "@/lib/client-methods"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AiFillDelete } from 'react-icons/ai'

const DeleteButton = ({ publicId }: { publicId: string }) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            queryClient.invalidateQueries(['adminData'])
        }
    })

    return (
        <button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div>
                        <AiFillDelete className="text-xl hover:text-red-500" />
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this action plan anywhere in the website.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { deleteMutation.mutate({ publicId }) }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </button>
    );
}

export default DeleteButton;