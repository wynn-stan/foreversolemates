import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request, response: Response) {
  const body: {
    event: string;
    data: {
      id: number;
      status: string;
      reference: string;
      amount: number;
      gateway_response: string;
      paid_at: string;
      channel: string;
      currency: string;
      metadata: {
        subtotal: string;
        tax_amount: string;
        total: string;
        products_bought: any[];
        delivery_details: any;
      };
      fees: number;
    };
  } = await request.json();

  try {
    const data = body?.data;

    const response = axios
      .post<never, any>(`${process?.env?.NEXT_PUBLIC_BASE_API}/order`, {
        ...data?.metadata,
        payment_details: {
          id: data?.id,
          reference: data?.reference,
          amount: data?.amount,
          gateway_response: data?.gateway_response,
          paid_at: data?.paid_at,
          channel: data?.channel,
          fees: data?.fees,
        },
      })
      .then((res) => {
        console.log('acknoledged');
      })
      .catch((err) => {
        throw { response: err };
      });

    // if (!data?.status) {
    //   throw { response };
    // }

    return new Response(null, {
      status: 200,
    });
  } catch (error: any) {
    const data = error.response;
    console.log(error);

    return new Response(JSON.stringify(data), { status: 400 });
  }
}

/**
 * {
  event: 'charge.success',
  data: {
    id: 3815011844,
    domain: 'test',
    status: 'success',
    reference: 'r7mq614lah',
    amount: 38850,
    message: null,
    gateway_response: 'Successful',
    paid_at: '2024-05-22T07:53:17.000Z',
    created_at: '2024-05-22T07:52:44.000Z',
    channel: 'card',
    currency: 'GHS',
    ip_address: '154.160.14.211',
    metadata: {
      subtotal: '388.5',
      tax_amount: '0',
      total: '388.5',
      products_bought: [Array],
      custom_fields: [Array],
      delivery_details: [Object]
    },
    fees_breakdown: null,
    log: null,
    fees: 758,
    fees_split: null,
    authorization: {
      authorization_code: 'AUTH_tx1aai3aqm',
      bin: '408408',
      last4: '4081',
      exp_month: '12',
      exp_year: '2030',
      channel: 'card',
      card_type: 'visa ',
      bank: 'TEST BANK',
      country_code: 'GH',
      brand: 'visa',
      reusable: true,
      signature: 'SIG_mpcDZHx7Y4nXzcQGdOHP',
      account_name: null,
      receiver_bank_account_number: null,
      receiver_bank: null
    },
    customer: {
      id: 168660875,
      first_name: null,
      last_name: null,
      email: 'winstonlamptey3@gmail.com',
      customer_code: 'CUS_nelabuj3s8bpeti',
      phone: null,
      metadata: null,
      risk_action: 'default',
      international_format_phone: null
    },
    plan: {},
    subaccount: {},
    split: {},
    order_id: null,
    paidAt: '2024-05-22T07:53:17.000Z',
    requested_amount: 38850,
    pos_transaction_data: null,
    source: {
      type: 'api',
      source: 'merchant_api',
      entry_point: 'transaction_initialize',
      identifier: null
    }
  }
}

 */
