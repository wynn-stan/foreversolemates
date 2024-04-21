import { cookies } from 'next/headers';
import axios from 'axios';
import { UserModel } from '../../../../models';

export async function POST(request: Request) {
  const body: {
    email: string;
    password: string;
  } = await request.json();

  try {
    const response: {
      data: {
        token: string;
        email: boolean;
        expires: number;
        status: number;
      };
    } = await axios.post<never, any>(
      `${process?.env?.NEXT_PUBLIC_BASE_API}/login`,
      { ...body }
    );

    const data = response?.data;

    if (data?.status === 400) {
      throw { response };
    }

    cookies().set({
      name: 'token',
      value: data?.token,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    return new Response(JSON.stringify({ email: data?.email }), {
      status: 200,
      headers: { 'Set-Cookie': `token=${data?.token}` },
    });
  } catch (error: any) {
    const data = error.response.data;
    return new Response(JSON.stringify(data), { status: 400 });
  }
}
