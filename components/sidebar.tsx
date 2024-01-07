"use-client";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] !text-white'>
          side bar text is not changing color to white 
           {/* <div className="px-3 py-2 flex-1">
               <Link href="/dashboard">
                Logo
               </Link>
            </div> */}
        </div>
    )
}

export default Sidebar;