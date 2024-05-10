'use client';

// public
import { useState, useTransition } from 'react';
import { useSelector } from 'react-redux';

//* components
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Input,
    Tabs,
    Tab,
} from '@nextui-org/react';

//* data
import { listColorItems } from '@/helper/data/data';
import { addTaskList } from '@/helper/functions/todo-functions';
import ResultSubmit from '../ui/texts/result-submit';

const AddListModal = ({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) => {
    // states and variables
    const userEmail = useSelector((state: any) => state.options.userEmail);
    const [listColor, setListColor] = useState('#e11d48');
    const [listTitle, setListTitle] = useState('Untitled list');
    const [isPending, startTransition] = useTransition();
    const [showResult, setShowResult] = useState(false);
    const [resultSubmit, setResultSubmit] = useState({
        message: '',
        status: 200,
    });

    // functions
    const openModal = () => {
        setListTitle('Untitled list');
        onOpenChange(isOpen);
    };

    const submitList = async (event: any) => {
        event.preventDefault();

        await addTaskList({ email: userEmail, listTitle, listColor }).then(
            (res: any) => {
                setShowResult(true);
                setResultSubmit({
                    message: res.message,
                    status: res.status,
                });

                setTimeout(() => {
                    setShowResult(false);
                    if (res.status === 200) {
                        onOpenChange(!isOpen);
                        setListTitle('Untitled list');
                        setListColor('#e11d48');
                    }
                }, 3000);
            }
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={openModal}
            backdrop='blur'
            placement='center'
        >
            <form
                onSubmit={(event: any) =>
                    startTransition(() => submitList(event))
                }
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Add List</ModalHeader>

                            <ModalBody className='py-6'>
                                <Input
                                    variant='bordered'
                                    radius='sm'
                                    placeholder='List Title'
                                    value={listTitle}
                                    onChange={({ target }) =>
                                        setListTitle(target.value)
                                    }
                                />
                                <Tabs
                                    fullWidth
                                    classNames={{
                                        tabList:
                                            'bg-transparent justify-center',
                                        cursor: 'outline outline-primary outline-offset-2 !bg-transparent',
                                    }}
                                >
                                    {listColorItems.map((color: string) => (
                                        <Tab
                                            key={color}
                                            style={{ backgroundColor: color }}
                                            className={`h-8 w-8`}
                                            onClick={() => setListColor(color)}
                                        />
                                    ))}
                                </Tabs>
                            </ModalBody>

                            <ModalFooter className='flex items-center flex-col p-2'>
                                {showResult ? (
                                    <ResultSubmit
                                        text={resultSubmit.message}
                                        status={resultSubmit.status}
                                    />
                                ) : null}

                                <section className='self-end space-x-2'>
                                    <Button
                                        variant='faded'
                                        color='danger'
                                        onPress={onClose}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        color='primary'
                                        type='submit'
                                        isLoading={isPending}
                                    >
                                        Add
                                    </Button>
                                </section>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};

export default AddListModal;