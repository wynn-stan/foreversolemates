import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(request: Request) {
  const token = cookies().get('token');

  try {
    cookies().delete('token');
  } catch (error) {
    // console.log('logout');
  }

  return new Response(JSON.stringify({ data: { message: 'Logged out' } }), {
    status: 200,
  });
}
