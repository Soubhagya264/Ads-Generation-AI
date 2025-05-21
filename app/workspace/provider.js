"use client"
import React, { useEffect, useState } from 'react'
import { useMutation } from "convex/react"
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { AppSidebar } from './_components/sidebar'
import { AdFlowProvider } from '@/context/AdFlowContext';

const WorkspaceProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const newUserMutation = useMutation(api.user.CreatedNewUser);
    const { user } = useUser();

    const CreateNewUser = async (user) => {
        console.log(user, "user")
        const result = await newUserMutation({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            picture: user?.imageUrl
        });
        console.log(result,"result");
        setUserDetails(result);
    };

    useEffect(() => {
        console.log(userDetails, "userDetails")
        if (!user || userDetails) return;
        CreateNewUser(user);
    }, [user]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            <AdFlowProvider>
            <AppSidebar>
                {children}
            </AppSidebar>
            </AdFlowProvider>
        </UserDetailsContext.Provider>
    );
};

export default WorkspaceProvider;
