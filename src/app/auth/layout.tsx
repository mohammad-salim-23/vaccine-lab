import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="mx-auto mb-8 w-fit text-center text-white bg-black px-4 py-2 rounded-sm">
                        <h2 className="text-center text-2xl font-bold text-light">Hackathon</h2>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
