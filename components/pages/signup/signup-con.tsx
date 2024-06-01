//* components
import Image from 'next/image';
import Heading from '@/components/ui/texts/heading';
import Subtitle from '@/components/ui/texts/subtitle';
import SignupForm from './signup-form';

const SignupCon = () => {
    return (
        <div className='form-con'>
            <Image
                src='/images/taskato-logo.png'
                alt='taskato logo'
                width={60}
                height={60}
                className='form-con-logo'
            />

            <header className='form-header'>
                <Heading
                    heading='Join us today!'
                    additionalClasses='text-black'
                />
                <Subtitle subtitle='Sign up now to become a member' />
            </header>
            <SignupForm />
        </div>
    );
};

export default SignupCon;
