import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    // const response: {
    //   data: {
    //     status: boolean;
    //     message: string;
    //     type?: string;
    //     code?: string;
    //     data?: {
    //       authorization_url: string;
    //       access_code: string;
    //       reference: string;
    //     };
    //     meta?: {
    //       nextStep: string;
    //     };
    //   };
    // } = await axios.post<never, any>(
    //   `${process?.env?.NEXT_BASE_PAYSTACK_API}/transaction/initialize`,
    //   { ...body, amount: body.amount * 100 },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process?.env?.['NEXT_PAYSTACK_SECRET_KEY']}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );

    // const data = response?.data;

    // if (!data?.status) {
    //   throw { response };
    // }

    console.log(body);

    return new Response(null, {
      status: 200,
    });
  } catch (error: any) {
    const data = error.response?.data;

    return new Response(JSON.stringify(data), { status: 400 });
  }
}
