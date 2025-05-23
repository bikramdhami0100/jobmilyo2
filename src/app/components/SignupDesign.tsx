"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "../utils/cn";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
export function SignupFormDemo({ name ,fname,mname,lname,gender,phone,paddres,caddress, setfname,setmname,setlname,set }: any) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-[rgb(2,8,23)] shadow-md">
            <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                {name ? name : "No content Available"}
            </h1>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="First Name" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="middlename">Middle Name</Label>
                        <Input id="middlename" placeholder="Middle Name" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Last name" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="Gender">Gender</Label>
                        <Select >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Male</SelectItem>
                                <SelectItem value="dark">Female</SelectItem>
                                <SelectItem value="system">Other</SelectItem>
                            </SelectContent>
                        </Select>

                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="number">Phone Number</Label>
                    <Input id="number" placeholder="Phone Number" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="permanent address">Permanent Address</Label>
                    <Input id="permanentaddress" placeholder="Permanent Address" type="text" />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="permanent address">Current Address</Label>
                    <Input id="currentaddress" placeholder="Current Address " type="text" />
                </LabelInputContainer>
                <Button
                    className="bg-gradient-to-br relative group/btn from-[rgb(2,8,23)] dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] bg-[rgb(2,8,23)]"
                    type="submit"
                >
                    Next &rarr;
                    <BottomGradient />
                </Button>


            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
