import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { FunctionComponent } from "react";
import DeleteButton from "./DeleteButton";
import EditData from "./Edit-Data";

interface PageProps {
  link: string;
  publicId: string;
  locked: boolean;
  defaultValues: {
    id: number;
    title: string;
    pricing: string;
    locked: boolean;
    publicId: string;
  };
}

const AdminDropDown: FunctionComponent<PageProps> = ({
  link,
  publicId,
  locked,
  defaultValues
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const toggleSheet = () => {
    setOpen((prevState) => !prevState);
  };

  const toggleDelete = () => {
    setDeleteOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    const handleClick = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return (
    <div>
      <DeleteButton
        publicId={publicId}
        locked={locked}
        open={isDeleteOpen}
        setDeleteOpen={setDeleteOpen}
      />

      <EditData
        isOpen={isOpen}
        toggleSheet={toggleSheet}
        customRef={ref}
        defaultValues={defaultValues}
      />
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 ">
            {/* <span className="sr-only">Open menu</span> */}
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(link)}>
            Copy PDF Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleSheet}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={toggleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminDropDown;
