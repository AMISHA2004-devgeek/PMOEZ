import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DebugPage() {
  console.log('=== DEBUG PAGE CALLED ===');
  
  let authResult, user, error;
  
  try {
    authResult = auth();
    console.log('✅ auth() success:', { userId: authResult?.userId, sessionId: authResult?.sessionId });
  } catch (err) {
    console.error('❌ auth() error:', err);
    error = err.message;
  }

  try {
    user = await currentUser();
    console.log('✅ currentUser() success:', { 
      id: user?.id, 
      email: user?.emailAddresses?.[0]?.emailAddress,
      firstName: user?.firstName 
    });
  } catch (err) {
    console.error('❌ currentUser() error:', err);
    error = err.message;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Clerk Debug Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">auth() Result</h2>
          <div className="space-y-2 text-sm font-mono">
            <div>userId: <span className="text-blue-600">{authResult?.userId || 'null'}</span></div>
            <div>sessionId: <span className="text-blue-600">{authResult?.sessionId || 'null'}</span></div>
            <div>orgId: <span className="text-blue-600">{authResult?.orgId || 'null'}</span></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">currentUser() Result</h2>
          <div className="space-y-2 text-sm font-mono">
            <div>id: <span className="text-blue-600">{user?.id || 'null'}</span></div>
            <div>email: <span className="text-blue-600">{user?.emailAddresses?.[0]?.emailAddress || 'null'}</span></div>
            <div>firstName: <span className="text-blue-600">{user?.firstName || 'null'}</span></div>
            <div>lastName: <span className="text-blue-600">{user?.lastName || 'null'}</span></div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
        <div className="space-y-2 text-sm font-mono">
          <div>
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 
            <span className="text-green-600 ml-2">
              {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 
                `${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.substring(0, 25)}...` : 
                'NOT SET'
              }
            </span>
          </div>
          <div>
            CLERK_SECRET_KEY: 
            <span className="text-green-600 ml-2">
              {process.env.CLERK_SECRET_KEY ? 
                `${process.env.CLERK_SECRET_KEY.substring(0, 25)}...` : 
                'NOT SET'
              }
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <a href="/sign-in" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Sign In
        </a>
        <a href="/sign-up" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Sign Up
        </a>
        <a href="/organization/test" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          Test Organization
        </a>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Check the server console for detailed logs</li>
          <li>If both auth() and currentUser() show null, your Clerk keys are wrong</li>
          <li>If you see user data here, the issue is elsewhere</li>
          <li>Make sure you're signed in before testing</li>
        </ol>
      </div>
    </div>
  );
}