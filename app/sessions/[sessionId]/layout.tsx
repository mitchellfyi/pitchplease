import { auth } from '@/app/(auth)/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset } from '@/components/ui/sidebar';

import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

const SessionLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  console.log(
    '%capp/sessions/[sessionId]/layout.tsx:15 session',
    'color: #007acc;',
    session,
  );
  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default SessionLayout;
