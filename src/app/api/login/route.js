export async function POST(req) {
  const { email, password } = await req.json();

  const validEmail = 'admin@gmail.com';
  const validPassword = 'admin@123';

  if (email === validEmail && password === validPassword) {
    return new Response(JSON.stringify({ message: 'Login successful', token: 'fake-jwt-token' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }
}
