'use client';

//* components
import { Avatar, Skeleton } from '@nextui-org/react';

const ProfilePicture = ({ email }: { email: string }) => {
    if (!email) return <Skeleton className='w-10 h-10 rounded-full' />;
    return (
        <Avatar
            src='https://avatars.githubusercontent.com/u/77649975?v=4'
            classNames={{ icon: 'text-primary-200' }}
        />
    );
};

export default ProfilePicture;