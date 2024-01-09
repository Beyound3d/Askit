"use client";
import { Menu} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger , Sheet, SheetContent} from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar"

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar;