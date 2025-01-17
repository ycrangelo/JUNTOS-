"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
    const [currentPage, setCurrentPage] = useState("profile"); // use consistent casing

    const router = useRouter();

    const changeRoute = () => {
        if (currentPage === "profile") {
            router.push("/profile");
            setCurrentPage("feeds");
        } else if (currentPage === "feeds") {
            router.push("/feeds");
            setCurrentPage("profile");
        }
    };

    return (
        <Button variant="flat" color="warning" onClick={changeRoute}>
            {currentPage}
        </Button>
    );
}
