import ResponsiveModal from "@/components/responsive-modal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

interface ConfirmationProps {
  title: string;
  message: string;
  variant?: ButtonProps["variant"];
}

type ReturnType = [() => JSX.Element, () => Promise<unknown>];

export const useConfirm = ({
  message,
  title,
  variant = "primary",
}: ConfirmationProps): ReturnType => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 justify-end items-center">
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="w-full lg:w-fit"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              variant={variant}
              className="w-full lg:w-fit"
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm];
};
