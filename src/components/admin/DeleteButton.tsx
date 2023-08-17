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
} from "@/components/ui/alert-dialog";
import { handleDelete } from "@/lib/client-methods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const DeleteButton = ({
  publicId,
  locked,
  open,
  setDeleteOpen,
}: {
  publicId: string;
  locked: boolean;
  open: boolean;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();

  const toggleSheet = () => {
    setDeleteOpen((curr) => !curr);
  };

  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      console.log(locked);
      if (locked) {
        queryClient.invalidateQueries(["adminData", { type: "locked" }]);
        console.log("Removed locked");
      } else {
        console.log("Removed unlocked");
        queryClient.invalidateQueries(["adminData", { type: "unlocked" }]);
      }
    },
  });

  return (
    <button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              action plan anywhere in the website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={toggleSheet}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteMutation.mutate({ publicId });
                toggleSheet();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </button>
  );
};

export default DeleteButton;
