import { cookies } from 'next/headers';
import axios from 'axios';
import { UserModel } from '../../../../models';

export async function POST(request: Request) {
  const body: {
    email: string;
    password: string;
  } = await request.json();

  try {
    const loginResponse: {
      data: {
        token: string;
        email: boolean;
        expires: number;
        status: number;
        firstName: string;
        lastName: string;
        is_secure: boolean;
      };
    } = await axios.post<never, any>(
      `${process?.env?.NEXT_PUBLIC_BASE_API}/login`,
      { ...body }
    );

    const loginData = loginResponse?.data;

    if (loginData?.status === 400 || loginData?.is_secure) {
      throw {
        response: {
          data: {
            message: 'invalid account',
          },
        },
      };
    }

    const userResponse: { data: { data: UserModel } } = await axios.get<
      never,
      any
    >(`${process?.env?.NEXT_PUBLIC_BASE_API}/get_current_user`, {
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    const userData: UserModel = JSON.parse(userResponse?.data?.data as any);

    cookies().set({
      name: 'token',
      value: loginData?.token,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    return new Response(
      JSON.stringify({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        mobileNo: userData?.mobileNo,
        delivery_details: userData?.delivery_details,
      }),
      {
        status: 200,
        headers: { 'Set-Cookie': `token=${loginData?.token}` },
      }
    );
  } catch (error: any) {
    const data = error.response.data;
    return new Response(JSON.stringify(data), { status: 400 });
  }
}
