import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get('reference');

    const response: {
      data: {
        status: boolean;
        message: string;
        type?: string;
        code?: string;
        data?: {
          status: string;
          reference: string;
          gateway_response: string;
        };
        meta?: {
          nextStep: string;
        };
      };
    } = await axios.get<never, any>(
      `${process?.env?.NEXT_BASE_PAYSTACK_API}/transaction/verify/${reference}`,
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
        status: data?.data?.status,
        gateway_response: data?.data?.gateway_response,
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
