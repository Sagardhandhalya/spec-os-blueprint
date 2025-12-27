import { PlanData } from '@/types/plan';

export const MOCK_PLAN: PlanData = {
  title: 'Refactor Login Authentication Flow',
  riskLevel: 'Low',
  filesAffected: [
    {
      id: '1',
      path: 'src/auth/User.ts',
      operation: 'MODIFY',
      description: 'Update user interface to include refresh token handling',
    },
    {
      id: '2',
      path: 'components/Login.tsx',
      operation: 'MODIFY',
      description: 'Refactor form validation and add loading states',
    },
    {
      id: '3',
      path: 'src/auth/tokenService.ts',
      operation: 'CREATE',
      description: 'New service for JWT token management and refresh logic',
    },
  ],
  executionSteps: [
    {
      id: '1',
      title: 'Update Zod Schema',
      description: 'Add validation rules for the new token structure',
      codeSnippet: `const tokenSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.number(),
});`,
      language: 'typescript',
    },
    {
      id: '2',
      title: 'Implement Token Refresh Logic',
      description: 'Create async function to handle token refresh before expiry',
      codeSnippet: `async function refreshAuthToken(refreshToken: string) {
  const response = await api.post('/auth/refresh', {
    token: refreshToken,
  });
  
  if (response.ok) {
    storeTokens(response.data);
    return response.data.accessToken;
  }
  
  throw new AuthError('Token refresh failed');
}`,
      language: 'typescript',
    },
    {
      id: '3',
      title: 'Update Login Component',
      description: 'Integrate new auth flow with proper error handling',
      codeSnippet: `const handleLogin = async (credentials: LoginForm) => {
  setIsLoading(true);
  try {
    const tokens = await authService.login(credentials);
    await tokenService.store(tokens);
    navigate('/dashboard');
  } catch (error) {
    toast.error(getAuthErrorMessage(error));
  } finally {
    setIsLoading(false);
  }
};`,
      language: 'typescript',
    },
  ],
  verificationPlan: [
    { id: '1', label: 'Check for regression in Signup flow', checked: false },
    { id: '2', label: 'Verify Mobile Responsiveness', checked: false },
    { id: '3', label: 'Test token refresh on expiry', checked: false },
    { id: '4', label: 'Validate error handling edge cases', checked: false },
    { id: '5', label: 'Run existing auth test suite', checked: false },
  ],
};
