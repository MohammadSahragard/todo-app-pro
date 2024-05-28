//* public
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//* provider
import { Providers } from './providers';

//* font config
const inter = Inter({ subsets: ['latin'] });

//* fontawesome
import '/FontAwesome.Pro.6.4.2/css/all.css';

//* toastify styles
import 'react-toastify/dist/ReactToastify.css';

//* components
import MenuContainer from '@/components/sidebars/menu/menu-container';
import MainHeader from '@/components/ui-kits/main-header';
import AddTodoBar from '@/components/ui-kits/add-todo-bar';
import TodoDetails from '@/components/sidebars/todo-detail/todo-details';

//* metadata
export const metadata: Metadata = {
    title: 'Taskato',
    description: 'A task manager app for managing tasks, todo and notes.',
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    {/* menu section */}
                    <MenuContainer />

                    {/* main section */}
                    <main className='main-section'>{children}</main>

                    {/* main header */}
                    <MainHeader />

                    {/* todo detail bar */}
                    <TodoDetails />

                    {/* todo add bar section */}
                    <div className='todo-bar-con'>
                        <AddTodoBar />
                    </div>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
