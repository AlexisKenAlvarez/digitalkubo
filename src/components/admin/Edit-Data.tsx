import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FunctionComponent, useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsUnlockFill, BsLockFill } from "react-icons/bs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Label } from "../../components/ui/label";
import axios from "axios";

interface PageProps {
  isOpen: boolean;
  toggleSheet: () => void;
  defaultValues: {
    id: number;
    title: string;
    pricing: string;
    locked: boolean;
    publicId: string;
  };
}

const EditData: FunctionComponent<PageProps> = ({
  isOpen,
  toggleSheet,
  defaultValues,
}) => {
  const formData = new FormData();
  const [file, setFile] = useState<File>();
  const [dataArr, setData] = useState<FormData[]>([]);
  const [error, setError] = useState("");
  const [changed, setChanged] = useState(false)

  const nameSchema = z.object({
    acpName: z.string().min(3, "Must be atleast 3 characters long."),
    acpType: z.string().trim().min(1, "Pick a acp type"),
    acpPrice: z.string().trim().min(1, "Pick a acp price"),
  }); 

  type nameType = z.infer<typeof nameSchema>;

  const form = useForm<nameType>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      acpName: defaultValues.title,
      acpType: defaultValues.locked ? "locked" : "unlocked",
      acpPrice: defaultValues.pricing,
    },
  });

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const nameValue = watch("acpName");
  const accessValue = watch("acpType");
  const pricingValue = watch("acpPrice");
  
  useEffect(() => {
    if (nameValue !== defaultValues.title) {
      setChanged(true)
    }

    
  }, [nameValue])

  const createAcp = (data: nameType) => {
    if (!file) {
      setError("Please upload a file.");
    } else {
      formData.append("title", data.acpName);
      formData.append("access", data.acpType);
      formData.append("pricing", data.acpPrice);

      formData.append("file", file as Blob);
      formData.append("fileName", file.name);
      formData.append("upload_preset", "digitalkubo");

      setData((items) => [...items, formData]);
      setValue("acpName", "");
      setValue("acpType", "unlocked");
      setValue("acpPrice", "free");
      setFile(undefined);
    }
  };

  async function uploadData() {
    axios.post("/api/addPdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
      setError("");

      if (uploadedFile.type !== "application/pdf") {
        setError("File must be a type of pdf.");
      }
    }
  };

  return (
    <>
      {/* Edit Action Plan */}
      <Sheet open={isOpen}>
        <SheetContent className="border-l-[1px] border-l-black/10">
          <button onClick={toggleSheet}>
            <X className="absolute top-3 right-3 h-5 w-5" />
          </button>
          <SheetHeader>
            <SheetTitle>Edit Action Plan</SheetTitle>
            <SheetDescription>
              Make changes to your action plan.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(createAcp)}
                className="flex flex-col gap-y-4"
              >
                {/* acp NAME */}

                <FormField
                  control={control}
                  name="acpName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                          <h1 className="">Title</h1>
                          <p className="text-sm text-red-400">
                            {errors.acpName?.message
                              ? `- ${errors.acpName?.message}`
                              : null}
                          </p>
                        </div>
                      </FormLabel>
                      <FormControl className="relative">
                        <div className="">
                          <Input
                            id="acpTitle"
                            placeholder="Title of action plan"
                            autoComplete="off"
                            autoFocus
                            maxLength={100}
                            className="pr-16"
                            {...field}
                          />
                          <p className="absolute right-3 top-0 bottom-0 my-auto h-fit text-sm opacity-50">
                            {nameValue.length}/100
                          </p>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* acp TYPE */}
                <FormField
                  control={control}
                  name="acpType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                          <h1 className="">Action Plan Access</h1>
                          <p className="text-sm text-red-400">
                            {errors.acpType?.message
                              ? `- ${errors.acpType?.message}`
                              : null}
                          </p>
                        </div>
                      </FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Unlocked" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          position="popper"
                          defaultValue="unlocked"
                        >
                          <SelectItem
                            value="unlocked"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-[5px] py-2">
                              <BsUnlockFill />
                              <p className="">Unlocked</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="locked" className="cursor-pointer">
                            <div className="flex items-center gap-x-[5px] py-2">
                              <BsLockFill />
                              <p className="">Locked</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* acp Price */}
                <FormField
                  control={control}
                  name="acpPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                          <h1 className="">Action Plan Pricing</h1>
                          <p className="text-sm text-red-400">
                            {errors.acpType?.message
                              ? `- ${errors.acpType?.message}`
                              : null}
                          </p>
                        </div>
                      </FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Free" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper" defaultValue="free">
                          <SelectItem value="free" className="cursor-pointer">
                            <div className="flex items-center gap-x-[5px] py-2">
                              <p className="">Free</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="paid" className="cursor-pointer">
                            <div className="flex items-center gap-x-[5px] py-2">
                              <p className="">Paid</p>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="mt-3">
                  <div className="relative w-full">
                    <Label
                      htmlFor="uploadedFile"
                      className="w-full h-auto absolute top-0 left-0 grid place-items-center cursor-pointer"
                    >
                      <Button
                        variant="secondary"
                        className="w-full pointer-events-none h-full"
                      >
                        <p className="">Upload Action Plan File</p>
                      </Button>
                    </Label>
                    <p className="opacity-0 pointer-events-none">
                      Upload Action Plan
                    </p>
                    <Input
                      type="file"
                      id="uploadedFile"
                      className="hidden"
                      onChange={handleUpload}
                      accept="application/pdf"
                      onClick={(
                        e: React.MouseEvent<HTMLInputElement, MouseEvent>
                      ) => {
                        const element = e.target as HTMLInputElement;
                        element.value = "";
                      }}
                    />
                  </div>
                  {file && (
                    <p className="text-black/70 mt-5 text-center text-sm font-secondary">
                      {file.name}
                    </p>
                  )}

                  {error && (
                    <p className="text-red-400 mt-5 text-center text-sm font-secondary ">
                      {error}
                    </p>
                  )}
                </div>

                <Button type="submit" className="mt-4">
                  Add to list
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditData;
