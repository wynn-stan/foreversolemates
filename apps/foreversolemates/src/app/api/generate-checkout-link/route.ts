import axios from 'axios';

export async function POST(request: Request) {
  const body: {
    email: string;
    amount: number;
    callback_url?: string;
    metadata: { [key: string]: any };
  } = await request.json();

  try {
    const response: {
      data: {
        status: boolean;
        message: string;
        type?: string;
        code?: string;
        data?: {
          authorization_url: string;
          access_code: string;
          reference: string;
        };
        meta?: {
          nextStep: string;
        };
      };
    } = await axios.post<never, any>(
      `${process?.env?.NEXT_BASE_PAYSTACK_API}/transaction/initialize`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${process?.env?.['NEXT_PAYSTACK_SECRET_KEY']}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response?.data;

    if (!data?.status) {
      throw { response };
    }

    return new Response(
      JSON.stringify({
        url: data?.data?.authorization_url,
        reference: data?.data?.reference,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    const data = error.response?.data;

    return new Response(JSON.stringify(data), { status: 400 });
  }
}
