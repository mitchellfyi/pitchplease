import { getSupabaseSession } from '@/app/sessions/actions';
import SessionPageComponent from './SessionPageComponent';
import { auth } from '@/app/(auth)/auth';

const SessionPage = async ({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) => {
  const { sessionId } = await params;

  if (!sessionId) {
    return <div>No session ID</div>;
  }

  const session = await getSupabaseSession(sessionId as string);
  const userSession = await auth();

  if (!session.session || session.status === 'failed' || !userSession) {
    return <div>No session found</div>;
  }
  return (
    <SessionPageComponent session={session.session} userSession={userSession} />
  );
};

export default SessionPage;
