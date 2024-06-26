'use client';

// Public
import { useTransition } from 'react';

//* Components
import { Button } from '@nextui-org/react';
import Icon from '../texts/icon';

const SignOutBtn = () => {
    const [isPending, startTransition] = useTransition();

    // Logout function
    const signoutHandler = async () => {
        const res = await fetch('/api/auth/signout');
        const data = await res.json();

        if (data.status === 200) {
            window.location.href = '/auth/login';
        }
    };

    return (
        <Button
            radius='sm'
            variant='light'
            className='fw-btn p-3'
            isLoading={isPending}
            onClick={() => startTransition(() => signoutHandler())}
            startContent={
                <Icon
                    iconName='arrow-right-from-bracket'
                    style='fas'
                />
            }
        >
            Sign out
        </Button>
    );
};

export default SignOutBtn;
