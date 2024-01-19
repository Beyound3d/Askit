"use-client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";



export const ProModal = () => {
    const proModal=useProModal();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                    Upgrade to AskIt
                    <Badge className="uppercase text-sm py-1" variant="premium">pro</Badge>
                    </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">

                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

