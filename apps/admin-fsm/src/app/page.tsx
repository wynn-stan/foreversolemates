import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import routes from '../routes';

export default function Index() {
  const token = cookies().get('token');

  if (token?.value) {
    redirect(routes.system.admin_users.index);
  } else {
    redirect(routes.auth.login.index);
  }

  return <></>;
}
