"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("d55b3ecf-a953-40e9-b805-7ee7142b7f28");
    }, []);
    return null;
}

